import { send } from "@/lib/bridge";
import { Button } from "antd";
import { PathEnum, EMCEnum } from "@universal/enum";
import testbench_png from "@/assets/testbench-filesmb.png";
interface SmbEmptyProps {
  read(): void;
}

const SmbEmpty: React.FC<SmbEmptyProps> = (props) => {
  return (
    <>
      <div>
        SMBInfo configuration file is not detected on your current computer.
        Please follow the steps below to generate an Smb configuration file.
      </div>
      <ol>
        <li>
          <Button
            type="link"
            className="pl-0"
            onClick={() => send(EMCEnum.OPEN_URL, PathEnum.vantageTestBenchUrl)}
          >
            download vantage test bench
          </Button>
        </li>
        <li>
          <div>Set FileSmb to “ON“</div>
          <img className="align-top" src={testbench_png} />
        </li>
        <li>
          <Button type="link" className="pl-0" onClick={props.read}>
            Click here to verify
          </Button>
        </li>
        <li>
          If verification fails, please wait a moment and verify again, as this
          operation requires network support.
        </li>
      </ol>
    </>
  );
};

export default SmbEmpty;
