import type { AccountType, Employee } from '../lib/employees';
import { Avatar } from './Avatar';
import { Button } from './Button.styled';

import * as S from './EmployeeTable.styled';

const ACCOUNT_ICONS: Record<AccountType, { src: string; alt: string }> = {
  github: { src: '/icons/github.png', alt: 'GitHub' },
  jira: { src: '/icons/jira.png', alt: 'Jira' },
  'google-calendar': {
    src: '/icons/google-calendar.png',
    alt: 'Google Calendar',
  },
  pagerduty: { src: '/icons/pagerduty.png', alt: 'PagerDuty' },
};

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
    <S.TableWrapper>
      <S.Table>
        <thead>
          <S.HeaderRow>
            <S.HeaderCell width='10%'>
              <S.Checkbox
                type='checkbox'
                checked={allOnPage}
                ref={(el) => {
                  if (el) el.indeterminate = someOnPage;
                }}
                onChange={(e) => onToggleAllPage(e.target.checked)}
                aria-label='Select all rows on page'
              />
            </S.HeaderCell>
            <S.HeaderCell width='38%'>Name</S.HeaderCell>
            <S.HeaderCell width='18%'>Tracking Status</S.HeaderCell>
            <S.HeaderCell width='22%'>Teams</S.HeaderCell>
            <S.HeaderCell width='14%'>Accounts Connected</S.HeaderCell>
            <S.HeaderCell width='8%'> </S.HeaderCell>
          </S.HeaderRow>
        </thead>
        <tbody>
          {employees.map((e, index) => {
            const MAX_TEAMS_DISPLAYED = 2;
            const teams = e.teams.slice(0, MAX_TEAMS_DISPLAYED);
            const extraTeams = Math.max(0, e.teams.length - teams.length);

            return (
              <S.BodyRow key={e.id} isLast={index === employees.length - 1}>
                <S.BodyCell>
                  <S.Checkbox
                    type='checkbox'
                    checked={selectedIds.has(e.id)}
                    onChange={(ev) => onToggleOne(e.id, ev.target.checked)}
                    aria-label={`Select ${e.fullName}`}
                  />
                </S.BodyCell>
                <S.BodyCell>
                  <S.NameCellWrapper>
                    <Avatar name={e.fullName} src={e.photoUrl} />
                    <S.NameAndEmailWrapper>
                      <S.Fullname>{e.fullName}</S.Fullname>
                      <S.Email>{e.email}</S.Email>
                    </S.NameAndEmailWrapper>
                  </S.NameCellWrapper>
                </S.BodyCell>
                <S.BodyCell>
                  <S.StatusCellWrapper>
                    <S.StatusDot trackingStatus={e.trackingStatus} />
                    <S.StatusTextWrapper>
                      {/* TODO: clarify where tracking status should come from. Right now AI just invented it from random */}
                      <S.StatusTitle>{e.trackingStatus}</S.StatusTitle>
                      <S.StatusSubtitle>
                        {e.trackingStatus === 'Included' ? 'Active' : 'Ignored'}
                      </S.StatusSubtitle>
                    </S.StatusTextWrapper>
                  </S.StatusCellWrapper>
                </S.BodyCell>
                <S.BodyCell>
                  <S.TeamsCellWrapper>
                    {teams.map((team) => (
                      <S.TeamBadge key={team} team={team}>
                        {team}
                      </S.TeamBadge>
                    ))}
                    {extraTeams ? (
                      <S.ExtraTeams>+{extraTeams}</S.ExtraTeams>
                    ) : null}
                  </S.TeamsCellWrapper>
                </S.BodyCell>
                <S.BodyCell>
                  <S.AccountsWrapper>
                    {e.accountsConnected.map((account) => (
                      <S.AccountIcon
                        key={account}
                        src={ACCOUNT_ICONS[account].src}
                        alt={ACCOUNT_ICONS[account].alt}
                        loading='lazy'
                      />
                    ))}
                  </S.AccountsWrapper>
                </S.BodyCell>
                <S.BodyCell style={{ textAlign: 'right' }}>
                  <Button size='sm' onClick={() => onView(e)}>
                    View
                  </Button>
                </S.BodyCell>
              </S.BodyRow>
            );
          })}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
}
