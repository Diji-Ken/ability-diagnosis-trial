import type { AnimalResult, NumerologyResult } from "@/types/diagnosis";
import type { FiveAnimalsResult } from "@/lib/fiveAnimals";
import { GROUP_DESCRIPTIONS } from "@/lib/diagnosis/animal";
import { FiveAnimalsCard } from "@/components/FiveAnimalsCard";
import {
  Sparkles,
  Star,
  Briefcase,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

const LINE_URL =
  "https://sb.depre-totem.com/line/open/p5JFBAoGKqDI?ftid=etPRUboDcJJg";

interface NatureResultProps {
  animalResult: AnimalResult;
  numerologyResult: NumerologyResult;
  fiveAnimalsResult?: FiveAnimalsResult | null;
  onReset: () => void;
}

function getAnimal60ImagePath(number: number): string {
  return `/images/animals/60/${String(number).padStart(2, "0")}.webp`;
}

export function NatureResult({
  animalResult,
  numerologyResult,
  fiveAnimalsResult,
}: NatureResultProps) {
  const groupInfo = GROUP_DESCRIPTIONS[animalResult.group];

  const handleLineClick = () => {
    window.open(LINE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto pb-24">
      <div className="text-center mb-6">
        <Sparkles className="w-8 h-8 text-orange-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {"あなたの生まれ持った性質"}
        </h2>
        <p className="text-gray-500 text-sm">
          {"個性心理学 × 数秘術の結果"}
        </p>
      </div>

      {/* Animal Result */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
        <div className="text-center mb-4">
          <img
            src={getAnimal60ImagePath(animalResult.number)}
            alt={animalResult.character}
            className="w-28 h-28 mx-auto rounded-2xl object-cover mb-3 shadow-md border-2 border-orange-200"
          />
          <h3 className="text-xl font-bold text-gray-800">
            {animalResult.character}
          </h3>
          <div
            className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: `${groupInfo.color}20`,
              color: groupInfo.color,
              border: `1px solid ${groupInfo.color}40`,
            }}
          >
            {groupInfo.name}
          </div>
          <p className="text-gray-500 text-xs mt-1">
            {groupInfo.description}
          </p>
        </div>

        {/* Work Style */}
        {animalResult.workStyle && (
          <div className="bg-orange-50 rounded-xl p-3 mb-4">
            <h4 className="text-orange-600 text-sm font-bold mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              {"仕事のスタイル"}
            </h4>
            <p className="text-gray-700 text-xs leading-relaxed">
              {animalResult.workStyle}
            </p>
          </div>
        )}

        {/* Growth Advice */}
        {animalResult.growthAdvice && (
          <div className="bg-green-50 rounded-xl p-3 mb-4">
            <h4 className="text-green-600 text-sm font-bold mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {"成長のヒント"}
            </h4>
            <p className="text-gray-700 text-xs leading-relaxed">
              {animalResult.growthAdvice}
            </p>
          </div>
        )}

        <div className="mb-3">
          <h4 className="text-orange-600 text-sm font-bold mb-2">{"強み"}</h4>
          <div className="flex flex-wrap gap-2">
            {animalResult.strengths.map((s) => (
              <span
                key={s}
                className="px-3 py-1 bg-orange-50 text-orange-600 text-xs rounded-full border border-orange-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-gray-500 text-sm font-bold mb-2">
            {"キャリア適性"}
          </h4>
          <div className="flex flex-wrap gap-2">
            {animalResult.careerHints.map((h) => (
              <span
                key={h}
                className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-200"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Five Animals Card */}
      {fiveAnimalsResult && (
        <div className="mb-4">
          <FiveAnimalsCard result={fiveAnimalsResult} />
        </div>
      )}

      {/* Numerology Result */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-purple-100 border-2 border-purple-400 flex items-center justify-center">
            <span className="text-purple-600 font-black text-xl">
              {numerologyResult.lifePath}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {"ライフパスナンバー"} {numerologyResult.lifePath}
            </h3>
            <p className="text-purple-600 text-sm font-bold">
              {"「"}
              {numerologyResult.name}
              {"」"}
            </p>
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          {numerologyResult.description}
        </p>

        <div>
          <h4 className="text-gray-500 text-sm font-bold mb-2">
            {"キャリア特性"}
          </h4>
          <ul className="space-y-1">
            {numerologyResult.careerTraits.map((trait) => (
              <li
                key={trait}
                className="text-gray-600 text-sm flex items-start gap-2"
              >
                <Star className="w-3 h-3 text-purple-400 mt-1 shrink-0" />
                {trait}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* LINE誘導ティーザー（クリック可能） */}
      <button
        type="button"
        onClick={handleLineClick}
        className="w-full rounded-2xl bg-orange-50/60 p-4 text-center border border-orange-200/70 hover:bg-orange-50 hover:border-orange-300 transition-colors active:scale-[0.99]"
      >
        <p className="text-sm font-bold text-gray-800">
          {"LINEで最新情報を受け取れます"}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {"リリース情報や追加コンテンツをお知らせします"}
        </p>
      </button>

      {/* Sticky bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-orange-200/60 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-8px_rgba(234,88,12,0.2)] backdrop-blur-md">
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={handleLineClick}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" />
            {"LINEで最新情報をいち早く受け取る"}
          </button>
        </div>
      </div>
    </div>
  );
}
