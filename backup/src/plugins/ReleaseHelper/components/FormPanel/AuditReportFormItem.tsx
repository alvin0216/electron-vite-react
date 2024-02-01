import { Form, Input } from "antd";

interface AuditReportFormItemProps {}

const AuditReportFormItem: React.FC<AuditReportFormItemProps> = (props) => {
  return (
    <Form.Item
      label="Audit Report"
      name="auditReport"
      tooltip="Based on current branch, if the generation fails, please use VPN to complete."
      rules={[{ required: true }]}
    >
      <Input
        className="w-328"
        suffix=".json"
        placeholder="please input audit report file name"
      />
    </Form.Item>
  );
};

export default AuditReportFormItem;
