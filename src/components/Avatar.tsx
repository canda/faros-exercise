import { useMemo, useState } from 'react';

import * as S from './Avatar.styled';

export function Avatar({ name, src }: { name: string; src?: string }) {
  const [broken, setBroken] = useState(false);
  const initials = useMemo(() => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '?';
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : '';
    return `${first}${last}`.toUpperCase();
  }, [name]);

  return (
    <S.Wrapper aria-label={name}>
      {!broken && src ? (
        <S.Image src={src} alt={name} onError={() => setBroken(true)} />
      ) : (
        initials
      )}
    </S.Wrapper>
  );
}
