import React, {FC, useState, useCallback, useEffect, useMemo} from 'react';
import {NamedRouteComponentProps} from 'RouteComponent';
import {TableParams} from 'ProjectBasic';
import ParamsTable from '../../lib/Table/ParamTable';
import {getCampaignColumns} from './column';
import {useApi} from '../../utils/hooks';
import {campaignApi} from '../../api/campaign';
import PageHeaderWrapper from '../../layout/PageHeaderWrapper';

const Campaign: FC<NamedRouteComponentProps> = (props) => {
  const [tableParams, setTableParams] = useState<TableParams>();
  const [campaignsData, fetchCampaignApi] = useApi({
    api: campaignApi.list,
    messaage: '获取项目列表',
  });

  // fetch campaigns
  const fetchTableData = useCallback(
    async (params: TableParams): Promise<void> => {
      if (!tableParams) return;
      setTableParams(params);
      await fetchCampaignApi({
        startIndex: params.startIndex,
        maxResults: params.maxResults,
        sort: params.sort,
      });
    },
    [fetchCampaignApi, tableParams]
  );

  // columns
  const columns = useMemo(() => getCampaignColumns(), []);

  useEffect(() => {
    setTableParams({
      startIndex: 0,
      maxResults: 20,
      sort: '-createdAt',
      filter: {},
    });
  }, []);

  const campaignList = (campaignsData.data && campaignsData.data.data) || [];

  return (
    <PageHeaderWrapper>
      <ParamsTable
        rowKey="id"
        list={campaignList}
        total={(campaignsData.data && campaignsData.data.total) || 0}
        columns={columns}
        params={tableParams}
        fetchData={fetchTableData}
      />
    </PageHeaderWrapper>
  );
};

export default Campaign;
