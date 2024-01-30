import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types/index';
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import contryCodeList from './contry-code.json';
import { useState } from 'react';
import DraggableTag from '@/widgets/PCSetting/RegionSetting/DraggableTag';

interface RegionListProps {
  sortable: boolean;
  displayEn: boolean;
}

const RegionList: React.FC<RegionListProps> = ({ sortable, displayEn }) => {
  const [countryId, setCountryId] = useState('+244');
  const [items, setItems] = useState<RegionItem[]>(contryCodeList); // TODO

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
              displayEn={displayEn}
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

export default RegionList;
