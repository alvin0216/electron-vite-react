import { Form } from "antd";
import { useJson } from "../../hooks/useJson";
import { useStorageState } from "../../hooks/useStorageState";
import { useEffect } from "react";
import { vantage_env_list } from "@/plugins/EnvTools/envList";

export function useConfigJson() {
  const [vantageType, setVantageType] = useStorageState<VantageType>(
    "vantageType",
    "non-beta"
  );
  const [form] = Form.useForm();
  const { json, loading, openFile, updateJson } = useJson(
    vantageType === "beta" ? "betaConfigJson" : "nonBetaConfigJson"
  );

  useEffect(() => {
    form.setFieldsValue({
      vantageType,
      certPin: json.CertPin,
      env: vantage_env_list.find((v) => v.path === json.EntryUrl)?.name,
    });
  }, [vantageType, json]);

  return { form, openFile, updateJson, json, vantageType };
}
