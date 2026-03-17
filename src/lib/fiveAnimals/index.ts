// 5アニマル計算ライブラリ - エクスポート

// 型定義
export * from './types';

// 定数（データテーブル）
export * from './constants';

// 計算ロジック
export {
  computeFiveAnimals,
  computeFiveAnimalsFromDate,
  calcHonshitsuNo,
  getSekkiSymbol,
  getYearSymbol,
  calcHiddenChara,
  extractAnimal
} from './compute';
