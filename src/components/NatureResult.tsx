import type { AnimalResult, NumerologyResult } from "@/types/diagnosis";
import type { FiveAnimalsResult } from "@/lib/fiveAnimals";
import { GROUP_DESCRIPTIONS } from "@/lib/diagnosis/animal";
import { FiveAnimalsCard } from "@/components/FiveAnimalsCard";
import { Button } from "@/components/Button";
import { Sparkles, Star, ArrowRight, Briefcase, TrendingUp } from "lucide-react";

interface NatureResultProps {
  animalResult: AnimalResult;
  numerologyResult: NumerologyResult;
  fiveAnimalsResult?: FiveAnimalsResult | null;
  onNext: () => void;
}

function getAnimal60ImagePath(number: number): string {
  return `/images/animals/60/${String(number).padStart(2, '0')}.webp`;
}

export function NatureResult({
  animalResult,
  numerologyResult,
  fiveAnimalsResult,
  onNext,
}: NatureResultProps) {
  const groupInfo = GROUP_DESCRIPTIONS[animalResult.group];

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      <div className="text-center mb-6">
        <Sparkles className="w-8 h-8 text-orange-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {"\u3042\u306A\u305F\u306E\u751F\u307E\u308C\u6301\u3063\u305F\u6027\u8CEA"}
        </h2>
        <p className="text-gray-500 text-sm">
          {"\u500B\u6027\u5FC3\u7406\u5B66 \u00D7 \u6570\u79D8\u8853\u306E\u7D50\u679C"}
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

        {/* Detailed Personality */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {animalResult.detailedPersonality || animalResult.personality}
        </p>

        {/* Work Style */}
        {animalResult.workStyle && (
          <div className="bg-orange-50 rounded-xl p-3 mb-4">
            <h4 className="text-orange-600 text-sm font-bold mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              {"\u4ED5\u4E8B\u306E\u30B9\u30BF\u30A4\u30EB"}
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
              {"\u6210\u9577\u306E\u30D2\u30F3\u30C8"}
            </h4>
            <p className="text-gray-700 text-xs leading-relaxed">
              {animalResult.growthAdvice}
            </p>
          </div>
        )}

        <div className="mb-3">
          <h4 className="text-orange-600 text-sm font-bold mb-2">{"\u5F37\u307F"}</h4>
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
            {"\u30AD\u30E3\u30EA\u30A2\u9069\u6027"}
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
              {"\u30E9\u30A4\u30D5\u30D1\u30B9\u30CA\u30F3\u30D0\u30FC"} {numerologyResult.lifePath}
            </h3>
            <p className="text-purple-600 text-sm font-bold">
              {"\u300C"}{numerologyResult.name}{"\u300D"}
            </p>
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          {numerologyResult.description}
        </p>

        <div>
          <h4 className="text-gray-500 text-sm font-bold mb-2">
            {"\u30AD\u30E3\u30EA\u30A2\u7279\u6027"}
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

      {/* Next Step */}
      <Button onClick={onNext} className="w-full" size="lg">
        {"\u30B9\u30AD\u30EB\u8A3A\u65AD\u3078\u9032\u3080"} <ArrowRight className="inline w-5 h-5 ml-1" />
      </Button>

      <p className="text-gray-400 text-xs text-center mt-3">
        {"\u30B9\u30AD\u30EB\u3092\u5165\u529B\u3059\u308B\u3068\u3001\u3042\u306A\u305F\u306E\u30B8\u30E7\u30D6\u304C\u5224\u660E\u3057\u307E\u3059"}
      </p>
    </div>
  );
}
