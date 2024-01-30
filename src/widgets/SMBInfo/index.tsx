import { useFile } from '@/hooks/useFile';
import { ProFormInstance } from '@ant-design/pro-components';
import { FileKeyEnum } from '@enum/index';
import { useRef } from 'react';
import ReactJson from 'react-json-view';

const SMBInfo: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const { json, setJson, open } = useFile(FileKeyEnum.smbInfo);

  return (
    <div className='grid grid-cols-2 gap-4'>
      <ReactJson
        name='smbInfo.json'
        sortKeys
        src={json}
        enableClipboard={false}
        displayDataTypes={false}
        onEdit={(data) => setJson(data.updated_src)}
        onAdd={(data) => setJson(data.updated_src)}
        onDelete={(data) => setJson(data.updated_src)}
      />
    </div>
  );
};

export default SMBInfo;
