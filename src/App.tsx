import logo from './assets/logo.png';
interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  return (
    <>
      <div className='flex pl-24 pt-24 items-center text-16'>
        <img src={logo} className='w-60px text-center align-middle' />
        <div className='pl-16 font-500 subpixel-antialiased'>
          Lenovo Vantage
          <div className='c-gray'>
            <sub>Make life lucky and happy</sub>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
