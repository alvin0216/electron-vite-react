import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types/index';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableTag from '@/widgets/PCSetting/CountrySetting/DraggableTag';
import { usePCSetting } from '@/hooks/usePCSetting';

interface CountriesProps {}

const Countries: React.FC<CountriesProps> = () => {
  const { countryList, setCountryList, countryCode, setCountry } = usePCSetting();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      // @ts-ignore
      setCountryList((data: CountryItem[]) => {
        const oldIndex = data.findIndex((item) => item.id === active.id);
        const newIndex = data.findIndex((item) => item.id === over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };

  const handleChecked = (checkId: string) => {
    if (countryCode !== checkId) {
      setCountry(checkId);
    }
  };

  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext items={countryList} strategy={horizontalListSortingStrategy}>
          {countryList.map((item) => (
            <DraggableTag
              item={item}
              key={item.id}
              checked={countryCode === item.id}
              onChange={() => handleChecked(item.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Countries;
