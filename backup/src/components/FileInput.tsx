import { invokeElectron } from "@/lib/bridge";
import { Button, Input } from "antd";
import { EMCEnum } from "@universal/enum";

interface FileInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const FileInput: React.FC<FileInputProps> = (props) => {
  return (
    <Input.Group compact>
      <Input
        allowClear
        style={{ width: "70%" }}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
      <Button
        style={{ width: "30%" }}
        type="primary"
        onClick={async () => {
          const filePath = await invokeElectron(EMCEnum.SELECT_FOLDER);
          props.onChange?.(filePath);
        }}
      >
        Select Folder
      </Button>
    </Input.Group>
  );
};

export default FileInput;
