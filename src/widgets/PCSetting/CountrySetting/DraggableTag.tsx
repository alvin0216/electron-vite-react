import { useSortable } from '@dnd-kit/sortable';
import { Tag } from 'antd';

type DraggableTagProps = {
  sortable: boolean;
  showEn: boolean;
  item: CountryItem;
  checked: boolean;
  onChange?(checked: boolean): void;
};

const { CheckableTag } = Tag;

const DraggableTag: React.FC<DraggableTagProps> = (props) => {
  const { item, checked, onChange, showEn, sortable } = props;
  const { listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const commonStyle = { cursor: sortable ? 'move' : 'pointer', transition: 'unset' };

  const style = transform
    ? {
        ...commonStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? 'unset' : transition, // Improve performance/visual effect when dragging
      }
    : commonStyle;

  const _listeners = sortable ? listeners : {};
  return (
    <CheckableTag checked={checked} onChange={onChange} style={style} ref={setNodeRef} {..._listeners}>
      {showEn ? item.en : item.cn}
    </CheckableTag>
  );
};

export default DraggableTag;
