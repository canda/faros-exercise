import styled from 'styled-components';
import { IconSearch } from './Icons';

export const PanelWrapper = styled.div`
  padding: 0.5rem;
`;

export const Header = styled.div`
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
`;

export const BackButton = styled.button`
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  color: #64748b;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const Title = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  text-transform: capitalize;
`;

export const StyledIconSearch = styled(IconSearch)`
  pointer-events: none;
  position: absolute;
  left: 1.25rem;
  top: 50%;
  height: 1rem;
  width: 1rem;
  transform: translateY(-50%);
  color: #94a3b8;
`;

export const SearchInput = styled.input`
  height: 2.25rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  padding-left: 2.25rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  color: #1e293b;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #38bdf8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
  }
`;
export const SearchWrapper = styled.div`
  position: relative;
  padding: 0 0.5rem 0.5rem 0.5rem;
`;

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
`;

export const ActionButton = styled.button`
  border-radius: 0.375rem;
  padding: 0.25rem 0.375rem;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
  }
`;

export const Body = styled.div`
  max-height: 220px;
  overflow: auto;
  padding: 0 0.5rem 0.5rem 0.5rem;
`;

export const ItemRow = styled.label`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  padding: 0.5rem 0.375rem;
  &:hover {
    background-color: #f8fafc;
  }
`;

export const Checkbox = styled.input`
  height: 1rem;
  width: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #cbd5e1;
  color: #0284c7;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.5);
  }
`;

export const ItemLabel = styled.span`
  font-size: 0.875rem;
  color: #334155;
`;

export const NoResultsMessage = styled.div`
  padding: 0.75rem 0.375rem;
  font-size: 0.875rem;
  color: #64748b;
`;
