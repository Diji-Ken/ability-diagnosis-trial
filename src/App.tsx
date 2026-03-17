import { useDiagnosis } from "@/hooks/useDiagnosis";
import { computeFiveAnimalsFromDate } from "@/lib/fiveAnimals";
import { ProgressBar } from "@/components/ProgressBar";
import { BirthdayInput } from "@/components/BirthdayInput";
import { NatureResult } from "@/components/NatureResult";
import { SkillInventory } from "@/components/SkillInventory";
import { JobResult } from "@/components/JobResult";

function App() {
  const {
    state,
    submitBirthday,
    goToStep2,
    setOccupation,
    setSkillAnswer,
    submitSkills,
    reset,
  } = useDiagnosis();

  const fiveAnimalsResult =
    state.birthday
      ? computeFiveAnimalsFromDate(
          state.birthday.year,
          state.birthday.month,
          state.birthday.day
        )
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-400 rounded-lg flex items-center justify-center text-white font-black text-sm">
              A
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-800 leading-tight">
                ABILITY JOB
              </h1>
              <span className="text-[10px] text-orange-500 font-medium">
                {"\u304A\u8A66\u3057\u7248"}
              </span>
            </div>
          </div>
          {state.currentStep > 1 && (
            <button
              onClick={reset}
              className="text-xs text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
            >
              {"\u30EA\u30BB\u30C3\u30C8"}
            </button>
          )}
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <ProgressBar
          currentStep={state.currentStep}
          totalSteps={3}
          labels={[
            "\u6027\u8CEA\u8A3A\u65AD",
            "\u30B9\u30AD\u30EB\u68DA\u5378\u3057",
            "\u30B8\u30E7\u30D6\u7D50\u679C",
          ]}
        />
      </div>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 pb-12">
        {/* Step 1: Birthday Input */}
        {state.currentStep === 1 && !state.animalResult && (
          <BirthdayInput onSubmit={submitBirthday} />
        )}

        {/* Step 1: Nature Result */}
        {state.currentStep === 1 && state.animalResult && state.numerologyResult && (
          <NatureResult
            animalResult={state.animalResult}
            numerologyResult={state.numerologyResult}
            fiveAnimalsResult={fiveAnimalsResult}
            onNext={goToStep2}
          />
        )}

        {/* Step 2: Skill Inventory */}
        {state.currentStep === 2 && (
          <SkillInventory
            skillAnswers={state.skillAnswers}
            occupation={state.occupation}
            onSetOccupation={setOccupation}
            onSetSkillAnswer={setSkillAnswer}
            onSubmit={submitSkills}
          />
        )}

        {/* Step 3: Job Result */}
        {state.currentStep === 3 &&
          state.jobResult &&
          state.animalResult &&
          state.numerologyResult && (
            <JobResult
              jobResult={state.jobResult}
              animalResult={state.animalResult}
              numerologyResult={state.numerologyResult}
              onReset={reset}
            />
          )}
      </main>

    </div>
  );
}

export default App;
