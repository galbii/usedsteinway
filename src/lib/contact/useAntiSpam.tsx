'use client'

import { useRef, type Ref } from 'react'

/**
 * Anti-spam signals shared by every contact form.
 *
 * - `honeypotRef`: attach to the hidden <HoneypotField>. Bots fill it; humans can't see it.
 * - `getSpamSignals()`: spread into the POST body to /api/contact so the server
 *   can run its honeypot + timing checks.
 *
 * Every contact form MUST send these — a submission with no `elapsedMs` is
 * treated as a direct bot POST and silently dropped server-side.
 */
export function useAntiSpam() {
  const mountedAt = useRef(Date.now())
  const honeypotRef = useRef<HTMLInputElement>(null)

  const getSpamSignals = () => ({
    website: honeypotRef.current?.value ?? '',
    elapsedMs: Date.now() - mountedAt.current,
  })

  return { honeypotRef, getSpamSignals }
}

/** Off-screen decoy field. Hidden from humans and assistive tech; only bots fill it. */
export function HoneypotField({ inputRef }: { inputRef: Ref<HTMLInputElement> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
      <label>
        Website
        <input
          ref={inputRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>
    </div>
  )
}
