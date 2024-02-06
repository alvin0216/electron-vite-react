import logo from './assets/logo.png';
import { StoreContext, useInitialStore } from '@/contexts/StoreContext';
import Widgets from './widgets';
import Notice from './components/Notice';
import { CloudContext, useInitialCloudConfig } from './contexts/CloudContext';

const App: React.FC = () => {
  const ctx = useInitialStore();
  const cloudCtx = useInitialCloudConfig();
  return (
    <CloudContext.Provider value={cloudCtx}>
      <StoreContext.Provider value={ctx!}>
        <div className='flex px-24 pt-24 items-center text-16'>
          <img src={logo} className='w-60px text-center align-middle' alt='' />
          <div className='pl-16 font-500 subpixel-antialiased'>
            Lenovo Vantage
            <div className='c-gray'>
              <sub>Make life lucky and happy</sub>
            </div>
          </div>
        </div>
        <Notice />
        <Widgets />
      </StoreContext.Provider>
    </CloudContext.Provider>
  );
};

export default App;
