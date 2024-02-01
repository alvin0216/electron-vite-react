import { Select, Button, Modal, Form, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import SnImporter from "./SnImporter";

import { invokeElectron } from "@/lib/bridge";
import { EMCEnum } from "@universal/enum";

interface SnSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const SnSelector: React.FC<SnSelectorProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [appCache, setAppCache] = useState<AppCache>({ snList: [] });

  const dataSource: SnListItem[] = useMemo(() => {
    return (appCache.snList || []).map((item, index) => ({
      ...item,
      key: index,
    }));
  }, [appCache.snList]);

  const setDataSource = (snList: SnListItem[]) => {
    invokeElectron(EMCEnum.UPDATE_CHAHE_FILE, {
      ...appCache,
      snList: snList.map(({ key, ...item }) => item),
    });
  };

  useEffect(() => {
    invokeElectron(EMCEnum.READ_CHAHE_FILE).then(
      (json) => typeof json === "object" && setAppCache(json)
    );

    window.electronAPI.onCacheFileChange((_event, json) => {
      typeof json === "object" && setAppCache(json);
    });
  }, []);

  return (
    <>
      <Select
        className="min-w-200"
        placeholder="Select a serial number"
        value={dataSource.length === 0 ? undefined : props.value}
        options={dataSource.map((item) => ({
          key: item.key,
          label: `${item.remark} (${item.serialNumber})`,
          value: item.serialNumber,
        }))}
        onChange={props.onChange}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Button type="primary" block onClick={() => setOpen(true)}>
              Manage SerialNumber
            </Button>
          </>
        )}
      ></Select>

      <Modal
        title="Manage SerialNumber"
        width={1000}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <SnImporter list={dataSource} setList={setDataSource} />
      </Modal>
    </>
  );
};

export default SnSelector;
