import { parseDiff, Diff, Hunk } from "react-diff-view";
import "./index.scss";
import { memo } from "react";
interface DiffViewerProps {
  diffText: string;
}

const DiffViewer: React.FC<DiffViewerProps> = memo(({ diffText }) => {
  const files = parseDiff(diffText);

  const renderFile = ({ oldRevision, newRevision, type, hunks }: any) => (
    <Diff
      key={oldRevision + "-" + newRevision}
      viewType="split"
      diffType={type}
      hunks={hunks}
    >
      {(hunks) => hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)}
    </Diff>
  );

  return (
    <div className="max-h-100vh overflow-auto">{files.map(renderFile)}</div>
  );
});

export default DiffViewer;
