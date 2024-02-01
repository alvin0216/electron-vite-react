import { Tag } from "antd";
import { memo, useMemo } from "react";

interface CodeDiffHeaderProps {
  diffFileName?: string;
  diffLen: number;
}

const getTag = (diffLength: number) => {
  if (diffLength < 1000) return "Small";
  else if (diffLength < 10000) return "Medium";
  return "Large";
};

const CodeDiffHeader: React.FC<CodeDiffHeaderProps> = memo(
  ({ diffFileName, diffLen }) => {
    const size = useMemo(() => {
      if (diffLen < 1000) return "Small";
      else if (diffLen < 10000) return "Medium";
      return "Large";
    }, [diffLen]);

    return diffFileName ? (
      <>
        <span>
          Code Diff
          <span className="pl-8 c-#00000073">({size})</span>
        </span>
      </>
    ) : (
      <span>Code Diff</span>
    );
  }
);
export default CodeDiffHeader;
