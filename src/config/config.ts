/**
 * 项目的设置
 */
interface OpenOptions {
  domain: string;
  oAuth: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    url: string;
  };
}
interface ConfigOptions {
  apiRoot: string;
  kolRoot: string;
  dateFormat: string;
  timeFormat: string;
  pageSize: number;
  tableClassName: string;
  version: string;
  open: Record<string, OpenOptions>;
  echartColos: string[];
}
const configsOptions: ConfigOptions = {
  apiRoot: '/api_v3',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'YYYY-MM-DD HH:mm:ss',
  // esConf,
  kolRoot: '/api_kol_v3',
  pageSize: 10,
  tableClassName: 'text-left',
  version: '1.0.0',
  open: {},
  echartColos: [
    '#2ec7c9',
    '#b6a2de',
    '#5ab1ef',
    '#ffb980',
    '#d87a80',
    '#8d98b3',
    '#e5cf0d',
    '#97b552',
    '#95706d',
    '#dc69aa',
    '#07a2a4',
    '#9a7fd1',
    '#588dd5',
    '#f5994e',
    '#c05050',
    '#59678c',
    '#c9ab00',
    '#7eb00a',
    '#6f5553',
    '#c14089',
  ],
};

export default configsOptions;
