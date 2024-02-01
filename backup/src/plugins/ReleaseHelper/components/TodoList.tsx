import Link from "@/components/Link";
import { PathEnum } from "@universal/enum";

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <div className="col-span-full md:col-span-1">
      <div className="mb-2">
        <Link to={PathEnum.releaseHelperUrl}>
          Refer Link: Build, Deploy, SSRB and Release
        </Link>
      </div>

      <ul className="m-0 pl-20">
        <li>PA verify features in QA env with daily build</li>
        <li>PA do integration test in SIT env with FF & RC build</li>
        <li>
          Submit SSRB for publish approval
          <ul>
            <li>Check internal dependencies</li>
            <li>Check previous security finding</li>
            <li>Prepare coverity report</li>
            <li>Prepare code diff</li>
            <li>Prepare npm audit report</li>
            <li>Prepare PDD document</li>
            <li>Prepare Questionaire document</li>
            <li>Prepare SSRB request document</li>
            <li>Create SSRB ticket</li>
          </ul>
        </li>
        {/* <li>
      Create release ticket
      <ul>
        <li>
          Hypothesis SHA256
          <ul className="m-0 pl-20px">
            <li>
              <CarButton
                active={cache.stepKey === "sha256"}
                onClick={() => setCache({ stepKey: "sha256" })}
              >
                click to generate
              </CarButton>
            </li>
          </ul>
        </li>
      </ul>
    </li> */}
      </ul>
    </div>
  );
};

export default TodoList;
