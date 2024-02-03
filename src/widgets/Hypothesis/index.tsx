import FilterResult from '@/components/FilterResult';
import FilterSelect from '@/components/FilterSelect';
import JsonView from '@/components/JsonView';
import ServiceController from '@/components/ServiceController';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum } from '@constants/enum';
import { StorgeEnum } from '@constants/storage';
import { useLocalStorageState } from 'ahooks';
import { Col, Row, Space } from 'antd';
import ToggleWriteable from './ToggleWriteable';

const Hypothesis: React.FC = () => {
  const { open, status, ...rest } = useFile(FileKeyEnum.Hypothesis);
  const [filters, setFilters] = useLocalStorageState(StorgeEnum.HypFilters, { defaultValue: [] });

  // covert
  const json = rest.json?.Choiceses || {};
  const setJson = (newJson: object) => {
    rest.setJson({
      ...rest.json,
      Choiceses: newJson,
    });
  };

  return (
    <Row>
      <Col span={12}>
        <Space wrap>
          <ToggleWriteable fileStatus={status as any} />
          <ServiceController action='reboot' />
          <FilterSelect json={json} value={filters} onChange={setFilters!} />
        </Space>
        <FilterResult json={json} setJson={setJson} filters={filters!} />
      </Col>

      <Col span={12}>
        <JsonView
          title='hypothesis.config'
          fileStatus={status as any}
          json={rest.json}
          setJson={rest.setJson}
          open={open}
        />
      </Col>
    </Row>
  );
};

export default Hypothesis;
