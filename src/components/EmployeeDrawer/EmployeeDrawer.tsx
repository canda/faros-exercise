import { type ReactNode, useMemo, useState } from 'react';
import * as S from './EmployeeDrawer.styled';

import type { Employee, EmployeeDetails } from '../../lib/employees';
import { Button } from '../Button.styled';
import Select from './Select';

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className='grid grid-cols-[96px_1fr] items-center gap-3 py-2'>
      <div className='text-xs font-semibold text-slate-600'>{label}</div>
      {children}
    </label>
  );
}

export function EmployeeDrawer({
  employee,
  initialDetails,
  onClose,
  onSave,
}: {
  employee: Employee;
  initialDetails: EmployeeDetails;
  onClose: () => void;
  onSave: (details: EmployeeDetails) => void;
}) {
  const [details, setDetails] = useState<EmployeeDetails>(initialDetails);

  const statusText = useMemo(
    () =>
      `${employee.trackingStatus} - ${employee.trackingStatus === 'Included' ? 'Active' : 'Ignored'}`,
    [employee.trackingStatus],
  );

  return (
    <S.Wrapper>
      <S.Header>
        <S.HeaderLabels>
          <S.EmployeeName>{employee.fullName}</S.EmployeeName>
          <S.StatusPillContainer>
            <S.StatusLabel status={employee.trackingStatus}>
              {statusText}
            </S.StatusLabel>
          </S.StatusPillContainer>
        </S.HeaderLabels>
        <S.CloseButton type='button' onClick={onClose} aria-label='Close panel'>
          <S.StyledIconX />
        </S.CloseButton>
      </S.Header>

      <S.Body>
        {/* TODO: make section collapsible */}
        <S.SectionLabel>Profile Info</S.SectionLabel>

        <S.SectionBody>
          <Field label='UID'>
            <S.TextInput value={details.uid} readOnly />
          </Field>
          <Field label='Title'>
            <S.TextInput
              value={details.title}
              onChange={(e) =>
                setDetails((d) => ({ ...d, title: e.target.value }))
              }
            />
          </Field>
          <Field label='Name'>
            <S.TextInput
              value={details.name}
              onChange={(e) =>
                setDetails((d) => ({ ...d, name: e.target.value }))
              }
            />
          </Field>
          <Field label='Email'>
            <S.TextInput
              value={details.email}
              onChange={(e) =>
                setDetails((d) => ({ ...d, email: e.target.value }))
              }
            />
          </Field>
          <Field label='Role'>
            <Select
              value={details.role}
              onChange={(role) => setDetails((d) => ({ ...d, role }))}
              options={['IC', 'Manager']}
            />
          </Field>
          <Field label='Location'>
            <Select
              value={details.location}
              onChange={(location) => setDetails((d) => ({ ...d, location }))}
              options={['San Francisco', 'New York', 'Remote', 'London']}
            />
          </Field>
          <Field label='Level'>
            <Select
              value={details.level}
              onChange={(level) => setDetails((d) => ({ ...d, level }))}
              options={['L2', 'L3', 'L4', 'L5']}
            />
          </Field>
          <Field label='Employment Type'>
            <Select
              value={details.employmentType}
              onChange={(employmentType) =>
                setDetails((d) => ({ ...d, employmentType }))
              }
              options={['Full-time', 'Part-time', 'Contract']}
            />
          </Field>
        </S.SectionBody>
      </S.Body>

      <S.Footer>
        <Button
          variant='primary'
          onClick={() => {
            onSave(details);
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            setDetails(initialDetails);
            onClose();
          }}
        >
          Cancel
        </Button>
      </S.Footer>
    </S.Wrapper>
  );
}
