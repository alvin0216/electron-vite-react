import { ProCard, ProForm, ProFormRadio } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { vantage_env_list } from "./envList";
import ReactJson from "react-json-view";
import { useConfigJson } from "@/plugins/EnvTools/useConfigJson";

const list = vantage_env_list.map((item) => item.name);

const ComputerSettingCard: React.FC = () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <ProCard
      title="ComputerSetting"
      split={responsive ? "horizontal" : "vertical"}
      bordered
      headerBordered
    >
      <ProCard colSpan="100%">
        <ProForm
          layout="horizontal"
          submitter={false}
          onValuesChange={(v) => {
            console.log(1234, v);
          }}
        >
          <ProFormRadio.Group
            name="vantageType"
            label="VantageType"
            radioType="button"
            fieldProps={{ buttonStyle: "solid" }}
            options={["beta", "non-beta"]}
          />
          <ProFormRadio.Group
            name="certPin"
            label="CertPin"
            radioType="button"
            fieldProps={{ buttonStyle: "solid" }}
            options={["on", "off"]}
          />
          <ProFormRadio.Group
            name="env"
            label="Env"
            radioType="button"
            fieldProps={{ buttonStyle: "solid" }}
            options={list}
          />
        </ProForm>
      </ProCard>
    </ProCard>
  );
};

export default ComputerSettingCard;
