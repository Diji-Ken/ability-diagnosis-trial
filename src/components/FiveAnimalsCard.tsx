import type { FiveAnimalsResult, AnimalName } from "@/lib/fiveAnimals";
import { animalImageMap, positionColors } from "@/lib/fiveAnimals";
import { Sparkles } from "lucide-react";

interface FiveAnimalsCardProps {
  result: FiveAnimalsResult;
}

const POSITION_DESCRIPTIONS: Record<string, string> = {
  essence: "\u751F\u307E\u308C\u6301\u3063\u305F\u672C\u8CEA\u7684\u306A\u6027\u683C",
  surface: "\u521D\u5BFE\u9762\u3067\u898B\u305B\u308B\u5370\u8C61",
  hope: "\u7406\u60F3\u3068\u3059\u308B\u59FF\u30FB\u76EE\u6A19",
  decision: "\u6C7A\u65AD\u6642\u306E\u601D\u8003\u30D1\u30BF\u30FC\u30F3",
  hidden: "\u89AA\u3057\u3044\u4EBA\u306B\u898B\u305B\u308B\u7D20\u9854",
};

// グリッドセル用の短いラベル（幅を揃えるため「キャラ」を外す）
const SHORT_LABELS: Record<string, string> = {
  essence: "\u672C\u8CEA",
  surface: "\u8868\u9762",
  hope: "\u5E0C\u671B",
  decision: "\u610F\u601D\u6C7A\u5B9A",
  hidden: "\u96A0\u308C",
};

function getImagePath(animal: AnimalName | null): string {
  if (!animal) return "";
  const fileName = animalImageMap[animal];
  return fileName ? `/images/animals/face/${fileName}.webp` : "";
}

export function FiveAnimalsCard({ result }: FiveAnimalsCardProps) {
  const positions = [
    { key: "essence", animal: result.essence },
    { key: "surface", animal: result.surface },
    { key: "hope", animal: result.hope },
    { key: "decision", animal: result.decision },
    { key: "hidden", animal: result.hidden },
  ] as const;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fade-in-up">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold text-gray-800">5 Animals</h3>
        </div>
        <p className="text-gray-500 text-xs">
          {"\u751F\u5E74\u6708\u65E5\u304B\u3089\u5C0E\u304B\u308C\u305F5\u3064\u306E\u52D5\u7269\u30AD\u30E3\u30E9"}
        </p>
      </div>

      {/* Five Animals Grid */}
      <div className="grid grid-cols-5 gap-2 mb-5">
        {positions.map(({ key, animal }) => {
          const colors = positionColors[key];
          const imgPath = getImagePath(animal);
          return (
            <div
              key={key}
              className="text-center p-2 rounded-xl border transition-colors"
              style={{
                borderColor: `${colors.bg}40`,
                backgroundColor: `${colors.bg}08`,
              }}
            >
              {imgPath ? (
                <img
                  src={imgPath}
                  alt={animal || ""}
                  className="w-12 h-12 mx-auto rounded-full object-cover border-2 mb-1"
                  style={{ borderColor: colors.bg }}
                />
              ) : (
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl mb-1 border-2"
                  style={{
                    borderColor: colors.bg,
                    backgroundColor: `${colors.bg}15`,
                  }}
                >
                  ?
                </div>
              )}
              <div className="text-gray-800 text-xs font-bold whitespace-nowrap">
                {animal || "?"}
              </div>
              <div
                className="text-[10px] font-bold mt-1 whitespace-nowrap"
                style={{ color: colors.bg }}
              >
                {SHORT_LABELS[key]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Position Descriptions */}
      <div className="space-y-2">
        {positions.map(({ key, animal }) => {
          if (!animal) return null;
          const colors = positionColors[key];
          return (
            <div key={key} className="flex items-start gap-2 text-xs">
              <span
                className="font-bold shrink-0 w-16 text-right whitespace-nowrap"
                style={{ color: colors.bg }}
              >
                {SHORT_LABELS[key]}
              </span>
              <span className="text-gray-500">
                {animal} - {POSITION_DESCRIPTIONS[key]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
