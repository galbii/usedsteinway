'use client'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

// Shared input styling — white surface, dark text, burgundy focus accent.
// Kept inline so the drawer reads identically regardless of OS dark-mode preference.
export const INPUT_CLASS =
  'h-10 bg-white border-piano-stone/25 text-piano-black text-sm placeholder:text-piano-stone/40 focus-visible:border-piano-burgundy focus-visible:ring-1 focus-visible:ring-piano-burgundy/15 focus-visible:ring-offset-0'

export const SELECT_TRIGGER_CLASS =
  'h-10 bg-white border-piano-stone/25 text-piano-black text-sm focus:border-piano-burgundy focus:ring-1 focus:ring-piano-burgundy/15 focus:ring-offset-0'

export function Section({ label, children }: { label: string; children: React.ReactNode }) {
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

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone/60 block">
        {label}
      </Label>
      {children}
      {hint && <p className="text-[11px] text-piano-stone/55 leading-snug">{hint}</p>}
    </div>
  )
}

export function CheckField({
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
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(Boolean(v))} />
      <label
        htmlFor={id}
        className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone/70 cursor-pointer leading-none"
      >
        {label}
      </label>
    </div>
  )
}
