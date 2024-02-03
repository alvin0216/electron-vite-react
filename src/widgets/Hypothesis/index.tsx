import FilterResult from '@/components/FilterResult';
import FilterSelect from '@/components/FilterSelect';
import JsonView from '@/components/JsonView';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum } from '@constants/enum';
import { StorgeEnum } from '@constants/storage';
import { useLocalStorageState } from 'ahooks';
import { Col, Row, Space } from 'antd';

const Hypothesis: React.FC = () => {
  const { json, setJson, open, status } = useFile(FileKeyEnum.Hypothesis);
  const [filters, setFilters] = useLocalStorageState(StorgeEnum.HypFilters, { defaultValue: [] });

  return (
    <Row>
      <Col span={12}>
        <Space wrap>
          <FilterSelect json={json} value={filters} onChange={setFilters!} />
        </Space>
        <FilterResult json={json} setJson={setJson} filters={filters!} />
      </Col>

      <Col span={12}>
        <JsonView title='hypothesis.config' fileStatus={status as any} json={json} setJson={setJson} open={open} />
      </Col>
    </Row>
  );
};

export default Hypothesis;
