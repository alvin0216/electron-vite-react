import Filter from '@/components/Filter';
import JsonView from '@/components/JsonView';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum } from '@constants/enum';
import SNSelector from './SNSelector';

const SMBInfo: React.FC = () => {
  const { json, setJson, open } = useFile(FileKeyEnum.SMBInfo);

  return (
    <div className='grid grid-cols-2 gap-4'>
      <Filter json={json} setJson={setJson}>
        <SNSelector />
      </Filter>

      <JsonView title='SMBInfo.json' json={json} setJson={setJson} open={open} />
    </div>
  );
};

export default SMBInfo;
