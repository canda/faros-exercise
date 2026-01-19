import styled from 'styled-components';

import { IconX } from './Icons';

export const Button = styled.button`
  display: inline-flex;
  height: 2rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  background-color: #a4d2ff;
  padding: 0 0.625rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;

  &:hover {
    background-color: #7ab8f9;
  }
`;

export const Body = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const IconXWrapper = styled.span`
  display: inline-flex;
  height: 1.25rem;
  width: 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;

  &:hover {
    background-color: #e2e8f0;
  }
`;

export const StyledIconX = styled(IconX)`
  height: 0.875rem;
  width: 0.875rem;
  color: #6b7280;
`;
