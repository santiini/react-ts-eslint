import {
  IRankingPlatforms,
  ITruthPlatform,
  IServingPlatforms,
  ICampaignPlatoform,
  IAppPlatforms,
} from 'KolPlatforms';
import weiboLogo from '../assets/images/weibo.svg';
import wechatLogo from '../assets/images/wechat.svg';
import xiaohongshuLogo from '../assets/images/xhong.jpg';
import zhihuLogo from '../assets/images/zhihu.svg';
import toutiao from '../assets/images/toutiao.svg';
import bilibiliLogo from '../assets/images/bili.svg';
import douyinLogo from '../assets/images/douyin.svg';
import babytree from '../assets/images/babytree.svg';

export const platformLogoMap: {[key in IAppPlatforms]?: string} = {
  weibo: weiboLogo,
  wechat: wechatLogo,
  xiaohongshu: xiaohongshuLogo,
  zhihu: zhihuLogo,
  toutiao,
  bilibili: bilibiliLogo,
  douyin: douyinLogo,
  babytree,
};

export const customTagPlatforms = ['weibo'];

export const kolDetailPlatform = [
  'weibo',
  'wechat',
  'xiaohongshu',
  'douyin',
  'bilibili',
  'toutiao',
  'babytree',
  'zhihu',
];

const servingPlatforms: IServingPlatforms[] = [
  'weibo',
  'wechat',
  'xiaohongshu',
  // 'zhihu',
  // 'babytree',
  'douyin',
  'toutiao',
  'bilibili',
];

const platforms: {label: string; value: IRankingPlatforms}[] = [
  {label: '微博', value: 'weibo'},
  {label: '微信', value: 'wechat'},
  {label: '小红书', value: 'xiaohongshu'},
  {label: '抖音', value: 'douyin'},
  {label: '头条', value: 'toutiao'},
  {label: '哔哩哔哩', value: 'bilibili'},
  {label: '宝宝树', value: 'babytree'},
  {label: '知乎', value: 'zhihu'},
  {label: '直播', value: 'live'},
];

export const truthPlatforms: {label: string; value: ITruthPlatform}[] = [
  {label: '微博', value: 'weibo'},
  {label: '微信', value: 'wechat'},
  {label: '小红书', value: 'xiaohongshu'},
  {label: '哔哩哔哩', value: 'bilibili'},
];

const newPlatformList = ['zhihu', 'babytree', 'live', 'douyin'];

const campaignPlatformList: ICampaignPlatoform[] = [
  'weibo',
  'wechat',
  'xiaohongshu',
  'douyin',
  'bilibili',
  'toutiao',
];

export interface CampaignOptionsItem {
  label: string;
  value: ICampaignPlatoform;
}
const campaignPlatformOpt: CampaignOptionsItem[] = [
  {label: '微博', value: 'weibo'},
  {label: '微信', value: 'wechat'},
  {label: '小红书', value: 'xiaohongshu'},
  {label: '抖音', value: 'douyin'},
  {label: '哔哩哔哩', value: 'bilibili'},
  {label: '头条', value: 'toutiao'},
];
const brandPlatformOpt: CampaignOptionsItem[] = [
  {label: '微博', value: 'weibo'},
  {label: '微信', value: 'wechat'},
  {label: '小红书', value: 'xiaohongshu'},
  {label: '抖音', value: 'douyin'},
  {label: '哔哩哔哩', value: 'bilibili'},
  {label: '头条', value: 'toutiao'},
];

const campaignModuleList: ('campaignKol' | 'campaignContent')[] = [
  'campaignKol',
  'campaignContent',
];

const campaignModuleNames = ['kol', 'content'];

const platformMap: {[key in IAppPlatforms]: string} = {
  weibo: '微博',
  wechat: '微信',
  xiaohongshu: '小红书',
  zhihu: '知乎',
  live: '知乎',
  babytree: '宝宝树',
  douyin: '抖音',
  toutiao: '头条',
  bilibili: '哔哩哔哩',
};

const mentionedPlatform: string[] = [
  'weibo',
  'wechat',
  'xiaohongshu',
  'douyin',
  'bilibili',
  'toutiao',
];

export const platformUidMap: Record<IAppPlatforms, string> = {
  weibo: '微博UID',
  wechat: '微信BIZ',
  xiaohongshu: '小红书ID',
  zhihu: '账号ID',
  douyin: '抖音UID',
  bilibili: '哔哩哔哩UID',
  toutiao: '头条UID',
  live: '账号ID',
  babytree: '账号ID',
};

const appPlatforms: IAppPlatforms[] = [
  'weibo',
  'wechat',
  'xiaohongshu',
  'zhihu',
  'babytree',
  'live',
  'douyin',
  'bilibili',
  'toutiao',
];

export {
  appPlatforms,
  mentionedPlatform,
  newPlatformList,
  brandPlatformOpt,
  platforms,
  platformMap,
  campaignPlatformOpt,
  campaignPlatformList,
  campaignModuleList,
  campaignModuleNames,
  servingPlatforms,
};
