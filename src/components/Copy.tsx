import { Button, Space, Typography } from 'antd';

const { Paragraph } = Typography;

interface CopyProps {
  text?: string;
  tooltips?: string;
}

const Copy: React.FC<CopyProps> = ({ text, tooltips }) => {
  return <Paragraph className='block !mb-0' copyable={{ text, tooltips }} />;
};

export default Copy;
