import { useMemo, useState } from 'react';

import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button.styled';
import { Chip } from '../components/Chip';
import { EmployeeDrawer } from '../components/EmployeeDrawer/EmployeeDrawer';
import { EmployeeTable } from '../components/EmployeeTable';
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconSearch,
} from '../components/Icons';
import { Popover } from '../components/Popover';
import type {
  AccountType,
  Employee,
  EmployeeDetails,
  TrackingStatus,
} from '../lib/employees';
import { getEmployeeDetails, getEmployees } from '../lib/employees';
import { cn } from '../lib/utils';
import * as S from './EmployeesPage.styled';

type Filters = {
  accountsEnabled: boolean;
  teamsEnabled: boolean;
  statusEnabled: boolean;
  accounts: AccountType[];
  teams: string[];
  statuses: TrackingStatus[];
};

const ALL_ACCOUNTS: readonly {
  type: AccountType;
  label: string;
  icon?: string;
}[] = [
  { type: 'github', label: 'GitHub', icon: '/icons/github.png' },
  { type: 'jira', label: 'Jira', icon: '/icons/jira.png' },
  {
    type: 'google-calendar',
    label: 'Google Calendar',
    icon: '/icons/google-calendar.png',
  },
  { type: 'pagerduty', label: 'PagerDuty', icon: '/icons/pagerduty.png' },
];

