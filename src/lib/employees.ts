import rawEmployees from '../data/employees.json';
import { pickDeterministic, stableHash } from './utils';

export type AccountType = 'github' | 'jira' | 'google-calendar' | 'pagerduty';

export type TrackingStatus = 'Included' | 'Ignored';

export type Employee = {
  id: string;
  uid: string;
  fullName: string;
  email: string;
  photoUrl?: string;
  teams: string[];
  accountsConnected: AccountType[];
  trackingStatus: TrackingStatus;
};

type RawEmployee = {
  id: string;
  uid: string;
  identity: {
    uid: string;
    fullName: string;
    primaryEmail: string;
    photoUrl?: string;
    vcsUsers?: Array<{ vcsUser: { source?: string } }>;
    tmsUsers?: Array<{ tmsUser: { source?: string } }>;
    calUsers?: Array<{ calUser: { source?: string } }>;
    imsUsers?: Array<{ imsUser: { source?: string } }>;
  };
  teams: Array<{ team: { name: string } }>;
};

type RawEmployeesData = { data?: { employees?: RawEmployee[] } };

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function deriveTrackingStatus(id: string): TrackingStatus {
  return stableHash(id) % 5 === 0 ? 'Ignored' : 'Included';
}

export function getEmployees(): Employee[] {
  const employees = (rawEmployees as unknown as RawEmployeesData).data
    ?.employees;
  if (!employees) return [];

  return employees.map((e) => {
    const accounts: AccountType[] = [];
    if (e.identity?.vcsUsers?.length) accounts.push('github');
    if (e.identity?.tmsUsers?.length) accounts.push('jira');
    if (e.identity?.calUsers?.length) accounts.push('google-calendar');
    if (e.identity?.imsUsers?.length) accounts.push('pagerduty');

    return {
      id: e.id,
      uid: e.identity?.uid ?? e.uid,
      fullName: e.identity?.fullName ?? e.uid,
      email: e.identity?.primaryEmail ?? '',
      photoUrl: e.identity?.photoUrl,
      teams: unique(
        (e.teams ?? []).map((t) => t.team?.name).filter(Boolean) as string[],
      ),
      accountsConnected: unique(accounts),
      trackingStatus: deriveTrackingStatus(e.id),
    };
  });
}

export type EmployeeDetails = {
  uid: string;
  title: string;
  name: string;
  email: string;
  role: string;
  location: string;
  level: string;
  employmentType: string;
};

const TITLES = [
  'Software Engineer',
  'Senior Engineer',
  'Product Engineer',
  'Solutions Engineer',
] as const;
const ROLES = ['IC', 'Manager'] as const;
const LOCATIONS = ['San Francisco', 'New York', 'Remote', 'London'] as const;
const LEVELS = ['L2', 'L3', 'L4', 'L5'] as const;
const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract'] as const;

export function getEmployeeDetails(e: Employee): EmployeeDetails {
  return {
    uid: e.uid,
    title: pickDeterministic(`${e.id}:title`, TITLES),
    name: e.fullName,
    email: e.email,
    role: pickDeterministic(`${e.id}:role`, ROLES),
    location: pickDeterministic(`${e.id}:location`, LOCATIONS),
    level: pickDeterministic(`${e.id}:level`, LEVELS),
    employmentType: pickDeterministic(`${e.id}:employment`, EMPLOYMENT_TYPES),
  };
}
