import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types/index';
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import countries from '@constants/countries.json';
import { useState } from 'react';
import DraggableTag from '@/widgets/PCSetting/CountrySetting/DraggableTag';

interface CountriesProps {
  sortable: boolean;
  showEn: boolean;
}

const Countries: React.FC<CountriesProps> = ({ sortable, showEn }) => {
  const [countryId, setCountryId] = useState('+244');
  const [items, setItems] = useState<CountryItem[]>(countries); // TODO

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setItems((data) => {
        const oldIndex = data.findIndex((item) => item.id === active.id);
        const newIndex = data.findIndex((item) => item.id === over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };

  const handleChecked = (checkId: string) => {
    if (countryId !== checkId) {
      setCountryId(checkId);
    }
  };

  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          {items.map((item) => (
            <DraggableTag
              sortable={sortable}
              showEn={showEn}
              item={item}
              key={item.id}
              checked={countryId === item.id}
              onChange={() => handleChecked(item.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Countries;
