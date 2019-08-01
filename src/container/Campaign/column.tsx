import React from 'react';
import {SMColumnProps, ColTranslatorResult} from '../../lib/columns/interface';
import {translateColumns} from '../../lib/columns/columnMap';
import {Icon} from 'antd';
import TableFilter from '../../components/TableFilter';

export const getCampaignColumns = (): ColTranslatorResult[] => {
  const columns: SMColumnProps[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      filterDropdown: (filterProps): React.ReactNode => (
        <TableFilter {...filterProps} placeholder="项目名称" />
      ),
      filterIcon: (filtered): React.ReactNode => (
        <Icon
          type="search"
          style={{color: !filtered ? undefined : '#1890ff'}}
        />
      ),
    },
    {
      title: '所属TeamId',
      dataIndex: 'teamId',
    },
    {
      title: '平台',
      dataIndex: 'platforms',
      beforeRender: 'platforms',
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      beforeRender: 'date',
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      beforeRender: 'date',
    },
  ];
  return translateColumns(columns, {sortType: 'server'});
};
