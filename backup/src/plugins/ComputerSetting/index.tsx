import { EMCEnum, VantageAppTypeEnum } from "@universal/enum";
import {
  Radio,
  RadioChangeEvent,
  Space,
  Tag,
  Spin,
  Dropdown,
  Input,
  message,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";

import { countries } from "./countries";
import { invokeElectron, send } from "@/lib/bridge";

const { CheckableTag } = Tag;

const ComputerSetting: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [country, setContry] = useState("US");
  const [computerType, setCT] = useState<ComputerType>("no-gaming");

  useEffect(() => {
    setLoading(true);
    invokeElectron(EMCEnum.READ_REG)
      .then((res) => {
        setCT(res.computerType);
        setContry(res.country);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onComputerTypeChange = (e: RadioChangeEvent) => {
    setLoading(true);
    invokeElectron(EMCEnum.UPDATE_REG, {
      key: "computerType",
      computerType: e.target.value,
    })
      .then(() => {
        message.success(`Set ${e.target.value} success`);
        setCT(e.target.value);
        setLoading(false);
      })
      .catch(() => {
        message.error(`Set ${e.target.value} failed`);
        setLoading(false);
      });
  };

  const onCountryChange = (checked: boolean, code: string, label: string) => {
    if (checked) {
      invokeElectron(EMCEnum.UPDATE_REG, {
        key: "country",
        countryCode: code,
      })
        .then(() => {
          message.success(`Country has been set to ${label}`);
          setContry(code);
          setLoading(false);
        })
        .catch(() => {
          message.error(`Set country failed`);
          setLoading(false);
        });
    }
  };

  const countryList = useMemo(() => {
    if (keyword) {
      return countries.filter(
        (item) =>
          item.code.includes(keyword.toUpperCase()) ||
          item.country.toUpperCase().includes(keyword.toUpperCase()) ||
          item.zh.toUpperCase().includes(keyword.toUpperCase())
      );
    }
    return countries;
  }, [keyword]);

  return (
    <Spin spinning={loading} tip="setting...">
      <div className="mb-8">
        <span className="mr-8">Computer Type:</span>
        <Radio.Group value={computerType} onChange={onComputerTypeChange}>
          <Radio value="no-gaming">Non-Gaming</Radio>
          <Radio value="gaming">Gaming</Radio>
        </Radio.Group>
      </div>

      <div className="flex items-center mb-8 max-w-400">
        <span className="mr-4">Country:</span>
        <Input
          width={400}
          placeholder="input search text"
          allowClear
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </div>

      <Space className="ml-52" size={[0, 8]} wrap>
        {countryList.map((item) => (
          <CheckableTag
            key={item.country}
            checked={country === item.code}
            onChange={(checked) =>
              onCountryChange(
                checked,
                item.code,
                `${item.country} (${item.zh})`
              )
            }
          >
            {item.country}
          </CheckableTag>
        ))}
      </Space>
    </Spin>
  );
};

export default ComputerSetting;
