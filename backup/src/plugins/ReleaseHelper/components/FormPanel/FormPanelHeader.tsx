import { Tag } from "antd";
import { memo } from "react";

interface FormPanelHeaderProps {
  repoName: string;
  branch?: string;
  currentVersion?: string;
}

const FormPanelHeader: React.FC<FormPanelHeaderProps> = memo(
  ({ repoName, branch, currentVersion }) => {
    return repoName ? (
      <>
        <Tag color="magenta">Repo: {repoName}</Tag>
        {branch && (
          <span className="c-#00000073">
            {branch}
            (v{currentVersion})
          </span>
        )}
      </>
    ) : (
      <span>Your Project Information</span>
    );
  }
);

export default FormPanelHeader;
