import {kol} from '../utils/axios';
import {AxiosListRequest} from 'StoreComponent';
import {QueryTableParams} from 'ProjectBasic';
import {formatResponse} from '../utils/formatter';

// 项目列表
export const getCampaignList: AxiosListRequest<QueryTableParams> = (params) =>
  kol
    .request({
      url: `/campaigns`,
      method: 'GET',
      params: params,
    })
    .then(formatResponse);

export const campaignApi = {
  list: getCampaignList,
};
