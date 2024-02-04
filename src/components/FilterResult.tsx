import { Alert, Badge, Switch, Typography } from 'antd';
import { produce } from 'immer';
import ReactJson from 'react-json-view';
import TagEditor from './TagEditor';
const { Paragraph } = Typography;

interface FilterResultProps {
  disabled?: boolean;
  filters: string[];
  json: object;
  setJson: (newJson: object) => void;
}

const FilterResult: React.FC<FilterResultProps> = ({ json, setJson, filters, disabled }) => {
  const renderResult = (key: string) => {
    // @ts-ignore
    const value = json[key];

    switch (true) {
      // removed
      case value === undefined:
        return <Badge status='error' text={<span className='c-gray'>Removed</span>} />;

      // object
      case typeof value === 'object' && value !== null:
        return <ReactJson name={key} displayDataTypes={false} src={value} />;

      // toggle true & false
      case value === 'true' || value === 'false':
        return (
          <Switch
            disabled={disabled}
            checkedChildren='true'
            unCheckedChildren='false'
            checked={value === 'true'}
            onChange={(checked) =>
              setJson(
                produce(json, (draft: any) => {
                  draft[key] = checked ? 'true' : 'false';
                })
              )
            }
          />
        );

      case key === 'WebAppAlwaysOffline' && !disabled:
        return (
          <TagEditor
            tags={value.length === 0 ? [] : value.split(',')}
            setTags={(tags) => {
              setJson(
                produce(json, (draft: any) => {
                  draft.WebAppAlwaysOffline = tags.join(',');
                })
              );
            }}
          />
        );

      default:
        return (
          <Paragraph
            editable={
              !disabled && {
                onChange: (v) =>
                  setJson(
                    produce(json, (draft: any) => {
                      draft[key] = v;
                    })
                  ),
              }
            }
            className='!mb-0'>
            {String(value)}
          </Paragraph>
        );
    }
  };

  if (filters.length === 0) return null;
  return (
    <Alert
      key={filters.join(',')}
      className='mt-4'
      message='Search Result'
      type='info'
      description={filters.map((key) => (
        <div key={key} className='mb-8 flex'>
          <span className='pr-8'>{key}:</span>
          {renderResult(key)}
        </div>
      ))}
    />
  );
};

export default FilterResult;
