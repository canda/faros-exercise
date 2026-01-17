import type { AccountType, Employee, TrackingStatus } from '../lib/employees';
import { cn, stableHash } from '../lib/utils';
import { Avatar } from './Avatar';
import { Button } from './Button';

type TeamColor = { bg: string; border: string; text: string };

const TEAM_COLORS: readonly TeamColor[] = [
  { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700' },
  { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
  {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
  },
  { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
  { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700' },
  { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700' },
];

function teamColor(team: string): TeamColor {
  return TEAM_COLORS[stableHash(team) % TEAM_COLORS.length]!;
}

function accountIcon(type: AccountType) {
  switch (type) {
    case 'github':
      return { src: '/icons/github.png', alt: 'GitHub' };
    case 'jira':
      return { src: '/icons/jira.png', alt: 'Jira' };
    case 'google-calendar':
      return { src: '/icons/google-calendar.png', alt: 'Google Calendar' };
    case 'pagerduty':
      return { src: '/icons/pagerduty.png', alt: 'PagerDuty' };
  }
}

function statusDot(status: TrackingStatus) {
  return status === 'Included' ? 'bg-emerald-500' : 'bg-rose-500';
}

export function EmployeeTable({
  employees,
  selectedIds,
  onToggleAllPage,
  onToggleOne,
  onView,
}: {
  employees: Employee[];
  selectedIds: Set<string>;
  onToggleAllPage: (checked: boolean) => void;
  onToggleOne: (id: string, checked: boolean) => void;
  onView: (e: Employee) => void;
}) {
  const pageIds = employees.map((e) => e.id);
  const selectedOnPage = pageIds.filter((id) => selectedIds.has(id)).length;
  const allOnPage = employees.length > 0 && selectedOnPage === employees.length;
  const someOnPage = selectedOnPage > 0 && selectedOnPage < employees.length;

  return (
    <div className='overflow-hidden rounded-lg border border-slate-200 bg-white'>
      <table className='w-full table-fixed border-separate border-spacing-0 text-sm'>
        <thead>
          <tr className='bg-slate-50 text-slate-600'>
            <th className='w-10 border-b border-slate-200 px-3 py-2.5 text-left'>
              <input
                type='checkbox'
                className='h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500'
                checked={allOnPage}
                ref={(el) => {
                  if (el) el.indeterminate = someOnPage;
                }}
                onChange={(e) => onToggleAllPage(e.target.checked)}
                aria-label='Select all rows on page'
              />
            </th>
            <th className='w-[38%] border-b border-slate-200 px-3 py-2.5 text-left font-semibold'>
              Name
            </th>
            <th className='w-[18%] border-b border-slate-200 px-3 py-2.5 text-left font-semibold'>
              Tracking Status
            </th>
            <th className='w-[22%] border-b border-slate-200 px-3 py-2.5 text-left font-semibold'>
              Teams
            </th>
            <th className='w-[14%] border-b border-slate-200 px-3 py-2.5 text-left font-semibold'>
              Accounts Connected
            </th>
            <th className='w-[8%] border-b border-slate-200 px-3 py-2.5 text-right font-semibold'>
              {' '}
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e, idx) => {
            const rowBorder =
              idx === employees.length - 1 ? '' : 'border-b border-slate-100';
            const teams = e.teams.slice(0, 2);
            const extraTeams = Math.max(0, e.teams.length - teams.length);

            return (
              <tr key={e.id} className={cn('bg-white', rowBorder)}>
                <td className='px-3 py-3 align-middle'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500'
                    checked={selectedIds.has(e.id)}
                    onChange={(ev) => onToggleOne(e.id, ev.target.checked)}
                    aria-label={`Select ${e.fullName}`}
                  />
                </td>
                <td className='px-3 py-3 align-middle'>
                  <div className='flex items-center gap-3'>
                    <Avatar name={e.fullName} src={e.photoUrl} size={28} />
                    <div className='min-w-0'>
                      <div className='truncate font-semibold text-slate-800'>
                        {e.fullName}
                      </div>
                      <div className='truncate text-xs text-slate-500'>
                        {e.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-3 py-3 align-middle'>
                  <div className='flex items-center gap-2'>
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full',
                        statusDot(e.trackingStatus),
                      )}
                    />
                    <div className='text-slate-700'>
                      <div className='font-semibold'>{e.trackingStatus}</div>
                      <div className='text-xs text-slate-500'>
                        {e.trackingStatus === 'Included' ? 'Active' : 'Ignored'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-3 py-3 align-middle'>
                  <div className='flex flex-wrap items-center gap-2'>
                    {teams.map((t) => {
                      const c = teamColor(t);
                      return (
                        <span
                          key={t}
                          className={cn(
                            'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold',
                            c.bg,
                            c.border,
                            c.text,
                          )}
                        >
                          {t}
                        </span>
                      );
                    })}
                    {extraTeams ? (
                      <span className='text-xs font-medium text-slate-500'>
                        +{extraTeams}
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className='px-3 py-3 align-middle'>
                  <div className='flex items-center gap-2'>
                    {e.accountsConnected.map((a) => {
                      const icon = accountIcon(a);
                      return (
                        <img
                          key={a}
                          src={icon.src}
                          alt={icon.alt}
                          className='h-5 w-5 rounded-sm'
                          loading='lazy'
                        />
                      );
                    })}
                  </div>
                </td>
                <td className='px-3 py-3 align-middle text-right'>
                  <Button size='sm' onClick={() => onView(e)}>
                    View
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
