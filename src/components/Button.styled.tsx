import styled from 'styled-components';

type Variant = 'primary' | 'secondary';
type Size = 'sm' | 'md';

export const Button = styled.button<{ variant?: Variant; size?: Size }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid;
  font-size: 0.875rem;
  font-weight: 500;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.6);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  ${(props) =>
    props.size === 'sm'
      ? `
    height: 2rem;
    padding: 0 0.75rem;
  `
      : `
    height: 2.25rem;
    padding: 0 0.875rem;
  `}

  ${(props) =>
    props.variant === 'primary'
      ? `
    background-color: #0369a1;
    border-color: #075985;
    color: white;

    &:hover {
      background-color: #075985;
      border-color: #0c4a6e;
    }
  `
      : `
    background-color: white;
    border-color: #e2e8f0;
    color: #374151;

    &:hover {
      background-color: #f9fafb;
      border-color: #cbd5e1;
    }
  `}
`;
