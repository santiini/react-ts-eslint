declare module 'KolPlatforms' {
  /* 前后测、微博推荐、选择优化的平台支持 */
  export type IModulePlatforms = 'weibo' | 'wechat' | 'xiaohongshu';

  /* Social Master 请求的平台 */
  export type ISMPlatform =
    | 'zhihu'
    | 'toutiao'
    | 'bilibili'
    | 'douyin'
    | 'wechat'
    | 'xiaohongshu'
    | 'weibo';

  export type IPlatformTypes =
    | 'weibo'
    | 'wechat'
    | 'xiaohongshu'
    | 'zhihu'
    | 'live'
    | 'babytree'
    | 'douyin'
    | 'toutiao'
    | 'bilibili';

  /* truth 平台支持 */
  export type ITruthPlatform = 'weibo' | 'wechat' | 'xiaohongshu' | 'bilibili';

  /* kolDetail 详情 */
  export type IKolDetailPlatform =
    | IModulePlatforms
    | 'douyin'
    | 'zhihu'
    | 'babytree'
    | 'bilibili'
    | 'toutiao';

  /* Ranking 的平台支持 */
  export type IRankingPlatforms =
    | IModulePlatforms
    | 'zhihu'
    | 'live'
    | 'babytree'
    | 'douyin'
    | 'toutiao'
    | 'bilibili';

  export type ICampaignPlatoform =
    | 'weibo'
    | 'wechat'
    | 'xiaohongshu'
    | 'douyin'
    | 'bilibili'
    | 'toutiao';

  export type IServingPlatforms =
    | 'weibo'
    | 'wechat'
    | 'xiaohongshu'
    | 'douyin'
    | 'toutiao'
    | 'bilibili';
  // | 'zhihu'
  // | 'babytree'

  export type IMentionedPlatforms =
    | 'weibo'
    | 'wechat'
    | 'xiaohongshu'
    | 'douyin'
    | 'toutiao'
    | 'bilibili';

  export type IBrandPlatform =
    | 'weibo'
    | 'wechat'
    | 'xiaohongshu'
    | 'douyin'
    | 'bilibili'
    | 'toutiao';

  /* App 中的所有平台 */
  export type IAppPlatforms = IRankingPlatforms | 'bilibili' | 'toutiao';

  /* 前后测 */
  export type ICampaignTypes = 'kol' | 'content';
  export type ICampaignModule = 'campaignKol' | 'campaignContent';
}
