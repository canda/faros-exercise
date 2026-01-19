import styled from 'styled-components';

const SelectElement = styled.select`
  height: 36px;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: #ffffff;
  padding: 0 0.625rem;
  font-size: 0.875rem;
  color: #1e293b;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #38bdf8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
  }
`;

const Select = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) => {
  return (
    <SelectElement value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </SelectElement>
  );
};

export default Select;
