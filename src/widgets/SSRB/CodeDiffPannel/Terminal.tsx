import React, { useState } from 'react';
import { Divider, Form, Input, Typography } from 'antd';
import { useCodediffCtx } from '@/hooks/useCodediffCtx';
import { ProDescriptions } from '@ant-design/pro-components';
import Copy from '@/components/Copy';

const { Paragraph } = Typography;

interface TerminalProps {}

const Terminal: React.FC<TerminalProps> = (props) => {
  const { template, cmd, cdFields } = useCodediffCtx();
  const cd = `cd ${cdFields.repoPath || '[repoPath]'}`;

  const fullCmd = `${cd} && ${cmd}`;
  return (
    <div className='pr-24'>
      <div className='mb-4'>Template</div>
      <div className=' w-full mr-24 pre'>
        <div className='mb-6'>{cd}</div>
        <div className='flex'>
          <div className='pr-6'>{template}</div>
          <Paragraph className='block !mb-0' />
        </div>
      </div>

      <div className='mt-24 mb-4'>Terminal Command</div>
      <div className='w-full mr-24 pre'>
        <div className='mb-6'>cd {cdFields.repoPath || '[repoPath]'}</div>
        <div className='flex items-center'>
          <div className='pr-6'>{cmd}</div>
          <Copy text={fullCmd} />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
