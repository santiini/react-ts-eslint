import React, {FC, useRef, useEffect, memo} from 'react';
import {Input, Button} from 'antd';
import {FilterDropdownProps} from 'antd/lib/table';

export interface TableFilterProps {
  placeholder?: string;
}
const TableFilter: FC<TableFilterProps & FilterDropdownProps> = (props) => {
  const {selectedKeys, setSelectedKeys, confirm, clearFilters} = props;
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (inputRef.current) {
      if (document.activeElement !== inputRef.current.input) {
        inputRef.current.focus();
      }
    }
  }, [props]);

  return (
    <div style={{padding: 8}}>
      <Input
        ref={inputRef}
        autoFocus={true}
        placeholder={props.placeholder || '搜索内容'}
        value={selectedKeys && selectedKeys[0]}
        onChange={(e): void => {
          if (!!setSelectedKeys) {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }
        }}
        onPressEnter={(): void => {
          if (!!confirm) {
            confirm();
            // this.handleSearch(selectedKeys, confirm);
          }
        }}
        style={{width: 188, marginBottom: 8, display: 'block'}}
      />
      <Button
        type="primary"
        onClick={(): void => {
          if (!!confirm) {
            confirm();
            // this.handleSearch(selectedKeys, confirm);
          }
        }}
        icon="search"
        size="small"
        style={{width: 90, marginRight: 8}}
      >
        Search
      </Button>
      <Button
        onClick={(): void => {
          if (!!clearFilters) {
            clearFilters([]);
            // this.handleReset(clearFilters);
          }
        }}
        size="small"
        style={{width: 90}}
      >
        Reset
      </Button>
    </div>
  );
};

export default memo(TableFilter);
