import styled from 'styled-components';
import { IconPlus, IconSearch } from '../components/Icons';
import { Button } from '../components/Button.styled';

export const PageWrapper = styled.div`
  min-height: 100%;
  background-color: #f8fafc;
  color: #0f172a;
`;

export const Header = styled.header`
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
`;

export const HeaderWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  max-width: 1160px;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
`;

export const HeaderLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const HeaderLogo = styled.img`
  height: 1.5rem;
  width: auto;
`;
export const HeaderNavBar = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
`;

export const NavItem = styled.span`
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  &:hover {
    background-color: #f8fafc;
  }
`;

export const Separator = styled.div`
  height: 25px;
  border-left: 1px solid #e5e7eb;
`;

export const HeaderRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
`;

export const PersonalLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
`;

export const Main = styled.main`
  max-width: 1160px;
  margin-left: auto;
  margin-right: auto;
  padding: 1.25rem 1.5rem;
`;

export const Breadcrumbs = styled.div`
  margin-bottom: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
`;

export const BreadcrumbSeparator = styled.span`
  color: #e2e8f0;
`;

export const BreadcrumbSelected = styled.span`
  color: #0f172a;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
`;

export const PageDescription = styled.p`
  margin-top: 0.25rem;
  max-width: 640px;
  font-size: 0.875rem;
  color: #64748b;
`;

export const NewButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const NewButtonIconWrapper = styled.span`
  display: inline-flex;
  height: 1rem;
  width: 1rem;
  align-items: center;
  justify-content: center;
`;

export const StyledNewButtonIcon = styled(IconPlus)`
  height: 0.875rem;
  width: 0.875rem;
  color: #ffffff;
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TablePagination = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #64748b;
`;

export const TablePaginationLabel = styled.div`
  font-size: 0.75rem;
  color: #94a3b8;
`;

export const TablePaginationButton = styled.button`
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  color: #64748b;

  &:hover {
    background-color: #f8fafc;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FilterSelectorWrapper = styled.div`
  padding: 0.5rem;
`;

export const FilterSelectorTitle = styled.div`
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #64748b;
  text-transform: uppercase;
`;

export const TableWrapper = styled.div`
  min-width: 0;
  flex: 1;
`;

export const FiltersWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SearchByNameWrapper = styled.div`
  position: relative;
`;
// IconSearch className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400'
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

export const SearchByNameInput = styled.input`
  height: 2.5rem;
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

export const FilterRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-radius: 0.375rem;
  padding: 0.5rem 0.5rem;
  &:hover {
    background-color: #f8fafc;
  }
`;

export const FilterRowLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FilterRowLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
`;

export const FilterRowCheckbox = styled.input`
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

export const FilterRowEditButton = styled.button`
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #0284c7;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e0f2fe;
  }
`;

export const FilterChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledIconPlus = styled(IconPlus)`
  height: 1rem;
  width: 1rem;
  color: #0284c7;
`;

export const AddFilterButton = styled(Button)`
  gap: 0.5rem;
`;
