import { Checkbox, Form, Input, Select, Space, Switch, Tag } from "antd";
import { useMemo } from "react";

interface CodeDiffFormItemProps {
  branchList: BranchItem[];
  prevBranch: string;
  nextBranch: string;
}
const formLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
const CodeDiffFormItem: React.FC<CodeDiffFormItemProps> = ({
  nextBranch,
  branchList,
  prevBranch,
}) => {
  const prevList = useMemo(() => {
    const nextVersion =
      branchList.find((t) => t.branch === nextBranch)?.packJson.version || "";

    return branchList
      .filter((t) =>
        nextBranch ? compareVersions(t.packJson.version, nextVersion) < 0 : true
      )
      .map((item) => ({
        value: item.branch,
        label: (
          <div className="flex items-center">
            {item.isTag ? (
              <>
                <Tag color="cyan" className="mr-8">
                  Tag {item.branch}
                </Tag>
                ({item.packJson.version})
              </>
            ) : (
              `${item.branch} (${item.packJson.version})`
            )}
          </div>
        ),
      }));
  }, [branchList, nextBranch]);

  const nextList = useMemo(() => {
    const nextVersion =
      branchList.find((t) => t.branch === prevBranch)?.packJson.version || "";

    return branchList
      .filter((t) => compareVersions(t.packJson.version, nextVersion) > 0)
      .map((item) => ({
        value: item.branch,
        label: (
          <div className="flex items-center">
            {item.isTag ? (
              <>
                <Tag color="cyan" className="mr-8">
                  Tag {item.branch}
                </Tag>
                ({item.packJson.version})
              </>
            ) : (
              `${item.branch} (${item.packJson.version})`
            )}
          </div>
        ),
      }));
  }, [branchList, prevBranch]);

  return (
    <>
      <Form.Item
        name="prevBranch"
        label="Prev Branch"
        rules={[{ required: true }]}
      >
        <Select
          className="!w-328"
          showSearch
          placeholder="Please select a branch"
          options={prevList}
          allowClear
          filterOption={(input, option) =>
            String(option?.value ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </Form.Item>

      <Form.Item
        name="nextBranch"
        label="Next Branch"
        rules={[{ required: true }]}
      >
        <Select
          className="!w-328"
          showSearch
          allowClear
          placeholder="Please select a branch"
          options={nextList}
          filterOption={(input, option) =>
            String(option?.value ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </Form.Item>

      <Form.Item label="Code Diff">
        <Space>
          <Form.Item noStyle name="codeDiff" rules={[{ required: true }]}>
            <Input
              className="w-328"
              suffix=".diff"
              placeholder="please input code diff file name"
            />
          </Form.Item>
          <Form.Item name="ignoreLock" noStyle valuePropName="checked">
            <Checkbox>Ignore package-lock.json</Checkbox>
          </Form.Item>
        </Space>
      </Form.Item>
    </>
  );
};

function compareVersions(ver1: string, ver2: string) {
  if (!ver1 || !ver2) return 1;
  const a = ver1.split(".");
  const b = ver2.split(".");
  const len = Math.max(a.length, b.length);

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(a[i]) || 0;
    const num2 = parseInt(b[i]) || 0;

    if (num1 > num2) {
      return 1;
    } else if (num2 > num1) {
      return -1;
    }
  }

  return 0;
}

export default CodeDiffFormItem;
