'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Piano } from '@/types/piano'

interface PianoEditDrawerProps {
  piano: Piano
  open: boolean
  onClose: () => void
}

type EditForm = {
  title: string
  model: string
  year: string
  serialNumber: string
  finish: string
  price: string
  retailPrice: string
  priceOnCall: boolean
  condition: string
  conditionReport: string
  location: string
  isAvailable: boolean
  isFeatured: boolean
  priority: string
  videoUrl: string
}

export function PianoEditDrawer({ piano, open, onClose }: PianoEditDrawerProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState<EditForm>({
    title: piano.title,
    model: piano.model,
    year: piano.year ? String(piano.year) : '',
    serialNumber: piano.serialNumber ?? '',
    finish: piano.finish,
    price: piano.price != null ? String(piano.price) : '',
    retailPrice: piano.retailPrice != null ? String(piano.retailPrice) : '',
    priceOnCall: piano.priceOnCall ?? false,
    condition: piano.condition,
    conditionReport: piano.conditionReport ?? '',
    location: piano.location ?? '',
    isAvailable: piano.isAvailable,
    isFeatured: piano.isFeatured,
    priority: String(piano.priority ?? 20),
    videoUrl: piano.videoUrl ?? '',
  })

  function set<K extends keyof EditForm>(key: K, value: EditForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    setError(null)
    setSaved(false)

    const body: Record<string, unknown> = {
      title: form.title,
      model: form.model || undefined,
      year: form.year ? Number(form.year) : undefined,
      serialNumber: form.serialNumber || undefined,
      finish: form.finish || undefined,
      priceOnCall: form.priceOnCall,
      price: form.priceOnCall ? undefined : (form.price ? Number(form.price) : undefined),
      retailPrice: form.retailPrice ? Number(form.retailPrice) : undefined,
      condition: form.condition,
      conditionReport: form.conditionReport || undefined,
      location: form.location || undefined,
      isAvailable: form.isAvailable,
      isFeatured: form.isFeatured,
      priority: form.priority ? Number(form.priority) : 20,
      videoUrl: form.videoUrl || undefined,
    }

    try {
      const res = await fetch(`/api/pianos/${piano.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const msg =
          (data?.errors as { message?: string }[] | undefined)?.[0]?.message ??
          `Save failed (${res.status})`
        throw new Error(msg)
      }

      setSaved(true)
      router.refresh()
      setTimeout(() => {
        setSaved(false)
        onClose()
      }, 900)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Edit piano"
        className={`fixed top-0 right-0 z-50 h-full w-[420px] max-w-[100vw] bg-piano-cream shadow-[-8px_0_48px_rgba(0,0,0,0.12)] flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-black/[0.07] shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="h-px w-5 bg-piano-burgundy/70" />
              <p className="font-display text-[10px] tracking-[0.55em] uppercase text-piano-burgundy">
                Edit Piano
              </p>
            </div>
            <p
              className="font-cormorant text-piano-black font-light truncate"
              style={{ fontSize: '1.25rem' }}
            >
              {piano.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 text-piano-stone/40 hover:text-piano-black transition-colors p-1"
            aria-label="Close edit panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-7">

          <Section label="Basic Info">
            <Field label="Title">
              <Input
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                className="h-9 text-sm"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Model">
                <Input
                  value={form.model}
                  onChange={(e) => set('model', e.target.value)}
                  className="h-9 text-sm"
                  placeholder="e.g. Model B"
                />
              </Field>
              <Field label="Year">
                <Input
                  type="number"
                  value={form.year}
                  onChange={(e) => set('year', e.target.value)}
                  className="h-9 text-sm"
                  placeholder="e.g. 1993"
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Serial #">
                <Input
                  value={form.serialNumber}
                  onChange={(e) => set('serialNumber', e.target.value)}
                  className="h-9 text-sm"
                />
              </Field>
              <Field label="Finish">
                <Input
                  value={form.finish}
                  onChange={(e) => set('finish', e.target.value)}
                  className="h-9 text-sm"
                  placeholder="e.g. Satin Ebony"
                />
              </Field>
            </div>
          </Section>

          <Section label="Pricing">
            <CheckField
              id="priceOnCall"
              label="Price on Call"
              checked={form.priceOnCall}
              onChange={(v) => set('priceOnCall', v)}
            />
            {!form.priceOnCall && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Asking Price ($)">
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => set('price', e.target.value)}
                    className="h-9 text-sm"
                    placeholder="e.g. 21999"
                  />
                </Field>
                <Field label="Retail Price ($)">
                  <Input
                    type="number"
                    value={form.retailPrice}
                    onChange={(e) => set('retailPrice', e.target.value)}
                    className="h-9 text-sm"
                    placeholder="Optional"
                  />
                </Field>
              </div>
            )}
          </Section>

          <Section label="Status">
            <Field label="Condition">
              <Select value={form.condition} onValueChange={(v) => set('condition', v)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Pre-Owned</SelectItem>
                  <SelectItem value="reconditioned">Reconditioned</SelectItem>
                  <SelectItem value="rebuilt">Rebuilt</SelectItem>
                  <SelectItem value="rebuilt-partial">Rebuilt — Partial</SelectItem>
                  <SelectItem value="work-in-progress">Work in Progress</SelectItem>
                  <SelectItem value="display">Display Model</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Location">
              <Select value={form.location} onValueChange={(v) => set('location', v)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="— none —" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">— none —</SelectItem>
                  <SelectItem value="Natick">Natick</SelectItem>
                  <SelectItem value="Burlington">Burlington</SelectItem>
                  <SelectItem value="Incoming">Incoming</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <CheckField
                id="isAvailable"
                label="Available for Sale"
                checked={form.isAvailable}
                onChange={(v) => set('isAvailable', v)}
              />
              <CheckField
                id="isFeatured"
                label="Featured Listing"
                checked={form.isFeatured}
                onChange={(v) => set('isFeatured', v)}
              />
            </div>
            <Field label="Display Priority">
              <Input
                type="number"
                value={form.priority}
                onChange={(e) => set('priority', e.target.value)}
                className="h-9 text-sm"
              />
            </Field>
          </Section>

          <Section label="Content">
            <Field label="Condition Report">
              <Textarea
                value={form.conditionReport}
                onChange={(e) => set('conditionReport', e.target.value)}
                rows={4}
                className="text-sm resize-none"
                placeholder="Detailed condition notes..."
              />
            </Field>
            <Field label="Video URL">
              <Input
                value={form.videoUrl}
                onChange={(e) => set('videoUrl', e.target.value)}
                className="h-9 text-sm"
                placeholder="YouTube or Vimeo link"
              />
            </Field>
          </Section>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-black/[0.07] shrink-0 space-y-3">
          {error && (
            <p className="text-[11px] font-display tracking-wide text-red-600">{error}</p>
          )}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className="flex-1 flex items-center justify-center gap-2 bg-piano-black text-piano-cream px-6 py-3.5 font-display text-xs tracking-[0.3em] uppercase hover:bg-piano-burgundy transition-colors duration-200 disabled:opacity-60"
            >
              {saving && <Loader2 size={13} className="animate-spin" />}
              {saved ? 'Saved!' : saving ? 'Saving…' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3.5 border border-piano-stone/20 text-piano-stone/60 font-display text-xs tracking-[0.3em] uppercase hover:border-piano-burgundy hover:text-piano-burgundy transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
          <a
            href={`/admin/collections/pianos/${piano.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-piano-stone/35 font-display text-[10px] tracking-[0.35em] uppercase hover:text-piano-burgundy transition-colors"
          >
            Open Full Admin →
          </a>
        </div>
      </aside>
    </>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="h-px w-4 bg-piano-burgundy/50" />
        <p className="font-display text-[9px] tracking-[0.55em] uppercase text-piano-burgundy/80">
          {label}
        </p>
        <div className="flex-1 h-px bg-piano-burgundy/15" />
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone/60">
        {label}
      </Label>
      {children}
    </div>
  )
}

function CheckField({
  id,
  label,
  checked,
  onChange,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onChange(Boolean(v))}
      />
      <label
        htmlFor={id}
        className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone/70 cursor-pointer leading-none"
      >
        {label}
      </label>
    </div>
  )
}
