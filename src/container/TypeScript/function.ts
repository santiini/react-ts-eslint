export const name = 'function';

/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* function 测试 */

type IPlatform = 'weibo' | 'wechat' | 'xiaohongshu';

interface ICommonParams {
  name: string;
  date: string;
}

type IWeiboParams = ICommonParams & {
  platform: 'weibo';
  age: number;
};

type IWechatParams = ICommonParams & {
  platform: 'wechat';
  province: string;
};

type IXiaohongshuParams = ICommonParams & {
  platform: 'xiaohongshu';
  salary: number;
};

/**
 * 类型兼容：
 * 1. 不同于 { name: string, data: string, platform?: string, age?: number }，
 *    params 只能是 IWeiboParams | IWechatParams | IXiaohongshuParams 中的特定一种
 */
function getName(params: IWeiboParams | IWechatParams | IXiaohongshuParams) {
  if (params) {
    return true;
  }
  return false;
}

getName({
  platform: 'weibo',
  name: 'test1',
  date: '1111',
  age: 111,
});
