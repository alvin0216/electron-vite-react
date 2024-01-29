import { ProForm, ProFormRadio, ProFormSwitch } from '@ant-design/pro-components';
import { useState } from 'react';
import ReactJson from 'react-json-view';

const Configurator: React.FC = () => {
  const [json, setJson] = useState({});

  return (
    <div className='grid grid-cols-2 gap-4'>
      <ProForm layout='horizontal' submitter={false}>
        <ProFormRadio.Group
          radioType='button'
          fieldProps={{ buttonStyle: 'solid' }}
          name='Entry'
          label='Entry'
          options={[
            { label: '4201', value: 'http://127.0.0.1:4201/' },
            { label: '4200', value: 'http://127.0.0.1:4200/' },
            { label: 'QA-1', value: 'https://vantage.csw-qa.lenovo.com/v1/web/main/default/' },
            { label: 'QA-2', value: 'https://vantage-2.csw-qa.lenovo.com/v1/web/main/default/' },
            { label: 'DEV-1', value: 'https://vantage.csw-dev.lenovo.com/v1/web/main/default/' },
            { label: 'DEV-2', value: 'https://vantage-2.csw-dev.lenovo.com/v1/web/main/default/' },
            { label: 'SIT(beta)', value: 'https://vantage-beta.csw.lenovo.com/v1/web/main/default/' },
            { label: 'STAGE', value: 'https://vantage.csw-stage.lenovo.com/v1/web/main/default/' },
            { label: 'PROD', value: 'https://vantage.csw.lenovo.com/v1/web/main/default/' },
          ]}
        />

        <ProFormRadio.Group
          name='vantageType'
          label='VantageType'
          options={[
            { label: 'non-beta', value: 'non-beta' },
            { label: 'beta', value: 'beta' },
          ]}
        />
        <ProFormSwitch name='CertPin' label='CertPin' />
      </ProForm>

      <ReactJson
        name={`config.json`}
        src={json}
        enableClipboard={false}
        displayDataTypes={false}
        onEdit={(data) => setJson(data.updated_src)}
        onAdd={(data) => setJson(data.updated_src)}
        onDelete={(data) => setJson(data.updated_src)}
      />
    </div>
  );
};

export default Configurator;
