import { useState, useEffect } from "react";
import { Typography, AutoComplete, Space, Alert } from "antd";
import ReactJson from "react-json-view";
const { Paragraph } = Typography;

interface SearchJsonProps {
  data: object;
  title?: string;
  children?: any;
  onChange?(key: string, v: string): void;
}

const SearchJson: React.FC<SearchJsonProps> = (props) => {
  const opts = Object.keys(props.data).map((key) => ({ value: key }));
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const [key, setKey] = useState("");
  const [random, setRandom] = useState(0);

  // @ts-ignore
  const result = props.data[key] === null ? "null" : props.data[key];

  useEffect(() => {
    setOptions(Object.keys(props.data).map((key) => ({ value: key })));
  }, [props.data]);

  const onSelect = (key: string) => {
    setKey(key);
    setRandom((pre) => pre + 1);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <>
      <Space wrap>
        <AutoComplete
          allowClear
          value={value}
          options={options}
          className="w-200"
          placeholder="input search text"
          onSelect={onSelect}
          onSearch={(text) => {
            setOptions(
              opts.filter((o) =>
                o.value.toLowerCase().includes(text.toLowerCase())
              )
            );
          }}
          onChange={onChange}
        />
        {props.children}
      </Space>
      {result && (
        <Alert
          key={random}
          className="mt-2"
          message={props.title || "Search Result"}
          type="info"
          closable
          description={
            typeof result !== "object" ? (
              <Space>
                {key}:
                <Paragraph
                  copyable
                  className="!mb-0"
                  editable={
                    props.onChange
                      ? {
                          onChange: (v) => props.onChange?.(value, v),
                        }
                      : undefined
                  }
                >
                  {result}
                </Paragraph>
              </Space>
            ) : (
              <ReactJson name={value} displayDataTypes={false} src={result} />
            )
          }
        />
      )}
    </>
  );
};

export default SearchJson;
