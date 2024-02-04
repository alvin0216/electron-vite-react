import FilterResult from '@/components/FilterResult';
import FilterSelect from '@/components/FilterSelect';
import JsonView from '@/components/JsonView';
import VantageBin from '@/components/VantageBin';
import { useFile } from '@/hooks/useFile';
import { FileKeyEnum } from '@constants/enum';
import { StorgeEnum } from '@constants/storage';
import { useLocalStorageState } from 'ahooks';
import { Col, Row, Space } from 'antd';
import OperateFile from './OperateFile';

const Hypothesis: React.FC = () => {
  const { open, status, isWriteable, isReadonly, ...rest } = useFile(FileKeyEnum.Hypothesis);
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
          <VantageBin action='reboot' />
          <FilterSelect json={json} value={filters} onChange={setFilters!} />
        </Space>
        <FilterResult json={json} setJson={setJson} filters={filters!} disabled={!isWriteable} />
      </Col>

      <Col span={12}>
        <OperateFile />
        <JsonView
          readonly={isReadonly}
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
