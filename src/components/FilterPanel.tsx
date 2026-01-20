import { IconChevronLeft } from './Icons';

import * as S from './FilterPanel.styled';
import { useEffect, useState } from 'react';
import { Button } from './Button.styled';

const FilterPanel = ({
  onBack,
  itemName,
  allowSearch = false,
  items,
  selectedItems,
  setSelectedItems,
  onClose,
}: {
  onBack: () => void;
  itemName: string;
  allowSearch?: boolean;
  items: string[];
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  onClose: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [panelSelectedItems, setPanelSelectedItems] = useState<string[]>([]);
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    setPanelSelectedItems(selectedItems);
  }, [selectedItems]);

  return (
    <S.PanelWrapper>
      <S.Header>
        <S.BackButton type='button' onClick={() => onBack()} aria-label='Back'>
          <IconChevronLeft />
        </S.BackButton>
        <S.Title>{itemName}</S.Title>
      </S.Header>
      {allowSearch && (
        <>
          <S.SearchWrapper>
            <S.StyledIconSearch />
            <S.SearchInput
              placeholder={`Search ${itemName} name...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </S.SearchWrapper>

          <S.ActionBar>
            <S.ActionButton
              type='button'
              onClick={() => setPanelSelectedItems([])}
            >
              Deselect all
            </S.ActionButton>
            <S.ActionButton
              type='button'
              onClick={() => setPanelSelectedItems(items)}
            >
              Select all
            </S.ActionButton>
          </S.ActionBar>
        </>
      )}

      <S.Body>
        {filteredItems.map((item) => (
          <S.ItemRow key={item}>
            <S.Checkbox
              type='checkbox'
              checked={panelSelectedItems.includes(item)}
              onChange={(e) =>
                setPanelSelectedItems((prev) =>
                  e.target.checked
                    ? [...prev, item]
                    : prev.filter((x) => x !== item),
                )
              }
            />
            <S.ItemLabel>{item}</S.ItemLabel>
          </S.ItemRow>
        ))}
        {filteredItems.length === 0 ? (
          <S.NoResultsMessage>
            No {itemName} match “{searchTerm}”.
          </S.NoResultsMessage>
        ) : null}
      </S.Body>

      <div className='flex items-center gap-2 border-t border-slate-200 px-2 pt-2'>
        <Button
          size='sm'
          variant='primary'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedItems(panelSelectedItems);
            onClose();
          }}
        >
          Apply
        </Button>
        <Button
          size='sm'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </S.PanelWrapper>
  );
};

export default FilterPanel;
