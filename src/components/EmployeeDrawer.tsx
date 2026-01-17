import { type ReactNode, useMemo, useState } from 'react'
import type { Employee, EmployeeDetails, TrackingStatus } from '../lib/employees'
import { cn } from '../lib/utils'
import { Button } from './Button'
import { IconX } from './Icons'

function statusPill(status: TrackingStatus) {
  return status === 'Included'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
    : 'border-rose-200 bg-rose-50 text-rose-700'
}

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="grid grid-cols-[96px_1fr] items-center gap-3 py-2">
      <div className="text-xs font-semibold text-slate-600">{label}</div>
      {children}
    </label>
  )
}

function TextInput({
  value,
  onChange,
  readOnly,
}: {
  value: string
  onChange?: (v: string) => void
  readOnly?: boolean
}) {
  return (
    <input
      className={cn(
        'h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm',
        'focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20',
        readOnly && 'bg-slate-50 text-slate-600',
      )}
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: readonly string[]
}) {
  return (
    <select
      className={cn(
        'h-9 w-full rounded-md border border-slate-200 bg-white px-2.5 text-sm text-slate-800 shadow-sm',
        'focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20',
      )}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

export function EmployeeDrawer({
  employee,
  initialDetails,
  onClose,
  onSave,
}: {
  employee: Employee
  initialDetails: EmployeeDetails
  onClose: () => void
  onSave: (details: EmployeeDetails) => void
}) {
  const [details, setDetails] = useState<EmployeeDetails>(initialDetails)

  const statusText = useMemo(
    () => `${employee.trackingStatus} - ${employee.trackingStatus === 'Included' ? 'Active' : 'Ignored'}`,
    [employee.trackingStatus],
  )

  return (
    <aside className="flex h-full w-[360px] shrink-0 flex-col border-l border-slate-200 bg-white">
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">{employee.fullName}</div>
          <div className="mt-1 flex items-center gap-2">
            <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold', statusPill(employee.trackingStatus))}>
              {statusText}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
          onClick={onClose}
          aria-label="Close panel"
        >
          <IconX className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto px-4 py-3">
        <div className="text-xs font-semibold tracking-wide text-slate-500">Profile Info</div>

        <div className="mt-2">
          <Field label="UID">
            <TextInput value={details.uid} readOnly />
          </Field>
          <Field label="Title">
            <TextInput value={details.title} onChange={(title) => setDetails((d) => ({ ...d, title }))} />
          </Field>
          <Field label="Name">
            <TextInput value={details.name} onChange={(name) => setDetails((d) => ({ ...d, name }))} />
          </Field>
          <Field label="Email">
            <TextInput value={details.email} onChange={(email) => setDetails((d) => ({ ...d, email }))} />
          </Field>
          <Field label="Role">
            <Select
              value={details.role}
              onChange={(role) => setDetails((d) => ({ ...d, role }))}
              options={['IC', 'Manager']}
            />
          </Field>
          <Field label="Location">
            <Select
              value={details.location}
              onChange={(location) => setDetails((d) => ({ ...d, location }))}
              options={['San Francisco', 'New York', 'Remote', 'London']}
            />
          </Field>
          <Field label="Level">
            <Select
              value={details.level}
              onChange={(level) => setDetails((d) => ({ ...d, level }))}
              options={['L2', 'L3', 'L4', 'L5']}
            />
          </Field>
          <Field label="Employment Type">
            <Select
              value={details.employmentType}
              onChange={(employmentType) => setDetails((d) => ({ ...d, employmentType }))}
              options={['Full-time', 'Part-time', 'Contract']}
            />
          </Field>
        </div>
      </div>

      <div className="flex items-center justify-start gap-2 border-t border-slate-200 px-4 py-3">
        <Button
          variant="primary"
          onClick={() => {
            onSave(details)
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            setDetails(initialDetails)
            onClose()
          }}
        >
          Cancel
        </Button>
      </div>
    </aside>
  )
}
