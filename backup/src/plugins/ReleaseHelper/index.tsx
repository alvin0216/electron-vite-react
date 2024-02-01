import TodoList from "./components/TodoList";
import { ReleaseContext, defaultReleaseState } from "@/context/releaseContext";
import { useImmer } from "use-immer";

import CodeDiff from "./components/CodeDiff";
import { Collapse } from "antd";
import { useMemo } from "react";
import FormPanelHeader from "./components/FormPanel/FormPanelHeader";
import LoadingCar from "./components/FormPanel/LoadingCar";
import ReleaseFormPanel from "./components/FormPanel";
import { useCacheState } from "@/hooks/useCache";
import CodeDiffHeader from "./components/CodeDiff/CodeDiffHeader";
import DependenciesPanel from "./components/Dependencies";
import useReleaseCtx from "../../hooks/useReleaseCtx";
import AuditReport from "./components/AuditReport";

const { Panel } = Collapse;
const ReleaseHelper: React.FC = (props) => {
  const [rCtx] = useReleaseCtx();
  const {
    diffFileName,
    loadingText,
    project,
    diffLen,
    dependenceInfo,
    auditReportJson,
  } = rCtx;
  const [{ repo, repoName }] = useCacheState("releaseHelper");

  const packageJson = project?.current?.packJson;
  const currentVersion = packageJson?.version;

  const dependenceList = useMemo<DependenceItem[]>(() => {
    const dependencies: DependenceItem[] = Object.entries(
      packageJson?.dependencies || []
    ).map(([name, version]) => ({
      name,
      version: version.replace(/\^|~/, ""),
      latest: dependenceInfo.outdated?.[name]?.latest,
      isLenovo: name.includes("lenovo") || name.includes("vantage"),
      isOutdated: !!dependenceInfo.outdated?.[name],
      isDevDependence: false,
    }));

    const devDependence: DependenceItem[] = Object.entries(
      packageJson?.devDependencies || []
    ).map(([name, version]) => ({
      name,
      version: version.replace(/\^|~/, ""),
      latest: dependenceInfo.outdated?.[name]?.latest,
      isLenovo: name.includes("lenovo") || name.includes("vantage"),
      isOutdated: !!dependenceInfo.outdated?.[name],
      isDevDependence: true,
    }));

    return [...dependencies, ...devDependence];
  }, [dependenceInfo, packageJson]);

  return (
    <div className="release-helper grid grid-cols-3 gap-4">
      <TodoList />

      {/* Action */}
      <div className="col-span-full sm:col-span-2">
        <Collapse defaultActiveKey={["form"]}>
          <Panel
            header={
              <FormPanelHeader
                repoName={repoName}
                branch={project?.current?.branch}
                currentVersion={currentVersion}
              />
            }
            extra={<LoadingCar text={loadingText} />}
            key="form"
          >
            <ReleaseFormPanel />
          </Panel>

          <Panel
            header="Dependencies"
            key="check-dependencies"
            collapsible={
              dependenceList.length === 0 || !dependenceInfo.outdated
                ? "disabled"
                : undefined
            }
          >
            <DependenciesPanel
              dataList={dependenceList}
              packJson={project?.current.packJson as any}
            />
          </Panel>

          <Panel
            header={
              <CodeDiffHeader diffFileName={diffFileName} diffLen={diffLen} />
            }
            key="code-diff"
            collapsible={!diffFileName ? "disabled" : undefined}
          >
            <CodeDiff />
          </Panel>

          <Panel
            header="Audit Report"
            key="audit-report"
            collapsible={!auditReportJson ? "disabled" : undefined}
          >
            {auditReportJson && (
              <AuditReport auditReportJson={auditReportJson} />
            )}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default () => {
  const contextValue = useImmer(defaultReleaseState);
  return (
    <ReleaseContext.Provider value={contextValue}>
      <ReleaseHelper />
    </ReleaseContext.Provider>
  );
};
