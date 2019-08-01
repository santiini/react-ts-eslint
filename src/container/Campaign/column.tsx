import {SMColumnProps, ColTranslatorResult} from '../../lib/columns/interface';
import {translateColumns} from '../../lib/columns/columnMap';

export const columns: SMColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '项目名称',
    dataIndex: 'name',
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

export const getCampaignColumns = (): ColTranslatorResult[] =>
  translateColumns(columns, {sortType: 'server'});
