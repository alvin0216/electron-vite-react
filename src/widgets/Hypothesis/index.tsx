import Filter from '@/components/Filter';
import JsonView from '@/components/JsonView';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum } from '@constants/enum';

const Hypothesis: React.FC = () => {
  const { json, setJson, open, status } = useFile(FileKeyEnum.Hypothesis);

  return (
    <div className='grid grid-cols-2 gap-4'>
      <Filter json={json} setJson={setJson} />
      <JsonView title='hypothesis.config' fileStatus={status as any} json={json} setJson={setJson} open={open} />
    </div>
  );
};

export default Hypothesis;
