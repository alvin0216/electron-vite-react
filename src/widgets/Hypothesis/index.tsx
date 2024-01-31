import Filter from '@/components/Filter';
import JsonView from '@/components/JsonView';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum } from '@constants/enum';

const Hypothesis: React.FC = () => {
  const { json, setJson, open } = useFile(FileKeyEnum.hypothesis);

  return (
    <div className='grid grid-cols-2 gap-4'>
      <Filter json={json} setJson={setJson} />
      <JsonView title='Hypothesis.config' isFileReadonly={false} json={json} setJson={setJson} open={open} />
    </div>
  );
};

export default Hypothesis;
