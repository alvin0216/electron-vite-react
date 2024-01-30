import Icon from '@ant-design/icons';

const TerminalIcon: React.FC = () => {
  return (
    <Icon
      // @ts-ignore
      component={() => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          enableBackground='new 0 0 24 24'
          height='24px'
          viewBox='0 0 24 24'
          width='24px'
          fill='#1890ff'>
          <g>
            <rect fill='none' height='24' width='24' />
          </g>
          <g>
            <path d='M20,4H4C2.89,4,2,4.9,2,6v12c0,1.1,0.89,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.11,4,20,4z M20,18H4V8h16V18z M18,17h-6v-2 h6V17z M7.5,17l-1.41-1.41L8.67,13l-2.59-2.59L7.5,9l4,4L7.5,17z' />
          </g>
        </svg>
      )}
    />
  );
};

export default TerminalIcon;
