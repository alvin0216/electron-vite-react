import { invokeElectron } from "@/lib/bridge";
import { Button, Tag } from "antd";
import { EMCEnum } from "@universal/enum";

interface SelectFolderProps {
  value?: string;
  onChange?: any;
  onlyFile?: boolean;
}

const SelectFolder: React.FC<SelectFolderProps> = (props) => {
  return (
    <div>
      <Button
        size="small"
        type="primary"
        onClick={async () => {
          const projectPath = await invokeElectron(EMCEnum.SELECT_FOLDER, {
            properties: props.onlyFile ? [EMCEnum.OPEN_FILE] : undefined,
          });
          projectPath && props.onChange?.(projectPath);
        }}
      >
        {props.onlyFile ? "Select File" : "Select Folder"}
      </Button>
      <span className="ml-8 c-#00000073">{props.value}</span>
    </div>
  );
};

export default SelectFolder;
