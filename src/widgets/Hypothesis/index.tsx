import Filter from '@/components/Filter';
import JsonView from '@/components/JsonView';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum } from '@constants/enum';
import { Col, Row } from 'antd';

const Hypothesis: React.FC = () => {
  const { json, setJson, open, status } = useFile(FileKeyEnum.Hypothesis);

  return (
    <Row>
      <Col span={12}>
        <Filter json={json} setJson={setJson}></Filter>
      </Col>
      <Col span={12}>
        <JsonView title='hypothesis.config' fileStatus={status as any} json={json} setJson={setJson} open={open} />
      </Col>
    </Row>
  );
};

export default Hypothesis;
