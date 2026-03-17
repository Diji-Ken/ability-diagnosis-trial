// 5アニマル計算ロジック
// ソース: five-animal-calculator.tsx

import type { AnimalName, SekkiSymbol, LastDigit, YearSymbol, FiveAnimalsResult } from './types';
import { charaMap, surfaceMap, hopeMap, decisionMap, hiddenYearTable, hiddenCharaMap } from './constants';
import { hiddenLookup2020to2026 } from './hiddenLookup';

/**
 * Google Sheetsのシリアル値を計算（UTCを使用してタイムゾーンの影響を排除）
 */
const googleSerial = (year: number, month: number, day: number): number => {
  const baseUTC = Date.UTC(1899, 11, 30);
  const targetUTC = Date.UTC(year, month - 1, day);
  return Math.floor((targetUTC - baseUTC) / (24 * 60 * 60 * 1000));
};

/**
 * 本質番号（1-60）を計算
 */
export const calcHonshitsuNo = (year: number, month: number, day: number): number => {
  const serial = googleSerial(year, month, day);
  return ((serial + 8) % 60 + 60) % 60 + 1;
};

/**
 * 節気シンボル（a-l）を取得
 */
export const getSekkiSymbol = (month: number, day: number): SekkiSymbol => {
  const mmdd = month * 100 + day;
  if (mmdd < 106) return 'l';
  if (mmdd < 204) return 'a';
  if (mmdd < 306) return 'b';
  if (mmdd < 405) return 'c';
  if (mmdd < 506) return 'd';
  if (mmdd < 606) return 'e';
  if (mmdd < 707) return 'f';
  if (mmdd < 808) return 'g';
  if (mmdd < 908) return 'h';
  if (mmdd < 1008) return 'i';
  if (mmdd < 1107) return 'j';
  if (mmdd < 1207) return 'k';
  return 'l';
};

/**
 * 年シンボル（1-12）を取得
 */
export const getYearSymbol = (year: number, month: number, day: number): YearSymbol => {
  let adjustedYear = year;
  if (month === 1 || (month === 2 && day < 4)) {
    adjustedYear = year - 1;
  }
  let symbol = ((adjustedYear - 1936) % 12) + 1;
  if (symbol <= 0) symbol += 12;
  return symbol as YearSymbol;
};

/**
 * 隠れキャラを計算（1920-2026年対応）
 * - 2020-2026年: 公式データのルックアップテーブルを使用
 * - 1920-2019年: 従来の計算ロジックを使用
 */
export const calcHiddenChara = (year: number, month: number, day: number): AnimalName | null => {
  // 2020-2026年は公式データから直接取得
  if (year >= 2020 && year <= 2026) {
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return hiddenLookup2020to2026[dateKey] || null;
  }

  // 1920-2019年は従来の計算ロジック
  if (year < 1920 || year > 2019) return null;
  const monthData = hiddenYearTable[year];
  if (!monthData) return null;
  const base = monthData[month - 1];
  let no = base + day;
  if (no > 60) no -= 60;
  return hiddenCharaMap[no] || null;
};

/**
 * 60分類名から12動物名を抽出
 */
export const extractAnimal = (charaName: string): AnimalName => {
  const animals: AnimalName[] = ["狼", "こじか", "さる", "チーター", "黒ひょう", "ライオン", "トラ", "たぬき", "コアラ", "ゾウ", "ひつじ", "ペガサス"];
  for (const animal of animals) {
    if (charaName.includes(animal)) return animal;
  }
  // デフォルト（見つからない場合）
  return "コアラ";
};

/**
 * ISO日付文字列をパース
 */
const parseIsoDate = (isoDate: string): { year: number; month: number; day: number } => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return { year, month, day };
};

/**
 * 5アニマルを一括計算（メイン関数）
 * @param isoDate YYYY-MM-DD形式の日付文字列
 * @returns FiveAnimalsResult
 */
export function computeFiveAnimals(isoDate: string, birthTime?: string): FiveAnimalsResult {
  let { year, month, day } = parseIsoDate(isoDate);

  // Phase 2-2: 出生時刻による日付調整
  if (birthTime) {
    const hour = parseInt(birthTime.split(':')[0], 10);
    // 23:00の場合は前日として扱う
    if (hour === 23) {
      const date = new Date(isoDate);
      date.setDate(date.getDate() - 1);
      const adjusted = parseIsoDate(date.toISOString().split('T')[0]);
      year = adjusted.year;
      month = adjusted.month;
      day = adjusted.day;
    }
  }

  // 本質番号と60分類名
  const baseNumber = calcHonshitsuNo(year, month, day);
  const baseLabel60 = charaMap[baseNumber] || `不明(${baseNumber})`;
  const essence = extractAnimal(baseLabel60);

  // 下1桁、節気シンボル、年シンボル
  const lastDigit = (baseNumber % 10) as LastDigit;
  const sekkiSymbol = getSekkiSymbol(month, day);
  const yearSymbol = getYearSymbol(year, month, day);

  // 各キャラを取得
  const surface = surfaceMap[lastDigit][sekkiSymbol];
  const hope = hopeMap[lastDigit][sekkiSymbol];
  const decision = decisionMap[lastDigit][yearSymbol];
  const hidden = calcHiddenChara(year, month, day);

  return {
    baseNumber,
    baseLabel60,
    essence,
    surface,
    hope,
    decision,
    hidden
  };
}

/**
 * 年月日を直接指定して5アニマルを計算
 */
export function computeFiveAnimalsFromDate(year: number, month: number, day: number): FiveAnimalsResult {
  const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return computeFiveAnimals(isoDate);
}
