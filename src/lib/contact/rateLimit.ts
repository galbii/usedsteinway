const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_PER_WINDOW = 5

// In-memory store. Best-effort by design: it resets on cold start and is
// per-instance in serverless deployments. Enough to blunt bursts from a single
// source without pulling in Redis or another external dependency.
const hits = new Map<string, number[]>()

/**
 * Record a hit for `ip` and report whether it has now exceeded the allowed
 * number of submissions within the rolling window. An empty ip is never limited.
 */
export function isRateLimited(ip: string): boolean {
  if (!ip) return false

  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  // Opportunistic cleanup so the map can't grow unbounded over time.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }

  return recent.length > MAX_PER_WINDOW
}
