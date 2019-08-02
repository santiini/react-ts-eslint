/* eslint-disable @typescript-eslint/no-unused-vars */
export const name = 'enum';

// 默认情况下，第一个枚举值是 0，然后每个后续值依次递增 1：
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}

// 自动根据首个元素，依次加一
enum Color1 {
  DarkRed = 3,
  DarkGreen,
  DarkBlue,
}

export enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card',
}

/* 获取 enum 的 key 值 */
enum MyEnum {
  ValA = 0,
  ValB = 1,
}

type IEnumTpProp<R> = {[key in keyof typeof MyEnum]: R};

var X: IEnumTpProp<string> = {
  ValA: 'text1',
  ValB: 'text2',
  0: 'error', // expected: error;  current: error; //OK
};

X[MyEnum.ValA] = 'no error??'; // current: no error; expected: error // ok

/* 常量 enum */
const enum testEnum {
  val1 = 'aaa',
  val2 = 'bbb',
}

// A const enum member can only be accessed using a string literal
// const testKey = 'val1' as ('val1' | 'val2')
// const testValue = testEnum[testKey]
const testValue2 = testEnum.val1;
