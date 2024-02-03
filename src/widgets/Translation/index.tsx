import { ProForm, ProFormRadio, ProFormSwitch } from '@ant-design/pro-components';
import { Col, Row, Space } from 'antd';
import { IndentationEnum } from '@constants/enum';
import { UploadFile } from 'antd/lib';
import Vuploader from '@/components/Vuploader';

interface Fields {
  source: UploadFile[];
  target: UploadFile[];
  indentation: '2' | '4';
  sort: boolean;
}

const Translation = () => {
  return (
    <ProForm<Fields>
      layout='horizontal'
      initialValues={{ indentation: '2', sort: true }}
      onFinish={async (v) => {
        const [source, target] = [
          v.source?.map((f) => ({ name: f.name, path: f.originFileObj?.path })),
          v.target?.map((f) => ({ name: f.name, path: f.originFileObj?.path })),
        ];
        console.log('submit', { source, target, indentation: v.indentation, sort: v.sort });
        return false;
      }}>
      <Row gutter={24}>
        <Col span={12}>
          <ProForm.Item name='source'>
            <Vuploader title='Click or drag source folder to this area' />
          </ProForm.Item>
        </Col>

        <Col span={12}>
          <ProForm.Item name='target'>
            <Vuploader title='Click or drag target folder to this area' />
          </ProForm.Item>
        </Col>
      </Row>
      <ProFormRadio.Group
        label='Indentation'
        name='indentation'
        valueEnum={{ [IndentationEnum.Two]: IndentationEnum.Two, [IndentationEnum.Four]: IndentationEnum.Four }}
      />

      <ProFormSwitch label='Property Sort' name='sort' valuePropName='checked' />
    </ProForm>
  );
};

export default Translation;
