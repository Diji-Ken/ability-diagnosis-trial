import type {
  JobMatchResult,
  AnimalResult,
  NumerologyResult,
} from "@/types/diagnosis";
import { JOB_TIER_LABELS } from "@/data/jobs";
import { calculateJobGap } from "@/lib/diagnosis/job-matcher";
import { RadarChart } from "@/components/RadarChart";
import {
  Star,
  TrendingUp,
  Briefcase,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/Button";

interface JobResultProps {
  jobResult: JobMatchResult;
  animalResult: AnimalResult;
  numerologyResult: NumerologyResult;
  onReset: () => void;
}

const SUB_PARAM_LABELS: Record<string, string> = {
  selfBranding: "\u30BB\u30EB\u30D5\u30D6\u30E9\u30F3\u30C7\u30A3\u30F3\u30B0",
  execution: "\u5B9F\u884C\u529B\u30FB\u30B9\u30D4\u30FC\u30C9",
  learning: "\u5B66\u7FD2\u30FB\u9069\u5FDC\u529B",
  trust: "\u4EBA\u9593\u529B\u30FB\u4FE1\u983C\u69CB\u7BC9",
  monetize: "\u30DE\u30CD\u30BF\u30A4\u30BA\u529B",
  direction: "\u30C7\u30A3\u30EC\u30AF\u30B7\u30E7\u30F3\u529B",
};

export function JobResult({
  jobResult,
  animalResult: _animalResult,
  numerologyResult: _numerologyResult,
  onReset,
}: JobResultProps) {
  const { primaryJob, matchScore, runnerUp, advancedJobs, coreParams, subParams } =
    jobResult;

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      {/* Main Job */}
      <div className="text-center mb-6">
        <Briefcase className="w-8 h-8 text-orange-500 mx-auto mb-3" />
        <p className="text-gray-500 text-sm mb-2">{"\u3042\u306A\u305F\u306E\u30B8\u30E7\u30D6\u306F\u2026"}</p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-1">
          {primaryJob.name}
        </h2>
        <p className="text-orange-600 font-bold text-lg">{primaryJob.title}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-orange-50 text-orange-600 text-xs rounded-full border border-orange-200">
          {JOB_TIER_LABELS[primaryJob.tier]}
          {" \u30FB \u30DE\u30C3\u30C1\u5EA6 "}
          {matchScore}%
        </span>
      </div>

      {/* Mascot & Job Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4 text-center">
        <div className="w-44 h-44 mx-auto mb-4 relative">
          <img
            src={primaryJob.imageUrl}
            alt={primaryJob.mascot?.name || primaryJob.name}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
        {primaryJob.mascot && (
          <div className="mb-3">
            <span className="text-orange-600 font-bold text-lg">
              {primaryJob.mascot.name}
            </span>
            <span className="text-gray-400 text-xs ml-2">
              {primaryJob.mascot.animalMotif}
              {"\u30E2\u30C1\u30FC\u30D5"}
            </span>
            <p className="text-gray-500 text-xs mt-1">
              {primaryJob.mascot.description}
            </p>
          </div>
        )}
        <p className="text-gray-700 text-sm leading-relaxed italic">
          &ldquo;{primaryJob.catchphrase}&rdquo;
        </p>
        <p className="text-gray-500 text-sm mt-3 leading-relaxed">
          {primaryJob.description}
        </p>
      </div>

      {/* Radar Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <h3 className="text-orange-600 font-bold text-center mb-2">
          {"\u30B9\u30AD\u30EB\u30D1\u30E9\u30E1\u30FC\u30BF"}
        </h3>
        <RadarChart params={coreParams} />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <ParamDisplay
            label={"\u30B3\u30DF\u30E5\u30CB\u30B1\u30FC\u30B7\u30E7\u30F3\u529B"}
            value={coreParams.communication}
            color="#0ea5e9"
          />
          <ParamDisplay
            label={"\u5C02\u9580\u30B9\u30AD\u30EB"}
            value={coreParams.specialist}
            color="#f97316"
          />
          <ParamDisplay
            label={"\u30DE\u30FC\u30B1\u30C6\u30A3\u30F3\u30B0\u529B"}
            value={coreParams.marketing}
            color="#22c55e"
          />
          <ParamDisplay label={"AI\u30B9\u30AD\u30EB"} value={coreParams.ai} color="#a855f7" />
        </div>
      </div>

      {/* Sub Parameters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <h3 className="text-orange-600 font-bold mb-3">
          {"\u30B5\u30D6\u30D1\u30E9\u30E1\u30FC\u30BF"}
        </h3>
        <div className="space-y-2">
          {(Object.keys(SUB_PARAM_LABELS) as (keyof typeof subParams)[]).map(
            (key) => (
              <div key={key}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{SUB_PARAM_LABELS[key]}</span>
                  <span className="text-gray-800 font-bold">
                    {subParams[key]}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-300 to-orange-500 rounded-full transition-all duration-700"
                    style={{ width: `${subParams[key]}%` }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Advanced Jobs */}
      {advancedJobs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <h3 className="text-orange-600 font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {"\u4E0A\u7D1A\u30B8\u30E7\u30D6\u3078\u306E\u9053"}
          </h3>
          {advancedJobs.map((advJob) => {
            const gap = calculateJobGap(coreParams, advJob);
            const firstSentence =
              advJob.description.split(/[\u3002\uFF01!]/)[0] + "\u3002";
            return (
              <div
                key={advJob.id}
                className="bg-gray-50 rounded-xl p-3 mb-2 last:mb-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-16 h-16 relative shrink-0">
                    <img
                      src={advJob.imageUrl}
                      alt={advJob.name}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-orange-500" />
                      <span className="text-gray-800 font-bold">
                        {advJob.name}
                      </span>
                      <span className="text-gray-400 text-xs">
                        ({advJob.title})
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1 italic">
                      &ldquo;{advJob.catchphrase}&rdquo;
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mb-2">
                  {"\u4E0A\u7D1A\u30B8\u30E7\u30D6\u306B\u5230\u9054\u3059\u308B\u305F\u3081\u306E\u30D2\u30F3\u30C8\uFF1A"}
                  {firstSentence}
                </p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {gap.communication > 0 && (
                    <span className="text-sky-500">
                      {"\u30B3\u30DF\u30E5\u30CB\u30B1\u30FC\u30B7\u30E7\u30F3\u529B"} +{gap.communication}
                    </span>
                  )}
                  {gap.specialist > 0 && (
                    <span className="text-orange-500">
                      {"\u5C02\u9580\u30B9\u30AD\u30EB"} +{gap.specialist}
                    </span>
                  )}
                  {gap.marketing > 0 && (
                    <span className="text-green-500">
                      {"\u30DE\u30FC\u30B1\u30C6\u30A3\u30F3\u30B0\u529B"} +{gap.marketing}
                    </span>
                  )}
                  {gap.ai > 0 && (
                    <span className="text-purple-500">
                      {"AI\u30B9\u30AD\u30EB"} +{gap.ai}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Plan */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <h3 className="text-orange-600 font-bold mb-3 flex items-center gap-2">
          <Star className="w-5 h-5" />
          {"\u30A2\u30AF\u30B7\u30E7\u30F3\u30D7\u30E9\u30F3"}
        </h3>
        <ul className="space-y-2">
          {primaryJob.actionPlan.map((plan, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="w-5 h-5 bg-orange-100 text-orange-600 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-gray-700">{plan}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Runner-up Job */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <h3 className="text-gray-500 font-bold text-sm mb-2">
          {"\u6B21\u306B\u8FD1\u3044\u30B8\u30E7\u30D6"}
        </h3>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-16 h-16 relative shrink-0">
            <img
              src={runnerUp.imageUrl}
              alt={runnerUp.name}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-gray-800 font-bold">
              {runnerUp.name}{" "}
              <span className="text-gray-400 text-sm">({runnerUp.title})</span>
            </p>
            <p className="text-gray-500 text-xs mt-1 italic">
              &ldquo;{runnerUp.catchphrase}&rdquo;
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-2">
          {runnerUp.description.length > 80
            ? runnerUp.description.slice(0, 80) + "..."
            : runnerUp.description}
        </p>
        {(() => {
          const runnerUpGap = calculateJobGap(coreParams, runnerUp);
          const hasGap =
            runnerUpGap.communication > 0 ||
            runnerUpGap.specialist > 0 ||
            runnerUpGap.marketing > 0 ||
            runnerUpGap.ai > 0;
          if (!hasGap) return null;
          return (
            <div>
              <p className="text-gray-500 text-xs mb-1">
                {"\uD83D\uDCA1 \u3053\u306E\u30B8\u30E7\u30D6\u306B\u8FD1\u3065\u304F\u305F\u3081\u306E\u30D2\u30F3\u30C8\uFF1A"}
              </p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {runnerUpGap.communication > 0 && (
                  <span className="text-sky-500">
                    {"\u30B3\u30DF\u30E5\u30CB\u30B1\u30FC\u30B7\u30E7\u30F3\u529B"} +{runnerUpGap.communication}
                  </span>
                )}
                {runnerUpGap.specialist > 0 && (
                  <span className="text-orange-500">
                    {"\u5C02\u9580\u30B9\u30AD\u30EB"} +{runnerUpGap.specialist}
                  </span>
                )}
                {runnerUpGap.marketing > 0 && (
                  <span className="text-green-500">
                    {"\u30DE\u30FC\u30B1\u30C6\u30A3\u30F3\u30B0\u529B"} +{runnerUpGap.marketing}
                  </span>
                )}
                {runnerUpGap.ai > 0 && (
                  <span className="text-purple-500">
                    {"AI\u30B9\u30AD\u30EB"} +{runnerUpGap.ai}
                  </span>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Reset */}
      <div className="text-center mt-4 mb-8">
        <Button variant="ghost" onClick={onReset} size="sm">
          <RotateCcw className="inline w-4 h-4 mr-1" />
          {"\u3082\u3046\u4E00\u5EA6\u8A3A\u65AD\u3059\u308B"}
        </Button>
      </div>
    </div>
  );
}

function ParamDisplay({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800 font-bold ml-auto">{value}</span>
    </div>
  );
}
