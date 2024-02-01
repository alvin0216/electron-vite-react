import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Badge, Input } from "antd";
import React, { memo, useMemo } from "react";
import { useImmer } from "use-immer";

enum TabKeyEnum {
  all = "All",
  lenovo = "lenovo",
  outdated = "outdated",
  dependencies = "dependencies",
  devDependencies = "devDependencies",
}

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? "#1890FF" : "#999",
        backgroundColor: active ? "#E6F7FF" : "#eee",
      }}
    />
  );
};

interface DependenciesPanelProps {
  dataList: DependenceItem[];
  packJson: PackJson;
}

const columns: ProColumns<DependenceItem>[] = [
  {
    title: "Package Name",
    dataIndex: "name",
    renderText: (text, row) =>
      row.isOutdated ? <span className="c-red">{text}</span> : text,
    sorter: (a, b) => (a.isOutdated ? 1 : 0),
  },

  {
    title: "Current",
    dataIndex: "version",
  },
  {
    title: "Latest",
    dataIndex: "latest",
  },
];

const DependenciesPanel: React.FC<DependenciesPanelProps> = memo(
  ({ dataList, packJson }) => {
    const [state, updateState] = useImmer({
      tabKey: TabKeyEnum.all,
    });

    const tabList = useMemo(() => {
      const lenovoList: DependenceItem[] = [];
      const outdatedList: DependenceItem[] = [];
      const dependenciesList: DependenceItem[] = [];
      const devDependenciesList: DependenceItem[] = [];
      for (const item of dataList) {
        item.isLenovo && lenovoList.push(item);
        item.isOutdated && outdatedList.push(item);
        packJson.dependencies[item.name] && dependenciesList.push(item);
        packJson.devDependencies[item.name] && devDependenciesList.push(item);
      }

      return [
        { key: TabKeyEnum.all, list: dataList },
        { key: TabKeyEnum.dependencies, list: dependenciesList },
        { key: TabKeyEnum.devDependencies, list: devDependenciesList },
        { key: TabKeyEnum.outdated, list: outdatedList },
        { key: TabKeyEnum.lenovo, list: lenovoList },
      ];
    }, [dataList]);

    return (
      <ProTable<DependenceItem>
        columns={columns}
        params={{ tab: state.tabKey }}
        request={(params, sorter, filter) => {
          const tabKey = params.tab as TabKeyEnum;
          return Promise.resolve({
            data: tabList.find((t) => t.key === state.tabKey)?.list || [],
            success: true,
          });
        }}
        // dataSource={dataSource}
        toolbar={{
          menu: {
            type: "tab",
            activeKey: state.tabKey,
            items: tabList.map((item) => ({
              key: item.key,
              label: (
                <span>
                  {item.key}
                  {renderBadge(item.list.length, state.tabKey === item.key)}
                </span>
              ),
            })),
            onChange: (key) => {
              updateState((draft) => {
                draft.tabKey = key as TabKeyEnum;
              });
            },
          },
        }}
        rowKey="name"
        search={false}
        dateFormatter="string"
        pagination={{
          showSizeChanger: true,
        }}
        options={{
          setting: {
            draggable: true,
            checkable: true,
            checkedReset: false,
            extra: [<a key="confirm">确认</a>],
          },
        }}
      />
    );
  }
);

export default DependenciesPanel;
