import { FileSelector, FolderSelector } from '@/components/FileFolderSelector';
import { useCodediffCtx } from '@/hooks/useCodediffCtx';
import { ProForm, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useRef } from 'react';

const CodeDiffForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const {
    repoInfo,
    cdFields,
    setCDFields,
    getRepoInfo,
    fetchRepoAccess,
    fetchingRepoInfo,
    run,
    cdFieldsDefaultValues,
    reset,
  } = useCodediffCtx();

  const onValuesChange = (val: PartialCodeDiffFields, allValues: PartialCodeDiffFields) => {
    let m = {} as any;
    if (val.prevBranch) {
      m.prevVersion = repoInfo?.branches.find((b) => b.name === val.prevBranch)?.version;
    }
    if (val.nextBranch) {
      m.nextVersion = repoInfo?.branches.find((b) => b.name === val.nextBranch)?.version;
    }
    // @ts-ignore
    setCDFields((prev) => ({ ...prev, ...allValues, ...m }));
  };

  const branchOptions = repoInfo?.branches.map?.((b) => ({
    value: b.name,
    label: (
      <Space>
        <Tag color='cyan'>{b.name}</Tag>
        <span>v{b.version}</span>
      </Space>
    ),
  }));

  return (
    <ProForm<CodeDiffFields>
      initialValues={cdFields}
      layout='horizontal'
      formRef={formRef}
      onValuesChange={onValuesChange}
      onFinish={run}
      onReset={() => {
        formRef.current?.setFieldsValue(cdFieldsDefaultValues);
        reset();
      }}
      submitter={{
        render: (props, [reset, submit]) => {
          return [
            reset,
            <Button
              key='refresh'
              type='primary'
              onClick={getRepoInfo}
              disabled={!fetchRepoAccess}
              loading={fetchingRepoInfo}>
              Refresh Repo Info
            </Button>,
            submit,
          ];
        },
      }}>
      <ProForm.Item label='Repo Path' name='repoPath' rules={[{ required: true }]}>
        <FolderSelector />
      </ProForm.Item>

      <ProForm.Item label='PackageJson' name='packageJsonPath' rules={[{ required: true }]}>
        <FileSelector />
      </ProForm.Item>

      <ProFormSelect label='Prev Branch' name='prevBranch' options={branchOptions} rules={[{ required: true }]} />
      <ProFormSelect label='Next Branch' name='nextBranch' options={branchOptions} rules={[{ required: true }]} />
      <ProFormText label='ExcludePattern' name='excludePattern' rules={[{ required: true }]} />
      <ProFormText label='RepoName' name='repoName' rules={[{ required: true }]} />
    </ProForm>
  );
};

export default CodeDiffForm;
