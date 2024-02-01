import { Button, Checkbox, Collapse, Form, Input, Tooltip } from "antd";
import { useCache, useCacheState } from "@/hooks/useCache";
import { useContext, useEffect, useMemo, useRef } from "react";
import { loadingTextEnum } from "@/context/releaseContext";
import SelectFolder from "@/components/SelectFolder";
import { invokeElectron } from "@/lib/bridge";
import AuditReportFormItem from "./AuditReportFormItem";
import CodeDiffFormItem from "./CodeDiffFormItem";
import { EMCEnum } from "@universal/enum";
import useReleaseCtx from "../../../../hooks/useReleaseCtx";
import useBoolean from "@/hooks/useBoolean";
import RepoNameFormItem from "./RepoNameFormItem";

interface ReleaseFormPanelProps {}

const formLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };

const ReleaseFormPanel: React.FC<ReleaseFormPanelProps> = ({}) => {
  const [form] = Form.useForm();
  const [formValues] = useCacheState("releaseHelper");
  const [, updateCache] = useCache();
  const {
    repo,
    prevBranch,
    nextBranch,
    gar,
    gcd,
    savePath,
    auditReport,
    checkDependencies,
    repoName,
  } = formValues;

  const [{ project, loadingText }, updateRCtx] = useReleaseCtx();
  const currentVersion = project?.current?.packJson.version || "";

  const ref = useRef(repo);
  useEffect(() => {
    // repo changed
    if (repo)
      initProjectInfo().then(() => {
        ref.current = repo;
      });
    else ref.current = repo;
  }, [repo]);

  const setLoading = (text: loadingTextEnum) => {
    updateRCtx((prev) => {
      prev.loadingText = text;
    });
  };

  const setFieldsValue = (values: Partial<ReleaseHelperValues>) => {
    //  form.setFieldsValues 不会触发 onValueChanges
    form.setFieldsValue(values);
    updateCache((draft) => {
      draft.releaseHelper = {
        ...draft.releaseHelper,
        ...values,
      };
    });
  };

  const initProjectInfo = (loading = true) => {
    if (loading) setLoading(loadingTextEnum.fetchRepo);

    return invokeElectron<ProjectInfo>(
      EMCEnum.GET_PROJECT_INFO,
      formValues
    ).then((res) => {
      console.debug("ProjectInfo", res);
      if (res) {
        updateRCtx((prev) => {
          prev.project = res;
          prev.loadingText = loadingTextEnum.none;
        });

        // project changed
        if (ref.current !== repo) {
          const newRepoName =
            res.current.packJson?.name || repo?.split(/\//g).reverse()[0];

          const version = project?.current?.packJson.version || "";

          setFieldsValue({
            repoName: newRepoName,
            prevBranch: undefined,
            nextBranch: undefined,
            codeDiff: "",
            auditReport: getAutoNameAuditReport(version),
          });
        }
      } else {
        setLoading(loadingTextEnum.none);
      }
    });
  };

  // ============ Auto fill ==========
  function getAutoNameAuditReport(version = currentVersion) {
    const repoName = form.getFieldValue("repoName");
    return `${repoName}-AuditReport-v${version}`;
  }

  function getAutoNameCodeDiff() {
    if (!project) return "";

    const repoName = form.getFieldValue("repoName");

    let [prevVersion, nextVersion] = ["", ""];
    for (let i = 0; i < project.branchList.length; i++) {
      const item = project.branchList[i];
      if (item.branch === prevBranch) prevVersion = item.packJson.version;
      else if (item.branch === nextBranch) nextVersion = item.packJson.version;

      if (prevVersion && nextVersion) {
        return `${repoName}-v${prevVersion}-v${nextVersion}`;
      }
    }
  }

  const autoFill = () => {
    setFieldsValue({
      codeDiff: getAutoNameCodeDiff(),
      auditReport: getAutoNameAuditReport(),
    });
  };
  // ============ End Auto fill ==========

  useEffect(() => {
    if (prevBranch && nextBranch) {
      const codeDiff = getAutoNameCodeDiff();

      if (codeDiff) setFieldsValue({ codeDiff });
    }
  }, [prevBranch, nextBranch]);

  const onValuesChange = (value: any, allValues: any) => {
    updateCache((draft) => {
      draft.releaseHelper = allValues;
    });

    if (value.repoName) {
      autoFill();
    }
  };

  // TODO
  const onRun = async (values: ReleaseHelperValues) => {
    try {
      if (values.gcd) {
        setLoading(loadingTextEnum.runCodeDiff);

        const res = await invokeElectron<RCodeDiff>(
          EMCEnum.GENERATE_CODE_DIFF,
          values
        );
        if (!res) return;
        console.debug("runCodeDiff", res);
        updateRCtx((prev) => {
          prev.loadingText = loadingTextEnum.none;
          prev.diffText = res.diffText.slice(0, 10000);
          prev.diffLen = res.diffLen;
          prev.diffFileName = res.diffFileName;
        });
      }

      if (values.checkDependencies) {
        setLoading(loadingTextEnum.runCheckDev);
        const res = await invokeElectron<DependenceInfo>(
          EMCEnum.CHECK_DEPENDENCIES,
          values
        );
        if (!res) return;
        console.debug("checkDependencies", res);
        updateRCtx((prev) => {
          prev.dependenceInfo = res;
        });
      }

      if (values.gar) {
        setLoading(loadingTextEnum.runAuditReport);
        const res = await invokeElectron(EMCEnum.GENERATE_AUDIT_REPORT, values);
        if (!res) return;
        console.debug("runAuditReport", res);
        updateRCtx((prev) => {
          prev.auditReportJson = res;
        });
      }
    } catch (err) {
    } finally {
      setLoading(loadingTextEnum.none);
    }
  };

  const isLoading = loadingText !== loadingTextEnum.none;

  const [isRefreshing, { setTrue, setFalse }] = useBoolean();
  const onRefreshProject = () => {
    setTrue();
    initProjectInfo(false).finally(() => setFalse());
  };

  function isDisabledRun() {
    if (!repo) return true;
    if (!gar && !gcd && !checkDependencies) return true;
    return false;
  }
  const disabledRun = isDisabledRun();

  return (
    <Form
      {...formLayout}
      layout="horizontal"
      form={form}
      initialValues={formValues}
      onValuesChange={onValuesChange}
      onFinish={onRun}
    >
      <RepoNameFormItem />

      <Form.Item
        label="Repository Path"
        required
        name="repo"
        rules={[{ required: true, message: "Project path cannot be empty" }]}
      >
        <SelectFolder />
      </Form.Item>

      {(gcd || gar) && (
        <>
          <Form.Item
            label="Save Path"
            tooltip="The generated files will all be saved in this path."
            required
            name="savePath"
            rules={[{ required: true, message: "Save path cannot be empty" }]}
          >
            <SelectFolder />
          </Form.Item>
        </>
      )}

      {gcd && (
        <CodeDiffFormItem
          branchList={project?.branchList || []}
          prevBranch={prevBranch}
          nextBranch={nextBranch}
        />
      )}
      {gar && <AuditReportFormItem />}

      <Form.Item {...{ wrapperCol: { span: 14, offset: 4 } }}>
        <Form.Item noStyle name="checkDependencies" valuePropName="checked">
          <Checkbox>Check dependencies</Checkbox>
        </Form.Item>

        <Form.Item noStyle name="gcd" valuePropName="checked">
          <Checkbox>Code Diff</Checkbox>
        </Form.Item>
        <Form.Item noStyle name="gar" valuePropName="checked">
          <Checkbox>Audit Report</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item {...{ wrapperCol: { span: 14, offset: 4 } }}>
        <Tooltip
          title={
            disabledRun
              ? "Repository path and save path is required."
              : undefined
          }
        >
          <Button
            type="primary"
            className="mr-8"
            htmlType="submit"
            disabled={disabledRun}
            loading={isLoading || isRefreshing}
          >
            Run
          </Button>
        </Tooltip>

        <Button
          className="mr-8"
          htmlType="button"
          disabled={!repo || isLoading}
          onClick={autoFill}
        >
          Auto Fill
        </Button>

        <Button
          className="mr-8"
          htmlType="button"
          disabled={!repo || isLoading}
          loading={isRefreshing}
          onClick={onRefreshProject}
        >
          Refresh Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReleaseFormPanel;
