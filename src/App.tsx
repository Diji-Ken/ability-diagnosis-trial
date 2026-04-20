import { useState, useCallback } from "react";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { computeFiveAnimalsFromDate } from "@/lib/fiveAnimals";
import { BirthdayInput } from "@/components/BirthdayInput";
import { NatureResult } from "@/components/NatureResult";
import { ProcessingAnimation } from "@/components/ProcessingAnimation";

function App() {
  const { state, submitBirthday, reset } = useDiagnosis();
  const [processing, setProcessing] = useState(false);

  const fiveAnimalsResult = state.birthday
    ? computeFiveAnimalsFromDate(
        state.birthday.year,
        state.birthday.month,
        state.birthday.day
      )
    : null;

  const handleBirthdaySubmit = useCallback(
    (year: number, month: number, day: number) => {
      setProcessing(true);
      submitBirthday(year, month, day);
    },
    [submitBirthday]
  );

  const handleProcessingComplete = useCallback(() => {
    setProcessing(false);
  }, []);

  const handleReset = useCallback(() => {
    setProcessing(false);
    reset();
  }, [reset]);

  const showResult = !!state.animalResult && !processing;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-400 rounded-lg flex items-center justify-center text-white font-black text-sm">
              5
            </div>
            <h1 className="text-sm font-bold text-gray-800">
              {"5アニマル診断"}
            </h1>
          </div>
          {showResult && (
            <button
              onClick={handleReset}
              className="text-xs text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
            >
              {"リセット"}
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-12">
        {/* Birthday Input */}
        {!state.animalResult && !processing && (
          <BirthdayInput onSubmit={handleBirthdaySubmit} />
        )}

        {/* Processing */}
        {processing && (
          <ProcessingAnimation onComplete={handleProcessingComplete} />
        )}

        {/* Nature Result */}
        {showResult && state.numerologyResult && (
          <NatureResult
            animalResult={state.animalResult!}
            numerologyResult={state.numerologyResult}
            fiveAnimalsResult={fiveAnimalsResult}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App;
