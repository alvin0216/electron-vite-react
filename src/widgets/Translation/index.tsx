import { ProForm, ProFormInstance, ProFormRadio, ProFormSwitch } from '@ant-design/pro-components';
import { Col, Row, Space } from 'antd';
import { IPCEnum, IndentationEnum } from '@constants/enum';
import { UploadFile } from 'antd/lib';
import Vuploader from '@/components/Vuploader';
import { useIpc } from '@/hooks/useIpc';
import { useRef } from 'react';

interface Fields {
  source: UploadFile[];
  target: UploadFile[];
  indentation: '2' | '4';
  sort: boolean;
}

interface ResultItem {
  sourceFilePath: string;
  targetFilePath: string;
}

const Translation = () => {
  const { invoke } = useIpc();

  const formRef = useRef<ProFormInstance>();

  const handleSubmit = async (v: Fields) => {
    const [source, target] = [
      v.source?.map((f) => ({ name: f.name, path: f.originFileObj?.path })),
      v.target?.map((f) => ({ name: f.name, path: f.originFileObj?.path })),
    ];

    const result: ResultItem[] = await invoke(IPCEnum.Translate, {
      source,
      target,
      indentation: v.indentation,
      sort: v.sort,
    });

    formRef.current?.setFieldsValue({
      source: v.source.map((s) => ({
        ...s,
        status: result.some((r) => r.sourceFilePath === s.originFileObj?.path) ? 'done' : s.status,
      })),
      target: v.target.map((t) => ({
        ...t,
        status: result.some((r) => r.targetFilePath === t.originFileObj?.path) ? 'done' : t.status,
      })),
    });
    
    return true;
  };

  return (
    <ProForm<Fields>
      layout='horizontal'
      formRef={formRef}
      initialValues={{ indentation: '2', sort: true }}
      onFinish={handleSubmit}>
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
