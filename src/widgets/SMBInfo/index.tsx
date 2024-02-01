import Filter from '@/components/Filter';
import JsonView from '@/components/JsonView';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum } from '@constants/enum';

const SMBInfo: React.FC = () => {
  const { json, setJson, open } = useFile(FileKeyEnum.SMBInfo);

  return (
    <div className='grid grid-cols-2 gap-4'>
      <Filter json={json} setJson={setJson} />
      <JsonView title='SMBInfo.json' json={json} setJson={setJson} open={open} />
    </div>
  );
};

export default SMBInfo;
