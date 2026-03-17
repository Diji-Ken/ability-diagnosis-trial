import { useState } from "react";
import { SKILL_CATEGORIES, OCCUPATIONS } from "@/data/skills";
import { Button } from "@/components/Button";
import {
  Wrench,
  MessageCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface SkillInventoryProps {
  skillAnswers: Record<string, number>;
  occupation: string | null;
  onSetOccupation: (occupation: string) => void;
  onSetSkillAnswer: (questionId: string, value: number) => void;
  onSubmit: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

const AXIS_COLORS: Record<string, string> = {
  communication: "text-sky-500",
  specialist: "text-orange-500",
  marketing: "text-green-500",
  ai: "text-purple-500",
};

export function SkillInventory({
  skillAnswers,
  occupation,
  onSetOccupation,
  onSetSkillAnswer,
  onSubmit,
}: SkillInventoryProps) {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<
    Record<string, number>
  >({});

  const totalQuestions = SKILL_CATEGORIES.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );
  const answeredQuestions = Object.keys(skillAnswers).length;
  const allAnswered = answeredQuestions >= totalQuestions && occupation;

  const category = SKILL_CATEGORIES[currentCategory];

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      <div className="text-center mb-6">
        <Wrench className="w-8 h-8 text-orange-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {"STEP 2: \u30B9\u30AD\u30EB\u68DA\u5378\u3057"}
        </h2>
        <p className="text-gray-500 text-sm">
          {"\u3042\u306A\u305F\u306E\u73FE\u5728\u306E\u30B9\u30AD\u30EB\u3092\u6559\u3048\u3066\u304F\u3060\u3055\u3044"}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>
            {"\u56DE\u7B54\u6E08\u307F"}: {answeredQuestions}/{totalQuestions}
          </span>
          <span>
            {Math.round((answeredQuestions / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-300 to-orange-500 rounded-full transition-all duration-500"
            style={{
              width: `${(answeredQuestions / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Occupation selection */}
      {!occupation && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-orange-600 font-bold mb-3">
            {"\u73FE\u5728\u306E\u8077\u7A2E\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044"}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {OCCUPATIONS.map((occ) => (
              <button
                key={occ.id}
                onClick={() => onSetOccupation(occ.id)}
                className="px-3 py-2 text-sm rounded-xl border border-gray-200 bg-slate-50 text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer text-left"
              >
                {occ.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Skill Questions */}
      {occupation && (
        <>
          {/* Category tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {SKILL_CATEGORIES.map((cat, i) => {
              const catAnswered = cat.questions.filter(
                (q) => skillAnswers[q.id] !== undefined
              ).length;
              const isComplete = catAnswered === cat.questions.length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCurrentCategory(i)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    i === currentCategory
                      ? "bg-orange-100 text-orange-600 border border-orange-300"
                      : isComplete
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className={AXIS_COLORS[cat.id]}>
                    {ICON_MAP[cat.icon]}
                  </span>
                  {cat.label.replace("\u30B9\u30AD\u30EB", "")}
                  {isComplete && " \u2713"}
                </button>
              );
            })}
          </div>

          {/* Questions */}
          <div className="space-y-4 mb-6">
            {category.questions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                <p className="text-gray-800 text-sm font-bold mb-3">
                  {question.text}
                </p>
                <div className="space-y-2">
                  {question.options.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => {
                        onSetSkillAnswer(question.id, option.value);
                        setSelectedOptionIndex((prev) => ({
                          ...prev,
                          [question.id]: optIdx,
                        }));
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all cursor-pointer border ${
                        selectedOptionIndex[question.id] === optIdx
                          ? "bg-orange-50 border-orange-400 text-orange-700 font-medium"
                          : "bg-slate-50 border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {currentCategory > 0 && (
              <Button
                variant="secondary"
                onClick={() => setCurrentCategory((c) => c - 1)}
                className="flex-1"
              >
                {"\u524D\u3078"}
              </Button>
            )}
            {currentCategory < SKILL_CATEGORIES.length - 1 ? (
              <Button
                onClick={() => setCurrentCategory((c) => c + 1)}
                className="flex-1"
              >
                {"\u6B21\u306E\u30AB\u30C6\u30B4\u30EA\u30FC"}{" "}
                <ArrowRight className="inline w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={onSubmit}
                disabled={!allAnswered}
                className="flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
                size="lg"
              >
                {"\u30B8\u30E7\u30D6\u3092\u8A3A\u65AD\u3059\u308B"}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
