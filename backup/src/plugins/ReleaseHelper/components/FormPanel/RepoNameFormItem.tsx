import { Form, Typography } from "antd";
const { Paragraph } = Typography;

interface RepoNameFormItemProps {}

const Text = (props: any) => {
  return (
    <Paragraph
      className="!mb-0"
      editable={{
        onChange: props.onChange,
      }}
    >
      {props.value}
    </Paragraph>
  );
};

const RepoNameFormItem: React.FC<RepoNameFormItemProps> = (props) => {
  return (
    <Form.Item label="Repository Name" name="repoName">
      <Text />
    </Form.Item>
  );
};

export default RepoNameFormItem;
