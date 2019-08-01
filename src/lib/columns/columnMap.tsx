/**
 * columns 的 type 和 translator
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import get from 'lodash/get';
import {CompareFn} from 'antd/lib/table';
import numeral from 'numeral';
import moment from 'moment';
import {
  ColTranslatorOpt,
  getRenderOpt,
  ColumnSortValue,
  ColTranslatorResult,
  SMColumnProps,
  ColumnFieldOptions,
} from './interface';
import {getNumerField, sliceText} from '../../utils/formatter';
import {Tag, Popover, Tooltip} from 'antd';
import Account from '../../components/Account';
import {IAppPlatforms} from 'KolPlatforms';
import {appPlatforms} from '../../config/platform';
/* assets */
import weiboLogo from '../../assets/images/weibo.svg';
import wechatLogo from '../../assets/images/wechat.svg';
import xiaohongshuLogo from '../../assets/images/xhong.jpg';
import zhihuLogo from '../../assets/images/zhihu.svg';
import toutiao from '../../assets/images/toutiao.svg';
import bilibiliLogo from '../../assets/images/bili.svg';
import douyinLogo from '../../assets/images/douyin.svg';
import babytree from '../../assets/images/babytree.svg';
import {isAppPlatform} from '../../utils/validate';

export const platformImgs: Record<IAppPlatforms, string> = {
  weibo: weiboLogo,
  wechat: wechatLogo,
  xiaohongshu: xiaohongshuLogo,
  zhihu: zhihuLogo,
  babytree: babytree,
  live: '',
  douyin: douyinLogo,
  toutiao: toutiao,
  bilibili: bilibiliLogo,
};

/* 全体的配置项 */
const configs = {
  textLen: 15,
  maxText: 30,
  maxUrl: 20,
  timeFormat: 'YYYY-MM-DD HH:mm:ss',
};

/* width -- 比较和取值 */
function getMaxWidth(
  defaultWidth: number,
  width?: number | string
): number | string {
  if (width == null || width === undefined) return defaultWidth;
  const widthNum = Number(width);
  if (!Number.isNaN(widthNum) && widthNum < defaultWidth) return defaultWidth;
  return width;
}

/* 获取 number 类型的排序值，非 number 为 -1 */
function getNumberSortValue(num: unknown): number {
  // return typeof num === 'number' ? num : -1
  return Number.isNaN(Number(num)) ? -1 : Number(num);
}
/* 获取 Date 类型对应的排序值，非 Date 为 -1 */
function getDateSortValue(date?: number | string): number {
  const dateValue =
    typeof date === 'number' || typeof date === 'string'
      ? new Date(date).getTime()
      : NaN;
  return Number.isNaN(dateValue) ? -1 : dateValue;
}

/* 排序函数 -- dataIndex 可能是 kol.id 形式 */
function getSorter<T extends object>(
  dataIdnex: string,
  sortValue?: ColumnSortValue<T>
): CompareFn<T> {
  const sorterFn =
    sortValue || ((record: T): unknown => get(record, dataIdnex));
  return (a: T, b: T): number => {
    const sortA = getNumberSortValue(sorterFn(a));
    const sortB = getNumberSortValue(sorterFn(b));
    return sortA - sortB;
  };
}

interface ColumnTranslator<T extends object = any> {
  (options: ColTranslatorOpt<T>): ColTranslatorResult<T>;
}

const translate: ColumnTranslator = (options) => {
  const dataIndex = options.column.dataIndex;
  return {
    dataIndex,
    key: dataIndex,
    title: get(options, 'column.title', dataIndex),
    width: 100,
    // render: (text, record): string =>
    //   !text && text !== 0 ? options.nullText : text,
    render: (text, record): React.ReactNode => {
      if (!text && text !== 0) {
        return options.nullText;
      }
      const isMax = String(text).length > configs.textLen;
      if (!isMax) {
        return <div>{text}</div>;
      }
      return (
        <Popover
          content={text}
          // content={
          //   <div
          //     dangerouslySetInnerHTML={{ __html: translateTextToHtml(text) }}
          //   />
          // }
          overlayStyle={{
            width: 400,
            overflow: 'auto',
            height: 'auto',
            wordBreak: 'break-word',
          }}
        >
          <div>{sliceText(text, configs.textLen)}</div>
          {/* <div dangerouslySetInnerHTML={{ __html: translateTextToHtml(text) }} /> */}
        </Popover>
      );
    },
  };
};

