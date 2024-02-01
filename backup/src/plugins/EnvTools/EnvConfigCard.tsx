import { ProCard, ProForm, ProFormRadio } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { vantage_env_list } from "./envList";
import ReactJson from "react-json-view";
import { useConfigJson } from "@/plugins/EnvTools/useConfigJson";

const list = vantage_env_list.map((item) => item.name);

const EnvConfigCard: React.FC = () => {
  const { form, json, openFile, updateJson, vantageType } = useConfigJson();
  const [responsive, setResponsive] = useState(false);

  return (
    <ProCard
      title="Vantage config.json"
      extra={
        <a href="#" onClick={openFile}>
          Open in the folder
        </a>
      }
      split={responsive ? "horizontal" : "vertical"}
      bordered
      headerBordered
    >
      <ProCard split="horizontal" colSpan="50%">
        <ProCard>
          <ProForm
            form={form}
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
        <ProCard>234</ProCard>
      </ProCard>
      <ProCard>
        <ReactJson
          name={`config.json(${vantageType})`}
          src={json}
          enableClipboard={false}
          displayDataTypes={false}
          onEdit={(data) => updateJson(data.updated_src)}
          onAdd={(data) => updateJson(data.updated_src)}
          onDelete={(data) => updateJson(data.updated_src)}
        />
      </ProCard>
    </ProCard>
  );
};

export default EnvConfigCard;
