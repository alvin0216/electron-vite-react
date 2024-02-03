import Filter from '@/components/Filter';
import JsonView from '@/components/JsonView';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum, FileStatus } from '@constants/enum';
import { SNSelector, MtmSelector } from './Selector';
import { Col, Row, Space } from 'antd';
import Customize from './Customize';
import { SMBCacheContext, useInitialSMBCache } from '@/contexts/SMBCacheContext';
import ServiceController from '@/components/ServiceController';

const SMBInfo: React.FC = () => {
  const { json, setJson, open, status } = useFile(FileKeyEnum.SMBInfo);
  const ctx = useInitialSMBCache();

  return (
    <SMBCacheContext.Provider value={ctx as any}>
      <Row>
        <Col span={12}>
          <Space wrap>
            <SNSelector
              value={json.LenovoSerialNumber}
              onChange={(v) => {
                setJson({ ...json, LenovoSerialNumber: v });
              }}
            />
            <MtmSelector
              value={json.Mtm}
              onChange={(v) => {
                setJson({ ...json, Mtm: v });
              }}
            />
            <Customize />
            <ServiceController action='reboot' />
            <Filter json={json} setJson={setJson}></Filter>
          </Space>
        </Col>

        <Col span={12}>
          <JsonView title='SMBInfo.json' fileStatus={status as any} json={json} setJson={setJson} open={open} />
        </Col>
      </Row>
    </SMBCacheContext.Provider>
  );
};

export default SMBInfo;
