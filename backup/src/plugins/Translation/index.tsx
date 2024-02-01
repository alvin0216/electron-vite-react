import { Button, Form, Radio, Switch, message } from "antd";

import FileInput from "@/components/FileInput";

import { invokeElectron } from "@/lib/bridge";
import { useCacheState } from "@/hooks/useCache";
import { EMCEnum } from "@universal/enum";

interface TranslationProps {}

const Translation: React.FC<TranslationProps> = (props) => {
  const [state, updateState, setState] = useCacheState("transition");

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={state}
      onValuesChange={(v, allValues) => setState(allValues)}
      onFinish={async (values) => {
        invokeElectron(EMCEnum.TRANSLATION_IMPORT, values).then(
          ([updateCount]) => {
            message.success(
              `You have successfully updated ${updateCount} files!`
            );
          }
        );
      }}
    >
      <Form.Item
        label="Translation resources"
        required
        name="source"
        rules={[
          { required: true, message: "Translation resource cannot be empty" },
        ]}
      >
        <FileInput />
      </Form.Item>

      <Form.Item
        label="Project path"
        required
        name="projectPath"
        rules={[{ required: true, message: "Project path cannot be empty" }]}
      >
        <FileInput />
      </Form.Item>

      <Form.Item label="Indentation" name="spaces" wrapperCol={{ span: 4 }}>
        <Radio.Group>
          <Radio value={2}>2</Radio>
          <Radio value={4}>4</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Property Sort" name="sort" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Translation;
