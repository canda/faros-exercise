import * as S from './Chip.styled';

export function Chip({
  children,
  onRemove,
  onClick,
}: {
  onRemove?: () => void;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <S.Button type='button' onClick={onClick}>
      <S.Body>{children}</S.Body>
      {onRemove ? (
        <S.IconXWrapper
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
        >
          <S.StyledIconX />
        </S.IconXWrapper>
      ) : null}
    </S.Button>
  );
}
