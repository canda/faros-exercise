import styled from 'styled-components';
import type { TrackingStatus } from '../lib/employees';
import { stableHash } from '../lib/utils';

export const TableWrapper = styled.div`
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.875rem;
`;

export const HeaderRow = styled.tr`
  background-color: #f8fafc;
  color: #475569;
`;

export const HeaderCell = styled.th<{ width: string }>`
  border-bottom: 1px solid #e2e8f0;
  padding: 0.625rem 0.75rem;
  text-align: left;
  font-weight: 600;
  width: ${(props) => props.width};
`;

export const Checkbox = styled.input`
  height: 1rem;
  width: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #cbd5e1;
  color: #0284c7;

  &:focus {
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.5);
    outline: none;
  }
`;

export const BodyRow = styled.tr<{ isLast: boolean }>`
  background-color: #ffffff;
  border-bottom: ${(props) => (props.isLast ? 'none' : '1px solid #f1f5f9')};
`;

export const BodyCell = styled.td`
  padding: 0.75rem;
  vertical-align: middle;
`;

export const NameCellWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const NameAndEmailWrapper = styled.div`
  min-width: 0;
`;

export const Fullname = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: #1e293b;
`;

export const Email = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
  color: #64748b;
`;

export const StatusCellWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatusDot = styled.span<{ trackingStatus: TrackingStatus }>`
  height: 0.625rem;
  width: 0.625rem;
  border-radius: 9999px;
  background-color: ${(props) =>
    props.trackingStatus === 'Included' ? '#22c55e' : '#f87171'};
`;

export const StatusTextWrapper = styled.div`
  color: #334155;
`;

export const StatusTitle = styled.div`
  font-weight: 600;
`;

export const StatusSubtitle = styled.div`
  font-size: 0.75rem;
  color: #64748b;
`;

export const TeamsCellWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

type TeamColor = { bg: string; border: string; text: string };

const TEAM_COLORS: readonly TeamColor[] = [
  { bg: '#e0f2fe', border: '#bae6fd', text: '#0284c7' },
  { bg: '#e0e7ff', border: '#c7d2fe', text: '#4338ca' },
  { bg: '#d1fae5', border: '#a7f3d0', text: '#047857' },
  { bg: '#fef3c7', border: '#fde68a', text: '#b45309' },
  { bg: '#fee2e2', border: '#fecaca', text: '#b91c1c' },
  { bg: '#ede9fe', border: '#ddd6fe', text: '#5b21b6' },
];

function teamColor(team: string): TeamColor {
  return TEAM_COLORS[stableHash(team) % TEAM_COLORS.length]!;
}

export const TeamBadge = styled.span<{ team: string }>`
  display: inline-flex;
  align-items: center;
  border-radius: 0.375rem;
  border-width: 1px;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${(props) => teamColor(props.team).bg};
  border-color: ${(props) => teamColor(props.team).border};
  color: ${(props) => teamColor(props.team).text};
`;

export const ExtraTeams = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
`;

export const AccountsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AccountIcon = styled.img`
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 0.125rem;
`;
