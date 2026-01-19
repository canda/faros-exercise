import styled from 'styled-components';

export const PopoverWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Popover = styled.div`
  position: absolute;
  z-index: 50;
  margin-top: 0.5rem;
  width: 260px;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  box-shadow:
    0 10px 15px -3px rgba(15, 23, 42, 0.1),
    0 4px 6px -2px rgba(15, 23, 42, 0.05);
  left: 0;
`;
