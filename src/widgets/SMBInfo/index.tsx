import Filter from '@/components/Filter';
import JsonView from '@/components/JsonView';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum } from '@constants/enum';
import SNSelector from './SNSelector';
import { Col, Row } from 'antd';
import Customize from './Customize';
import { SMBCacheContext, useInitialSMBCache } from '@/contexts/SMBCacheContext';

const SMBInfo: React.FC = () => {
  const { json, setJson, open } = useFile(FileKeyEnum.SMBInfo);
  const ctx = useInitialSMBCache();

  return (
    <SMBCacheContext.Provider value={ctx as any}>
      <Row>
        <Col span={12}>
          <Filter json={json} setJson={setJson}>
            <SNSelector />
            <Customize />
          </Filter>
        </Col>

        <Col span={12}>
          <JsonView title='SMBInfo.json' json={json} setJson={setJson} open={open} />
        </Col>
      </Row>
    </SMBCacheContext.Provider>
  );
};

export default SMBInfo;
