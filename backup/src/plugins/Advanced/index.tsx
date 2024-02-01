import VantageBin from "./VantageBin";
import json from "../../../package.json";
import mailSvg from "@/assets/mail.svg";
import testbenchPng from "@/assets/testbench.png";
import { Card, Space, Badge, Button, ButtonProps, Divider } from "antd";
import { send } from "@/lib/bridge";
import linkSvg from "@/assets/link.svg";
import devSvg from "@/assets/dev.svg";
import { EMCEnum, PathEnum } from "@universal/enum";

interface AdvancedProps {}

interface LinkButtonProps extends ButtonProps {
  to?: string;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return (
    <Button
      className="flex items-center"
      onClick={() => send(EMCEnum.OPEN_URL, props.to)}
      icon={<img src={linkSvg} className="w-20px align-bottom mr-1" />}
      {...props}
    >
      {props.children}
    </Button>
  );
};

const Advanced: React.FC<AdvancedProps> = (props) => {
  return (
    <div
      style={{
        background: "rgb(240, 242, 245)",
        minHeight: "calc(100vh - 189px)",
      }}
      className="absolute top-0 left-0 py-24 w-full"
    >
      <Space className="px-24" wrap align="baseline" size="large">
        <Badge.Ribbon
          text={`Vantage Dev Tools v${json.version}`}
          color="magenta"
        >
          <Card
            hoverable
            headStyle={{ background: "rgba(0, 0, 0, 0.02)" }}
            title="Announcement"
            className="w-600"
          >
            <div className="mt-2">
              <div className="mb-1">
                If you have better suggestions or ideas, please contact me:
              </div>
              <a
                href="mailto:guosw5@lenovo.com?subject=Vantage Dev Tools Suggestions"
                className="mt-2 inline-block"
              >
                <img src={mailSvg} className="w-20px align-bottom mr-1" /> Alvin
                guosw5@lenovo.com
              </a>
            </div>

            <Divider />

            <Space wrap>
              <LinkButton to={PathEnum.devToolsOfficialUrl}>
                Official website
              </LinkButton>

              <LinkButton to={PathEnum.devToolsDownloadUrl2}>
                DevTools download path
              </LinkButton>

              <LinkButton to={PathEnum.vantageTestBenchUrl}>
                TestBench download path
              </LinkButton>

              <LinkButton
                onClick={() =>
                  send(EMCEnum.OPEN_FILE, PathEnum.vantageShellPath)
                }
              >
                Shell download path
              </LinkButton>

              <LinkButton
                icon={<img src={devSvg} className="w-30px  mr-1" />}
                onClick={() => send(EMCEnum.OPEN_LOGS_FOLDER)}
              >
                Vantage log path
              </LinkButton>

              <LinkButton
                icon={<img src={devSvg} className="w-30px mr-1" />}
                onClick={() => send(EMCEnum.OPEN_METRICS_FOLDER)}
              >
                Vantage metrics path
              </LinkButton>
            </Space>
          </Card>
        </Badge.Ribbon>

        <Card
          hoverable
          headStyle={{ background: "rgba(0, 0, 0, 0.02)" }}
          title="Vantage Bin Tools"
          className="w-600"
        >
          <VantageBin />
        </Card>
      </Space>
    </div>
  );
};

export default Advanced;
