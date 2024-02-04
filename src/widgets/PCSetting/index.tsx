import { ProForm, ProFormRadio } from '@ant-design/pro-components';
import CountrySetting from './CountrySetting';
import { PCTypeEnum } from '@constants/enum';

import { Spin } from 'antd';
import { PCSettingContext, useInitialPCSetting } from '@/contexts/PCSettingContext';

const PCSetting: React.FC = () => {
  const ctx = useInitialPCSetting();

  return (
    <PCSettingContext.Provider value={ctx as any}>
      <Spin spinning={ctx.loading}>
        <ProForm layout='horizontal' wrapperCol={{ span: 24 }} submitter={false}>
          <ProFormRadio.Group
            radioType='button'
            fieldProps={{ buttonStyle: 'solid', value: ctx.pcType, onChange: (e) => ctx.setGaming(e.target.value) }}
            name='pcType'
            label='PC Type'
            options={[
              { label: 'Non Gaming', value: PCTypeEnum.NotGaming },
              { label: 'Gaming', value: PCTypeEnum.Gaming },
            ]}
          />
          <ProForm.Item label='Country'>
            <CountrySetting />
          </ProForm.Item>
        </ProForm>
      </Spin>
    </PCSettingContext.Provider>
  );
};

export default PCSetting;