export function EmployeesPage() {
  const employees = useMemo(() => getEmployees(), []);
  const allTeams = useMemo(
    () => Array.from(new Set(employees.flatMap((e) => e.teams))).sort(),
    [employees],
  );

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({
    accountsEnabled: false,
    teamsEnabled: false,
    statusEnabled: false,
    accounts: [],
    teams: [],
    statuses: [],
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPanel, setFilterPanel] = useState<
    'root' | 'accounts' | 'teams' | 'status'
  >('root');
  const [draftTeams, setDraftTeams] = useState<string[]>([]);
  const [draftAccounts, setDraftAccounts] = useState<AccountType[]>([]);
  const [draftStatuses, setDraftStatuses] = useState<TrackingStatus[]>([]);
  const [teamSearch, setTeamSearch] = useState('');

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return employees.filter((e) => {
      if (s && !`${e.fullName} ${e.email}`.toLowerCase().includes(s))
        return false;
      if (filters.accountsEnabled && filters.accounts.length) {
        if (!filters.accounts.some((a) => e.accountsConnected.includes(a)))
          return false;
      }
      if (filters.teamsEnabled && filters.teams.length) {
        if (!filters.teams.some((t) => e.teams.includes(t))) return false;
      }
      if (filters.statusEnabled && filters.statuses.length) {
        if (!filters.statuses.includes(e.trackingStatus)) return false;
      }
      return true;
    });
  }, [employees, filters, search]);

  const pageSize = 5;
  const [page, setPage] = useState(0);

  const maxPage = Math.max(0, Math.ceil(filtered.length / pageSize) - 1);
  const safePage = Math.min(page, maxPage);

  const start = safePage * pageSize;
  const end = Math.min(filtered.length, start + pageSize);
  const pageEmployees = filtered.slice(start, end);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  function toggleAllPage(checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const e of pageEmployees) {
        if (checked) next.add(e.id);
        else next.delete(e.id);
      }
      return next;
    });
  }

  function toggleOne(id: string, checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  const [drawerEmployeeId, setDrawerEmployeeId] = useState<string | null>(null);
  const [employeeOverrides, setEmployeeOverrides] = useState<
    Record<string, EmployeeDetails>
  >({});

  const drawerEmployee = useMemo<Employee | null>(() => {
    if (!drawerEmployeeId) return null;
    return employees.find((e) => e.id === drawerEmployeeId) ?? null;
  }, [drawerEmployeeId, employees]);

  const drawerInitialDetails = useMemo(() => {
    if (!drawerEmployee) return null;
    return (
      employeeOverrides[drawerEmployee.id] ?? getEmployeeDetails(drawerEmployee)
    );
  }, [drawerEmployee, employeeOverrides]);

  function closeFilter() {
    setFilterOpen(false);
    setFilterPanel('root');
    setTeamSearch('');
  }

  function openPanel(panel: 'accounts' | 'teams' | 'status') {
    setFilterPanel(panel);
    if (panel === 'teams')
      setDraftTeams(filters.teamsEnabled ? filters.teams : []);
    if (panel === 'accounts')
      setDraftAccounts(filters.accountsEnabled ? filters.accounts : []);
    if (panel === 'status')
      setDraftStatuses(filters.statusEnabled ? filters.statuses : []);
  }

  const teamsFiltered = useMemo(() => {
    const q = teamSearch.trim().toLowerCase();
    if (!q) return allTeams;
    return allTeams.filter((t) => t.toLowerCase().includes(q));
  }, [allTeams, teamSearch]);

  return (
    <S.PageWrapper>
      <S.Header>
        <S.HeaderWrapper>
          <S.HeaderLeftSection>
            <S.HeaderLogo src='/icons/faros-logo.svg' alt='Faros' />
            <S.HeaderNavBar>
              <S.NavItem>Default Workspace</S.NavItem>
              <S.Separator></S.Separator>
              <S.NavItem>Modules</S.NavItem>
              <S.NavItem>Scorecard</S.NavItem>
            </S.HeaderNavBar>
          </S.HeaderLeftSection>
          <S.HeaderRightSection>
            {/* TODO: fix, this should have "personal" and "acme" links */}
            <S.PersonalLabel>Personal</S.PersonalLabel>
            <Avatar name='Acme' />
          </S.HeaderRightSection>
        </S.HeaderWrapper>
      </S.Header>

      <S.MainWrapper>
        <S.Main>
          <S.Breadcrumbs>
            Admin Settings <S.BreadcrumbSeparator>›</S.BreadcrumbSeparator>{' '}
            Organization Setup <S.BreadcrumbSeparator>›</S.BreadcrumbSeparator>{' '}
            <S.BreadcrumbSelected>Employees Page</S.BreadcrumbSelected>
          </S.Breadcrumbs>

          <S.TopBar>
            <div>
              <S.PageTitle>Employees</S.PageTitle>
              <S.PageDescription>
                Easily assign employees to teams, include them for tracking in
                team productivity stats, and manage their connected accounts.
              </S.PageDescription>
            </div>
            <Button variant='primary'>
              {/* TODO: implement functionallity */}
              <S.NewButtonContent>
                <S.NewButtonIconWrapper>
                  <S.StyledNewButtonIcon />
                </S.NewButtonIconWrapper>
                New
              </S.NewButtonContent>
            </Button>
          </S.TopBar>

          <div className='mt-4 space-y-3'>
            <div className='relative'>
              <IconSearch className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
              <input
                className={cn(
                  'h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 shadow-sm',
                  'focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20',
                )}
                placeholder='Search employees by name ...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className='flex flex-wrap items-center gap-2'>
              <Popover
                open={filterOpen}
                onOpenChange={(open) => {
                  setFilterOpen(open);
                  if (!open) closeFilter();
                }}
                trigger={
                  <Button size='sm' className='gap-2'>
                    <IconPlus className='h-4 w-4 text-sky-700' />
                    Add Filter
                  </Button>
                }
              >
                {/* TODO: move into reusable component */}
                {filterPanel === 'root' ? (
                  <div className='p-2'>
                    <div className='px-2 py-1.5 text-xs font-semibold tracking-wide text-slate-500'>
                      FILTER BY
                    </div>
                    <FilterRow
                      checked={filters.accountsEnabled}
                      label='Accounts Connected'
                      onCheckedChange={(checked) =>
                        setFilters((f) => ({
                          ...f,
                          accountsEnabled: checked,
                          accounts: checked ? f.accounts : [],
                        }))
                      }
                      onOpenPanel={() => openPanel('accounts')}
                    />
                    <FilterRow
                      checked={filters.teamsEnabled}
                      label='Team'
                      onCheckedChange={(checked) =>
                        setFilters((f) => ({
                          ...f,
                          teamsEnabled: checked,
                          teams: checked ? f.teams : [],
                        }))
                      }
                      onOpenPanel={() => openPanel('teams')}
                    />
                    <FilterRow
                      checked={filters.statusEnabled}
                      label='Tracking Status'
                      onCheckedChange={(checked) =>
                        setFilters((f) => ({
                          ...f,
                          statusEnabled: checked,
                          statuses: checked ? f.statuses : [],
                        }))
                      }
                      onOpenPanel={() => openPanel('status')}
                    />
                  </div>
                ) : null}

                {filterPanel === 'teams' ? (
                  <div className='p-2'>
                    <PanelHeader
                      title='Team'
                      onBack={() => setFilterPanel('root')}
                    />
                    <div className='relative px-2 pb-2'>
                      <IconSearch className='pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
                      <input
                        className={cn(
                          'h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 shadow-sm',
                          'focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20',
                        )}
                        placeholder='Search team name...'
                        value={teamSearch}
                        onChange={(e) => setTeamSearch(e.target.value)}
                      />
                    </div>

                    <div className='flex items-center justify-between px-2 pb-1 text-xs font-medium text-slate-500'>
                      <button
                        type='button'
                        className='rounded px-1.5 py-1 hover:bg-slate-50'
                        onClick={() => setDraftTeams([])}
                      >
                        Deselect all
                      </button>
                      <button
                        type='button'
                        className='rounded px-1.5 py-1 hover:bg-slate-50'
                        onClick={() => setDraftTeams(allTeams)}
                      >
                        Select all
                      </button>
                    </div>

                    <div className='max-h-[220px] overflow-auto px-2 pb-2'>
                      {teamsFiltered.map((t) => (
                        <label
                          key={t}
                          className='flex cursor-pointer items-center gap-2 rounded px-1.5 py-2 hover:bg-slate-50'
                        >
                          <input
                            type='checkbox'
                            className='h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500'
                            checked={draftTeams.includes(t)}
                            onChange={(e) =>
                              setDraftTeams((prev) =>
                                e.target.checked
                                  ? [...prev, t]
                                  : prev.filter((x) => x !== t),
                              )
                            }
                          />
                          <span className='text-sm text-slate-700'>{t}</span>
                        </label>
                      ))}
                      {teamsFiltered.length === 0 ? (
                        <div className='px-1.5 py-3 text-sm text-slate-500'>
                          No teams match “{teamSearch}”.
                        </div>
                      ) : null}
                    </div>

                    <PanelFooter
                      onApply={() => {
                        setFilters((f) => ({
                          ...f,
                          teamsEnabled: true,
                          teams: draftTeams,
                        }));
                        closeFilter();
                      }}
                      onCancel={closeFilter}
                    />
                  </div>
                ) : null}

                {filterPanel === 'accounts' ? (
                  <div className='p-2'>
                    <PanelHeader
                      title='Accounts Connected'
                      onBack={() => setFilterPanel('root')}
                    />

                    <div className='px-2 pb-2'>
                      {ALL_ACCOUNTS.filter((a) => a.type !== 'pagerduty').map(
                        (a) => (
                          <label
                            key={a.type}
                            className='flex cursor-pointer items-center gap-2 rounded px-1.5 py-2 hover:bg-slate-50'
                          >
                            <input
                              type='checkbox'
                              className='h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500'
                              checked={draftAccounts.includes(a.type)}
                              onChange={(e) =>
                                setDraftAccounts((prev) =>
                                  e.target.checked
                                    ? [...prev, a.type]
                                    : prev.filter((x) => x !== a.type),
                                )
                              }
                            />
                            {a.icon ? (
                              <img
                                src={a.icon}
                                alt=''
                                className='h-4 w-4 rounded-sm'
                              />
                            ) : null}
                            <span className='text-sm text-slate-700'>
                              {a.label}
                            </span>
                          </label>
                        ),
                      )}
                    </div>

                    <PanelFooter
                      onApply={() => {
                        setFilters((f) => ({
                          ...f,
                          accountsEnabled: true,
                          accounts: draftAccounts,
                        }));
                        closeFilter();
                      }}
                      onCancel={closeFilter}
                    />
                  </div>
                ) : null}

                {filterPanel === 'status' ? (
                  <div className='p-2'>
                    <PanelHeader
                      title='Tracking Status'
                      onBack={() => setFilterPanel('root')}
                    />
                    <div className='px-2 pb-2'>
                      {(['Included', 'Ignored'] as const).map((s) => (
                        <label
                          key={s}
                          className='flex cursor-pointer items-center gap-2 rounded px-1.5 py-2 hover:bg-slate-50'
                        >
                          <input
                            type='checkbox'
                            className='h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500'
                            checked={draftStatuses.includes(s)}
                            onChange={(e) =>
                              setDraftStatuses((prev) =>
                                e.target.checked
                                  ? [...prev, s]
                                  : prev.filter((x) => x !== s),
                              )
                            }
                          />
                          <span className='text-sm text-slate-700'>{s}</span>
                        </label>
                      ))}
                    </div>

                    <PanelFooter
                      onApply={() => {
                        setFilters((f) => ({
                          ...f,
                          statusEnabled: true,
                          statuses: draftStatuses,
                        }));
                        closeFilter();
                      }}
                      onCancel={closeFilter}
                    />
                  </div>
                ) : null}
              </Popover>

              {filters.teamsEnabled ? (
                <Chip
                  onClick={() => {
                    setFilterOpen(true);
                    openPanel('teams');
                  }}
                  onRemove={() =>
                    setFilters((f) => ({
                      ...f,
                      teamsEnabled: false,
                      teams: [],
                    }))
                  }
                >
                  Team:{' '}
                  {filters.teams.length
                    ? `${filters.teams.slice(0, 2).join(', ')}${filters.teams.length > 2 ? '…' : ''}`
                    : 'All'}
                </Chip>
              ) : null}

              {filters.accountsEnabled ? (
                <Chip
                  onClick={() => {
                    setFilterOpen(true);
                    openPanel('accounts');
                  }}
                  onRemove={() =>
                    setFilters((f) => ({
                      ...f,
                      accountsEnabled: false,
                      accounts: [],
                    }))
                  }
                >
                  Accounts:{' '}
                  {filters.accounts.length
                    ? `${filters.accounts.length} selected`
                    : 'All'}
                </Chip>
              ) : null}

              {filters.statusEnabled ? (
                <Chip
                  onClick={() => {
                    setFilterOpen(true);
                    openPanel('status');
                  }}
                  onRemove={() =>
                    setFilters((f) => ({
                      ...f,
                      statusEnabled: false,
                      statuses: [],
                    }))
                  }
                >
                  Status:{' '}
                  {filters.statuses.length
                    ? filters.statuses.join(', ')
                    : 'All'}
                </Chip>
              ) : null}
            </div>
          </div>

          <div className='min-w-0 flex-1'>
            <EmployeeTable
              employees={pageEmployees}
              selectedIds={selectedIds}
              onToggleAllPage={toggleAllPage}
              onToggleOne={toggleOne}
              onView={(e) => setDrawerEmployeeId(e.id)}
            />

            <S.TablePagination>
              <S.TablePaginationLabel>
                {filtered.length === 0 ? '0' : `${start + 1}-${end}`} of{' '}
                {filtered.length}
              </S.TablePaginationLabel>
              <S.TablePaginationButton
                type='button'
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={safePage === 0}
                aria-label='Previous page'
              >
                <IconChevronLeft />
              </S.TablePaginationButton>
              <S.TablePaginationButton
                type='button'
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                disabled={end >= filtered.length}
                aria-label='Next page'
              >
                <IconChevronRight />
              </S.TablePaginationButton>
            </S.TablePagination>
          </div>
        </S.Main>

        {/* TODO: fix issue where employee is not updated when clicking different employees */}
        {drawerEmployee && drawerInitialDetails ? (
          <EmployeeDrawer
            employee={drawerEmployee}
            initialDetails={drawerInitialDetails}
            onClose={() => setDrawerEmployeeId(null)}
            onSave={(details) => {
              setEmployeeOverrides((prev) => ({
                ...prev,
                [drawerEmployee.id]: details,
              }));
              setDrawerEmployeeId(null);
            }}
          />
        ) : null}
      </S.MainWrapper>
    </S.PageWrapper>
  );
}

