import { FileSelector, FolderSelector } from '@/components/FileFolderSelector';
import { useCodediffCtx } from '@/hooks/useCodediffCtx';
import { ProForm, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

const CodeDiffForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const { branchOptions, cdFields, setCDFields, getRepoInfo, fetchRepoAccess, fetchingRepoInfo, run } =
    useCodediffCtx();

  const onValuesChange = (val: any, allValues: Partial<CodeDiffFields>) => {
    setCDFields((prev) => ({ ...prev, ...allValues }));
  };

  return (
    <ProForm
      initialValues={cdFields}
      layout='horizontal'
      formRef={formRef}
      onValuesChange={onValuesChange}
      onFinish={run}
      onReset={() => {
        formRef.current?.setFieldsValue({
          repoPath: undefined,
          packageJsonPath: undefined,
          prevBranch: undefined,
          nextBranch: undefined,
          prevVersion: undefined,
          nextVersion: undefined,
          excludePattern: '!package-lock.json',
          repoName: undefined,
        });
      }}
      submitter={{
        render: (props, doms) => {
          return [
            ...doms,
            <Button
              key='refresh'
              type='primary'
              onClick={getRepoInfo}
              disabled={!fetchRepoAccess}
              loading={fetchingRepoInfo}>
              Refresh Repo Info
            </Button>,
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
