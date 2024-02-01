import linkSvg from "@/assets/link.svg";
import { send } from "@/lib/bridge";
import { EMCEnum } from "@universal/enum";

interface LinkProps {
  to: string;
  children: any;
}

const Link: React.FC<LinkProps> = (props) => {
  return (
    <a onClick={() => send(EMCEnum.OPEN_URL, props.to)}>
      <img src={linkSvg} className="w-20px align-bottom mr-1" />
      {props.children}
    </a>
  );
};

export default Link;
