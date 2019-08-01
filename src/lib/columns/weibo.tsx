/**
 * weibo columns config
 */
import get from 'lodash/get';
import {
  ColumnFieldOptionsFn,
  ColumnFieldOptions,
  ColTranslatorResult,
  SMColumnProps,
} from './interface';
import {translateField} from './index';
import translateFieldOptins from './columnMap';
import {getKolUrl} from '../../utils/formatter';

const mdLength = 130;
// const longLength = 150;

const columnMap: {[key in string]?: ColumnFieldOptionsFn} = {
  /* account */
  nickName: (options) =>
    translateField(options, '账号', {
      type: 'account',
      firstValue: (record): string | undefined =>
        get(record, 'profileImageUrl'),
      secondValue: (record): string | undefined =>
        getKolUrl('weibo', record.uid),
    }),
  uid: (options) => translateField(options, '用户ID'),
  gender: (options) => translateField(options, '性别'),
  province: (options) => translateField(options, '所在地'),
  city: (options) => translateField(options, '所在城市'),
  description: (options) => translateField(options, '个人描述', 'content'),
  friendCount: (options) => translateField(options, '关注数', 'number'),
  followerCount: (options) => translateField(options, '粉丝数', 'number'),
  statusCount: (options) => translateField(options, '微博数', 'number'),
  favouriteCount: (options) => translateField(options, '收藏数', 'number'),
  biFollowerCount: (options) => translateField(options, '互粉数', 'number'),
  idate: (options) => translateField(options, '个人描述', 'content'),
  verified: (options) => translateField(options, '是否认证'),
  verifiedType: (options) => translateField(options, '认证类型'),
  verifiedReason: (options) => translateField(options, '认证原因'),
  createdAt: (options) => translateField(options, '创建时间', 'date'),
  tag: (options) =>
    translateField(options, '标签', {
      type: 'tag',
      transformToArray: (record): string[] =>
        get<string>(record, 'tag', '')
          .split(',')
          .filter((v) => v),
    }),
  /* post */
  id: (options) =>
    translateField(options, 'ID', {
      type: 'url',
      firstValue: (record): string => record.url,
    }),
  url: (options) => translateField(options, 'URL', 'url'),
  publishedAt: (options) => translateField(options, '发布时间', 'date'),
  content: (options) =>
    translateField(options, '内容', {
      type: 'contentUrl',
      firstValue: (record): string => record.url,
    }),
  source: (options) => translateField(options, '来源'),
  commonSentiment: (options) => translateField(options, '通用情感'),
  viewCount: (options) => translateField(options, '曝光/阅读数', 'number'),
  likeCount: (options) => translateField(options, '点赞数', 'number'),
  commentCount: (options) => translateField(options, '评论数', 'number'),
  repostCount: (options) => translateField(options, '转发数', 'number'),
  interactCount: (options) => translateField(options, '互动数', 'number'),
  haslink: (options) =>
    translateField(options, '微博是否有短链', 'boolean', mdLength),
  isOriginal: (options) =>
    translateField(options, '微博是否原创', 'boolean', mdLength),
  postFrom: (options) =>
    translateField(options, '发布设备', undefined, mdLength),
  ugc: (options) => translateField(options, 'ugc/bgc'),
  pbw: (options) => translateField(options, '周均发帖量', 'number'),
  originalID: (options) => translateField(options, '原微博ID'),
  originalPublishedAt: (options) =>
    translateField(options, '原微博发布时间', 'date'),
  originalContent: (options) =>
    translateField(options, '原微博/主贴内容', 'content'),
  originalSource: (options) =>
    translateField(options, '原微博来源', undefined, mdLength),
  originalCommentCount: (options) =>
    translateField(options, '原微博评论数', 'number', mdLength),
  originalRepostCount: (options) =>
    translateField(options, '原微博转发数', 'number', mdLength),
  originalLikeCount: (options) =>
    translateField(options, '原微博点赞数', 'number', mdLength),
  originalPostFrom: (options) =>
    translateField(options, '原微博发布设备', undefined, mdLength),
  originalUID: (options) =>
    translateField(options, '原微博用户ID', undefined, mdLength),
  originalNickName: (options) =>
    translateField(options, '原微博用户昵称', undefined, mdLength),
  originalVerified: (options) =>
    translateField(options, '原微博用户是否认证', undefined, 150),
  spam: (options) => translateField(options, '信息质量'),
  images: (options) =>
    translateField(options, '微博图片地址', 'content', mdLength),
  originalImages: (options) =>
    translateField(options, '原微博图片地址', undefined, mdLength),
  topic: (options) => translateField(options, '微博话题', undefined, mdLength),
  snapDate: (options) => translateField(options, '时间', 'date'),
};

interface ColumnProviderOpt {
  // 展示列
  columns: string[];
  // 传入的额外参数
  options: Pick<
    ColumnFieldOptions,
    Exclude<keyof ColumnFieldOptions, 'dataIndex'>
  >;
  // 自定义的 columnMap
  custormMap?: Partial<Record<string, SMColumnProps>>;
}
export default function provideWeiboCols(
  options: ColumnProviderOpt
): ColTranslatorResult[] {
  const {columns = [], custormMap = {}} = options;

  const columnsRet = columns.map((v) => {
    const fieldFn = columnMap[v];
    const customColumn = custormMap[v];

    const fieldOpt = (fieldFn && fieldFn({dataIndex: v})) || {
      dataIndex: v,
      title: v,
      key: v,
    };

    return translateFieldOptins(
      {...fieldOpt, ...customColumn},
      {...options.options, dataIndex: v}
    );
  });

  return columnsRet;
}
