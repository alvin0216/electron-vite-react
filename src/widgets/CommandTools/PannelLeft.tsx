import { ProFormField } from '@ant-design/pro-components';
import { useMemo } from 'react';

interface PannelLeftProps {
  row: CmdItem;
}

const PannelLeft: React.FC<PannelLeftProps> = ({ row }) => {
  const { template, variables } = row;
  const execStr = useMemo(() => {
    let execStr = template;
    Object.entries(variables).forEach(([key, value]) => {
      execStr = execStr.split(key).join(value);
    });
    return execStr;
  }, [template, variables]);

  return (
    <div>
      <div className='mb-1 font-600'>Command Template:</div>
      <ProFormField ignoreFormItem mode='read' valueType='jsonCode' text={template} />
      <div className='mt-2 mb-1 font-600'>Executed command line:</div>
      <ProFormField ignoreFormItem mode='read' valueType='jsonCode' text={execStr} />
    </div>
  );
};

export default PannelLeft;
