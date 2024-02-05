import { FileSelector, FolderSelector } from '@/components/FileFolderSelector';
import { useRepo } from '@/hooks/useRepo';
import { ProForm, ProFormDependency, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Spin, Typography } from 'antd';
import { useMemo, useRef, useState } from 'react';

const { Paragraph } = Typography;

const CodeDiffForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const { getRepoInfo, repoInfo, loading } = useRepo();

  const [state, setState] = useState<Partial<CodeDiffFields>>({
    repoPath: 'sss',
    packageJsonPath: 'dddd',
    prevBranch: undefined,
    nextBranch: undefined,
    prevVersion: undefined,
    nextVersion: undefined,
    excludePattern: '":!package-lock.json"',
  });

  const options = repoInfo?.branches.map?.((b) => ({ value: b.name, label: `${b.name} (${b.version})` }));

  const onValuesChange = (val: any, allValues: Partial<CodeDiffFields>) => {
    setState((prev) => ({ ...prev, ...allValues }));
  };

  const { cmd } = useMemo(() => {
    const prevVersion = repoInfo?.branches.find((b) => state.prevBranch === b.name)?.version || state.prevVersion;
    const nextVersion = repoInfo?.branches.find((b) => state.nextBranch === b.name)?.version || state.nextVersion;
    const template =
      'git diff [prevBranch] [nextBranch] -- [excludePattern] > [repoName]-v[prevVersion]-v[nextVersion].diff';

    const cmd = template
      .replace('[repoPath]', state.repoPath || '[repoPath]')
      .replace('[prevBranch]', state.prevBranch || '[prevBranch]')
      .replace('[nextBranch]', state.nextBranch || '[nextBranch]')
      .replace('[excludePattern]', state.excludePattern || '[excludePattern]')
      .replace('[repoName]', state.repoName || '[repoName]')
      .replace('[prevVersion]', prevVersion || '[prevVersion]')
      .replace('[nextVersion]', nextVersion || '[nextVersion]');
    return { prevVersion, nextVersion, cmd };
  }, [repoInfo, state]);

  const fetchRepoAccess = !!(state.repoPath && state.packageJsonPath);

  return (
    <>
      <Paragraph style={{ maxWidth: 440, marginTop: 24 }} copyable code>
        <div>cd {state.repoPath}</div>
        <span>{cmd}</span>
      </Paragraph>
      <ProForm
        initialValues={state}
        layout='horizontal'
        formRef={formRef}
        onValuesChange={onValuesChange}
        submitter={{
          render: (props, doms) => {
            return [
              ...doms,
              <Button
                key='refresh'
                type='primary'
                onClick={() => getRepoInfo(state.repoPath!)}
                disabled={!fetchRepoAccess}>
                Refresh Repo Info
              </Button>,
            ];
          },
        }}>
        <ProForm.Item label='Repo Path' name='repoPath'>
          <FolderSelector />
        </ProForm.Item>

        <ProForm.Item label='PackageJson' name='packageJsonPath'>
          <FileSelector />
        </ProForm.Item>

        <ProFormDependency name={['repoPath', 'packageJsonPath']}>
          {({ repoPath }) => {
            return (
              <>
                <ProFormSelect label='Prev Branch' name='prevBranch' options={options} />
                <ProFormSelect label='Next Branch' name='nextBranch' options={options} />
                <ProFormText label='ExcludePattern' name='excludePattern' />
                <ProFormText label='RepoName' name='repoName' />
              </>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </>
  );
};

export default CodeDiffForm;
