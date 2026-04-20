import { useEffect } from "react";

interface Props {
  onComplete: () => void;
  durationMs?: number;
}

export function ProcessingAnimation({ onComplete, durationMs = 3000 }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, durationMs);
    return () => clearTimeout(timer);
  }, [durationMs, onComplete]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 animate-fade-in-up">
      <img
        src="/images/diagnosis-loading.gif"
        alt="診断中"
        className="w-full max-w-[320px] aspect-square object-contain"
      />
      <h2 className="mt-6 text-xl font-bold text-gray-900">
        あなたの情報を診断しています
      </h2>
      <p className="mt-2 text-sm text-gray-500">少しだけお待ちください…</p>
    </div>
  );
}
