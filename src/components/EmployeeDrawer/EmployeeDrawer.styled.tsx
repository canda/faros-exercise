import styled from 'styled-components';
import { IconX } from '../Icons';
import type { TrackingStatus } from '../../lib/employees';

export const Wrapper = styled.aside`
  display: flex;
  height: 100%;
  width: 360px;
  flex-shrink: 0;
  flex-direction: column;
  border-left: 1px solid #e2e8f0;
  background-color: #ffffff;
`;

export const Header = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
`;

export const HeaderLabels = styled.div`
  min-width: 0;
`;

export const EmployeeName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// mt-1 flex items-center gap-2
export const StatusPillContainer = styled.div`
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatusLabel = styled.span<{ status: TrackingStatus }>`
  display: inline-flex;
  align-items: center;
  border-radius: calc(infinity * 1px);
  border: 1px solid;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  ${(props) => {
    switch (props.status) {
      case 'Included':
        return `
      border-color: #a7f3d0;
      background-color: #d1fae5;
      color: #065f46;
    `;
      case 'Ignored':
        return `
      border-color: #fecdd3;
      background-color: #fef2f2;
      color: #b91c1c;
    `;
    }
  }}
`;

export const CloseButton = styled.button`
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  color: #6b7280;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const StyledIconX = styled(IconX)`
  height: 1rem;
`;

export const Body = styled.div`
  flex: 1;
  overflow: auto;
  padding: 0.75rem 1rem;
`;

export const SectionLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #6b7280;
`;

export const SectionBody = styled.div`
  margin-top: 0.5rem;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  border-top: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
`;

export const TextInput = styled.input<{ readOnly?: boolean }>`
  height: 36px;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: ${(props) => (props.readOnly ? '#f9fafb' : '#ffffff')};
  padding: 0 0.75rem;
  font-size: 0.875rem;
  color: ${(props) => (props.readOnly ? '#4b5563' : '#1e293b')};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #38bdf8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
  }
`;
