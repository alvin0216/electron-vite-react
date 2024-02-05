import React, { useState } from 'react';
import { Form, Input, Typography } from 'antd';

const { Paragraph } = Typography;

interface TerminalProps {}

const Terminal: React.FC<TerminalProps> = (props) => {
  return (
    <>
      <Paragraph style={{ maxWidth: 440, marginTop: 24 }} copyable code>
        template
      </Paragraph>
    </>
  );
};

export default Terminal;
