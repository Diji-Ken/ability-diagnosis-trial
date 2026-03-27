import { useState } from "react";
import { Button } from "@/components/Button";

interface BirthdayInputProps {
  onSubmit: (year: number, month: number, day: number) => void;
}

export function BirthdayInput({ onSubmit }: BirthdayInputProps) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number | "">(1990);
  const [month, setMonth] = useState<number | "">(1);
  const [day, setDay] = useState<number | "">(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (year && month && day) {
      onSubmit(year, month, day);
    }
  };

  const isValid = year && month && day && year >= 1920 && year <= currentYear;

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center mb-8">
        {/* Soft glow behind image */}
        <div className="absolute top-4 w-40 h-40 md:w-48 md:h-48 bg-orange-200/40 rounded-full blur-3xl" />
        <img
          src="/images/hero.png"
          alt="Animal Characters"
          className="relative w-40 h-40 md:w-48 md:h-48 object-contain mix-blend-multiply"
        />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-2">
          {"あなたの性質を診断"}
        </h2>
        <p className="text-gray-500 text-sm text-center leading-relaxed">
          {"生年月日を入力するだけで"}
          <br />
          {"あなたの生まれ持った性質がわかります"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-gray-500 text-xs mb-1">
                {"年"}
              </label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-gray-800 text-center appearance-none cursor-pointer focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
              >
                {Array.from(
                  { length: currentYear - 1920 + 1 },
                  (_, i) => currentYear - i
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-500 text-xs mb-1">
                {"月"}
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-gray-800 text-center appearance-none cursor-pointer focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-500 text-xs mb-1">
                {"日"}
              </label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-gray-800 text-center appearance-none cursor-pointer focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValid}
          className="w-full disabled:opacity-40 disabled:cursor-not-allowed"
          size="lg"
        >
          {"診断する"}
        </Button>
      </form>
    </div>
  );
}
