import { useMemo, useState } from 'react';

import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button.styled';
import { Chip } from '../components/Chip';
import { EmployeeDrawer } from '../components/EmployeeDrawer/EmployeeDrawer';
import { EmployeeTable } from '../components/EmployeeTable';
import { IconChevronLeft, IconChevronRight } from '../components/Icons';
import { Popover } from '../components/Popover';
import type {
  AccountType,
  Employee,
  EmployeeDetails,
  TrackingStatus,
} from '../lib/employees';
import { getEmployeeDetails, getEmployees } from '../lib/employees';
import * as S from './EmployeesPage.styled';
import FilterPanel from '../components/FilterPanel';

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

type PanelType = 'root' | 'accounts' | 'teams' | 'status';

const FilterRow = ({
  checked,
  label,
  onCheckedChange,
  onOpenPanel,
}: {
  checked: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
  onOpenPanel: () => void;
}) => (
  <S.FilterRowWrapper>
    <S.FilterRowLeftSection>
      <S.FilterRowCheckbox
        type='checkbox'
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <S.FilterRowLabel>{label}</S.FilterRowLabel>
    </S.FilterRowLeftSection>
    <S.FilterRowEditButton type='button' onClick={onOpenPanel}>
      Edit
    </S.FilterRowEditButton>
  </S.FilterRowWrapper>
);

const EmployeesPage = () => {
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

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [filterPanel, setFilterPanel] = useState<PanelType>('root');

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

  function openPanel(panel: PanelType) {
    setFilterPanel(panel);
    setPopoverOpen(true);
  }

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

          <S.FiltersWrapper>
            <S.SearchByNameWrapper>
              <S.StyledIconSearch />
              <S.SearchByNameInput
                placeholder='Search employees by name ...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </S.SearchByNameWrapper>

            <S.FilterChipsWrapper>
              <Popover
                open={popoverOpen}
                onOpenChange={(shouldOpen) => {
                  if (shouldOpen) {
                    openPanel('root');
                  } else {
                    setPopoverOpen(false);
                  }
                }}
                trigger={
                  <S.AddFilterButton size='sm'>
                    <S.StyledIconPlus />
                    Add Filter
                  </S.AddFilterButton>
                }
              >
                {filterPanel === 'root' && (
                  <S.FilterSelectorWrapper>
                    <S.FilterSelectorTitle>FILTER BY</S.FilterSelectorTitle>
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
                  </S.FilterSelectorWrapper>
                )}

                {filterPanel === 'teams' && (
                  <FilterPanel
                    allowSearch
                    itemName='teams'
                    items={allTeams}
                    selectedItems={filters.teams}
                    setSelectedItems={(newTeams) =>
                      setFilters((currentFilters) => ({
                        ...currentFilters,
                        teams: newTeams,
                      }))
                    }
                    onBack={() => setFilterPanel('root')}
                    onClose={() => setPopoverOpen(false)}
                  />
                )}

                {filterPanel === 'accounts' && (
                  <FilterPanel
                    itemName='accounts'
                    items={ALL_ACCOUNTS.map((a) => a.type)}
                    selectedItems={filters.accounts}
                    setSelectedItems={(newAccounts) =>
                      setFilters((currentFilters) => ({
                        ...currentFilters,
                        accounts: newAccounts as AccountType[],
                      }))
                    }
                    onBack={() => setFilterPanel('root')}
                    onClose={() => setPopoverOpen(false)}
                  />
                )}

                {filterPanel === 'status' && (
                  <FilterPanel
                    itemName='statuses'
                    items={['Included', 'Ignored']}
                    selectedItems={filters.statuses}
                    setSelectedItems={(newStatuses) =>
                      setFilters((currentFilters) => ({
                        ...currentFilters,
                        statuses: newStatuses as TrackingStatus[],
                      }))
                    }
                    onBack={() => setFilterPanel('root')}
                    onClose={() => setPopoverOpen(false)}
                  />
                )}
              </Popover>

              {filters.teamsEnabled ? (
                <Chip
                  onClick={() => {
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
            </S.FilterChipsWrapper>
          </S.FiltersWrapper>

          <S.TableWrapper>
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
          </S.TableWrapper>
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
};

export default EmployeesPage;
