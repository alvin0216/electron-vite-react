import { FileSelector, FolderSelector } from '@/components/FileFolderSelector';
import { useRepo } from '@/hooks/useRepo';
import { ProForm, ProFormDependency, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Spin } from 'antd';
import { useRef, useState } from 'react';

interface CodeDiffFormProps {}
const template = 'cd [repo]\ngit diff [tagA] [tagB] -- [excludePattern] > [repoName]-[v1]-[v2].diff';

const CodeDiffForm: React.FC<CodeDiffFormProps> = () => {
  const [path, setPath] = useState<string>();
  const { getRepoInfo, repoInfo, loading } = useRepo();
  const formRef = useRef<ProFormInstance>();
  const options = repoInfo?.branches.map?.((b) => ({ value: b.name, label: `${b.name} (${b.version})` }));

  return (
    <Spin spinning={loading}>
      <pre>
        <code>{template}</code>
      </pre>
      {path}
      <ProForm
        layout='horizontal'
        formRef={formRef}
        onValuesChange={(v) => {
          console.log('change', v);
        }}
        submitter={{
          render: (props, doms) => {
            return [
              ...doms,
              <Button key={path ? 'x' : 'b'} type='primary' onClick={() => getRepoInfo(path!)} disabled={!path}>
                Refresh Repo Info
              </Button>,
            ];
          },
        }}>
        <ProForm.Item label='Repo' name='repo'>
          <FolderSelector />
        </ProForm.Item>

        <ProForm.Item label='PackageJson' name='packageJsonPath'>
          <FileSelector />
        </ProForm.Item>

        <ProFormDependency name={['repo']}>
          {({ repo }) => {
            return (
              <>
                <ProFormSelect label='Prev' name='tagB' options={options} />
                <ProFormSelect label='Next' name='tagA' options={options} />
                <ProFormText label='ExcludePattern' name='excludePattern' />
                <ProFormText label='RepoName' name='repoName' />
              </>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </Spin>
  );
};

export default CodeDiffForm;
