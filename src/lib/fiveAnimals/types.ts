// 5 Animals Domain Types
// 正しいロジック（five-animal-calculator.tsx）に基づく型定義

// 12動物の型（正しい表記：「狼」を使用）
export type AnimalName =
  | "狼" | "こじか" | "さる" | "チーター" | "黒ひょう" | "ライオン"
  | "トラ" | "たぬき" | "コアラ" | "ゾウ" | "ひつじ" | "ペガサス";

// 節気シンボル（a-l）
export type SekkiSymbol = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l';

// 本質番号の下1桁（0-9）
export type LastDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// 年シンボル（1-12）
export type YearSymbol = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// 5アニマル計算結果
export type FiveAnimalsResult = {
  baseNumber: number;       // 本質番号 (1..60)
  baseLabel60: string;      // 60分類名（例：「長距離ランナーのチーター」）
  essence: AnimalName;      // 本質キャラ（12動物）
  surface: AnimalName;      // 表面キャラ
  hope: AnimalName;         // 希望キャラ
  decision: AnimalName;     // 意思決定キャラ
  hidden: AnimalName | null; // 隠れキャラ（1920-2020年のみ対応）
};

// 詳細な計算結果（デバッグ用）
export type DetailedCalculationResult = FiveAnimalsResult & {
  lastDigit: LastDigit;
  sekkiSymbol: SekkiSymbol;
  yearSymbol: YearSymbol;
};
