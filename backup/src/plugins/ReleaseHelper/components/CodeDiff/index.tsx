import { Badge, Descriptions, Button, Alert } from "antd";
import { Suspense, lazy, useMemo } from "react";
import useReleaseCtx from "../../../../hooks/useReleaseCtx";
import { send } from "@/lib/bridge";
import { EMCEnum } from "@universal/enum";
import { useCacheState } from "@/hooks/useCache";

const DiffViewer = lazy(() => import("./DiffViewer"));
const { ErrorBoundary } = Alert;
interface CodeDiffProps {}

const CodeDiff: React.FC<CodeDiffProps> = (props) => {
  const [{ diffText, diffLen, diffFileName }] = useReleaseCtx();
  const [{ savePath, codeDiff }] = useCacheState("releaseHelper");

  const size = useMemo(() => {
    if (diffLen < 1000) return "Small";
    else if (diffLen < 10000) return "Medium";
    return "Large";
  }, [diffLen]);

  return (
    <Suspense fallback="loading...">
      <Descriptions bordered className="mb-24" title="Information">
        <Descriptions.Item label="File name">{diffFileName}</Descriptions.Item>
        <Descriptions.Item label="Diff length">{diffLen}</Descriptions.Item>
        <Descriptions.Item label="Diff size">{size}</Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
      </Descriptions>
      <div className="font-600 text-16 c-#000 opacity-88 mb-16">
        Pre 10000 diff view
        <Button
          type="link"
          onClick={() => {
            send(EMCEnum.OPEN_FILE, `${savePath}/${codeDiff}.diff`);
          }}
        >
          open file for more details
        </Button>
      </div>
      {/*  */}

      <ErrorBoundary>
        <DiffViewer diffText={diffText} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default CodeDiff;
