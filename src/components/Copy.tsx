import { Button, Space, Typography } from 'antd';

const { Paragraph } = Typography;

interface CopyProps {
  text?: string;
}

const Copy: React.FC<CopyProps> = ({ text }) => {
  return <Paragraph className='block !mb-0' copyable={{ text }} />;
};

export default Copy;