export function translateFn<T>(
  options: ColTranslatorOpt<T>
): ColTranslatorResult<T> {
  const dataIndex = options.column.dataIndex;
  return {
    dataIndex,
    key: dataIndex,
    title: get(options, 'column.title', dataIndex),
    width: 100,
    // render: (text, record): string =>
    //   !text && text !== 0 ? options.nullText : text,
    render: (text, record): React.ReactNode => {
      if (!text && text !== 0) {
        return options.nullText;
      }
      const isMax = String(text).length > configs.textLen;
      if (!isMax) {
        return <div>{text}</div>;
      }
      return (
        <Popover
          content={text}
          // content={
          //   <div
          //     dangerouslySetInnerHTML={{ __html: translateTextToHtml(text) }}
          //   />
          // }
          overlayStyle={{
            width: 400,
            overflow: 'auto',
            height: 'auto',
            wordBreak: 'break-word',
          }}
        >
          <div>{sliceText(text, configs.textLen)}</div>
          {/* <div dangerouslySetInnerHTML={{ __html: translateTextToHtml(text) }} /> */}
        </Popover>
      );
    },
  };
}

/* url */
const translateUrl: ColumnTranslator = (options) => {
  const column = translate(options);
  const renderObj = getRenderOpt(options);

  column.width = getMaxWidth(150, options.column.width);
  column.render = (text, record): React.ReactNode => {
    // firstValue --> url, url 的获取
    const textUrl =
      renderObj && renderObj.firstValue
        ? renderObj.firstValue(record, text)
        : text;
    // second --> text，显示文字的获取
    const showText =
      renderObj && renderObj.secondValue
        ? renderObj.secondValue(record, text)
        : text;

    if (!showText) return;
    if (!textUrl) return sliceText(showText, configs.maxUrl);

    return (
      <a
        href={textUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={textUrl}
      >
        {sliceText(showText, configs.maxUrl)}
      </a>
    );
  };

  return column;
};

// 文本内容，带有 url，多余内容会以 Popover 形式展示
const translateContentUrl: ColumnTranslator = (options) => {
  const column = translate(options);

  column.width = getMaxWidth(200, options.column.width);

  const renderObj = getRenderOpt(options);

  column.render = (text, record): React.ReactNode => {
    if (!text) {
      return options.nullText;
    }
    const isMax = text.length > configs.maxText;
    const path =
      renderObj && renderObj.firstValue ? renderObj.firstValue(record) : text;
    if (!path) return text;
    if (!isMax) {
      return (
        <a href={path} target="_blank" rel="noopener noreferrer" title={path}>
          {text}
        </a>
      );
    }
    return (
      <Popover
        content={text}
        overlayStyle={{width: 400, height: 'auto', wordBreak: 'break-word'}}
      >
        <a href={path} target="_blank" rel="noopener noreferrer" title={path}>
          {sliceText(text, configs.maxUrl)}
        </a>
      </Popover>
    );
  };
  return column;
};

/* contentUrl */

/* content 长文本 */
const translateContent: ColumnTranslator = (options) => {
  const column = translate(options);
  column.width = getMaxWidth(240, options.column.width);
  column.render = (text): React.ReactNode => {
    if (!text) {
      return '';
    }
    const isMax = text.length > configs.maxText;
    if (!isMax) {
      return text;
    }
    return (
      <Popover
        content={text}
        overlayStyle={{width: 400, height: 'auto', wordBreak: 'break-word'}}
      >
        <div>{sliceText(text, configs.maxText)}</div>
      </Popover>
    );
  };
  return column;
};

/* boolean */
const translateBoolean: ColumnTranslator = (options) => {
  const column = translate(options);

  column.align = 'center';
  column.width = getMaxWidth(240, options.column.width);
  column.render = (text): React.ReactNode => {
    if (!text) return;
    if (text === true || text === '是') return '是';
    if (text === false || text === '否') return '否';
    return text;
  };
  return column;
};

/* number 类型 */
const translateNumber: ColumnTranslator = (options) => {
  const column = translate(options);
  const renderObj = getRenderOpt(options);

  const format = get(renderObj, 'format', '0,0');
  const nullText =
    renderObj && renderObj.nullText ? renderObj.nullText : options.nullText;

  column.width = getMaxWidth(120, options.column.width);
  column.align = 'right';
  column.sorter = true;
  column.render = (text, record, index): React.ReactNode => {
    if (renderObj && renderObj.render) {
      return renderObj.render(text, record, index);
    }
    const fieldValue =
      renderObj && renderObj.sortValue ? renderObj.sortValue(record) : text;

    const numberValue = getNumerField(fieldValue);

    return typeof numberValue === 'number'
      ? numeral(numberValue).format(format)
      : nullText;
  };

  /* 本地排序 */
  if (options.sortType === 'client') {
    column.sorter = getSorter(
      options.dataIndex,
      renderObj && renderObj.sortValue
    );
  }

  return column;
};

/* 日期类型 */
const translateDate: ColumnTranslator = (options) => {
  const column = translate(options);
  const {dataIndex} = options;
  const renderObj = getRenderOpt(options);
  const format = (renderObj && renderObj.format) || 'YYYY-MM-DD HH:mm:ss';
  const nullText =
    renderObj && renderObj.nullText ? renderObj.nullText : options.nullText;

  column.width = getMaxWidth(180, options.column.width);
  column.sorter = true;
  column.render = (text, record): React.ReactNode => {
    if (!text || text === 'N/A') return;
    return (text && moment(text).format(format)) || nullText;
  };

  if (options.sortType === 'client') {
    const dateSortValue = (record: any): number =>
      getDateSortValue(get(record, dataIndex));
    column.sorter = getSorter(dataIndex, dateSortValue);
  }
  return column;
};

/* tag */
const translateTag: ColumnTranslator = (options) => {
  const column = translate(options);
  const renderObj = getRenderOpt(options);

  column.width = getMaxWidth(240, options.column.width);
  column.render = (val, record): React.ReactNode => {
    const value =
      renderObj && renderObj.transformToArray
        ? renderObj.transformToArray(record)
        : val;

    if (!(value instanceof Array)) return null;
    const content = value.map((v) => <Tag key={v}>{v}</Tag>);
    if (value.length < 4) {
      return <div>{content}</div>;
    }

    return <Popover content={content}>{content.slice(0, 3)}</Popover>;
  };
  return column;
};

/* kol acccount 包括头像和名称，地址 */
const translateAccount: ColumnTranslator = (options) => {
  const column = translate(options);
  const renderObj = getRenderOpt(options);

  column.width = getMaxWidth(180, options.column.width);
  if (!renderObj) return column;
  const {firstValue, secondValue} = renderObj;
  column.render = (text, record): React.ReactNode => {
    const avatar = firstValue && firstValue(record);
    const url = secondValue && secondValue(record);
    return (
      <Account
        name={text}
        avatar={typeof avatar === 'string' ? avatar : void 0}
        url={typeof url === 'string' ? url : void 0}
      />
    );
  };

  return column;
};

// platform, platforms 以 Tag 形式的展示
const translatePlatform: ColumnTranslator = (options) => {
  const column = translate(options);

  column.render = (platform: IAppPlatforms): React.ReactNode => {
    if (!isAppPlatform(platform)) return;
    return <img src={platformImgs[platform]} alt={platform} height="20" />;
  };
  return column;
};

const translatePlatforms: ColumnTranslator = (options) => {
  const column = translate(options);

  column.width = 120;
  column.render = (text: IAppPlatforms | IAppPlatforms[]): React.ReactNode => {
    if (!text) return;
    const platforms = appPlatforms.filter((v) => text.includes(v));
    const content = platforms.map((v) => (
      <img
        key={v}
        src={platformImgs[v]}
        style={{marginRight: 4}}
        height="20"
        alt={v}
      />
    ));
    if (platforms.length < 4) return <div>{content}</div>;

    return (
      <div>
        <Tooltip title={content} overlayClassName="light-tooltip">
          {platforms.slice(0, 3).map((item) => (
            <img
              key={item}
              alt={item}
              src={platformImgs[item]}
              style={{marginRight: 4}}
              height="20"
            />
          ))}
          <span>{`等${platforms.length}个平台`}</span>
        </Tooltip>
      </div>
    );
  };

  return column;
};

const columns = {
  /* string */
  text: translateFn,
  url: translateUrl,
  content: translateContent,
  contentUrl: translateContentUrl,
  /* boolean */
  boolean: translateBoolean,
  /* number */
  number: translateNumber,
  /* 日期 */
  date: translateDate,
  /* tag */
  tag: translateTag,
  /* 头像 */
  account: translateAccount,
  /* platforms */
  platform: translatePlatform,
  platforms: translatePlatforms,
};

export type ColumnTypes = keyof typeof columns;

/* translate fieldOptions -- 单项 translate */
export default function translateFieldOptins(
  column: SMColumnProps,
  options: ColumnFieldOptions
): ColTranslatorResult {
  const {beforeRender, ...result} = column;

  result.title = result.title || result.dataIndex;

  // 获取 renderType -- 默认为 text
  const renderType =
    beforeRender && typeof beforeRender !== 'string'
      ? beforeRender.type
      : beforeRender;

  const columnFunc = (renderType && columns[renderType]) || columns.text;

  const renderColumn = columnFunc({column, ...options});

  // column 的优先级: custormColumns --> platform field --> renderColumn
  return {
    ...renderColumn,
    ...result,
  };
}

/* column list 的 translate */
export function translateColumns(
  columns: SMColumnProps[],
  options: Omit<ColumnFieldOptions, 'dataIndex'>
): ColTranslatorResult[] {
  return columns.map((v) =>
    translateFieldOptins(v, {...options, dataIndex: v.dataIndex || ''})
  );
}
