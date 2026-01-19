import styled from 'styled-components';
import { IconPlus } from '../components/Icons';

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