function FilterRow({
  checked,
  label,
  onCheckedChange,
  onOpenPanel,
}: {
  checked: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
  onOpenPanel: () => void;
}) {
  return (
    <div className='flex items-center justify-between gap-2 rounded px-2 py-2 hover:bg-slate-50'>
      <label className='flex cursor-pointer items-center gap-2'>
        <input
          type='checkbox'
          className='h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500'
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
        <span className='text-sm font-medium text-slate-700'>{label}</span>
      </label>
      <button
        type='button'
        className='rounded px-2 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50'
        onClick={onOpenPanel}
      >
        Edit
      </button>
    </div>
  );
}

function PanelHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className='mb-1 flex items-center gap-2 px-2 py-1.5'>
      <button
        type='button'
        className='inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100'
        onClick={onBack}
        aria-label='Back'
      >
        <IconChevronLeft className='h-4 w-4' />
      </button>
      <div className='text-sm font-semibold text-slate-800'>{title}</div>
    </div>
  );
}

function PanelFooter({
  onApply,
  onCancel,
}: {
  onApply: () => void;
  onCancel: () => void;
}) {
  return (
    <div className='flex items-center gap-2 border-t border-slate-200 px-2 pt-2'>
      <Button
        size='sm'
        variant='primary'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onApply();
        }}
      >
        Apply
      </Button>
      <Button
        size='sm'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onCancel();
        }}
      >
        Cancel
      </Button>
    </div>
  );
}
