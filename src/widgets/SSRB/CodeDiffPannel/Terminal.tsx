import React, { useState } from 'react';
import { Divider, Form, Input, Typography } from 'antd';
import { useCodediffCtx } from '@/hooks/useCodediffCtx';
import { ProDescriptions } from '@ant-design/pro-components';

const { Paragraph } = Typography;

interface TerminalProps {}

const Terminal: React.FC<TerminalProps> = (props) => {
  const { template, cmd, cdFields } = useCodediffCtx();
  return (
    <div className='pr-24'>
      <div className='mb-4'>Template</div>
      <div className=' w-full mr-24 pre'>
        <div className='mb-6'>cd {cdFields.repoPath || '[repoPath]'}</div>
        <div className='flex'>
          <div className='pr-6'>{template}</div>
          <Paragraph className='block !mb-0' />
        </div>
      </div>

      <div className='mt-24 mb-4'>Terminal Command</div>
      <div className='w-full mr-24 pre'>
        <div className='mb-6'>cd {cdFields.repoPath || '[repoPath]'}</div>
        <div className='flex'>
          <div className='pr-6'>{cmd}</div>
          <Paragraph className='block !mb-0' copyable />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
