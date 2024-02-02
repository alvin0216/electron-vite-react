import Filter from '@/components/Filter';
import JsonView from '@/components/JsonView';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum } from '@constants/enum';
import SNSelector from './SNSelector';
import { Col, Row } from 'antd';
import Customize from './Customize';

const SMBInfo: React.FC = () => {
  const { json, setJson, open } = useFile(FileKeyEnum.SMBInfo);

  return (
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
  );
};

export default SMBInfo;
