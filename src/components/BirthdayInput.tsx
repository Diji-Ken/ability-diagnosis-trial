import { useState } from "react";
import { Button } from "@/components/Button";
import { Calendar } from "lucide-react";

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
      <div className="flex items-center justify-center gap-3 mb-6">
        <Calendar className="w-8 h-8 text-orange-500" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {"STEP 1: \u6027\u8CEA\u8A3A\u65AD"}
        </h2>
      </div>

      <p className="text-gray-500 text-center mb-8">
        {"\u751F\u5E74\u6708\u65E5\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"}
        <br />
        {"\u3042\u306A\u305F\u306E\u751F\u307E\u308C\u6301\u3063\u305F\u6027\u8CEA\u3092\u8A3A\u65AD\u3057\u307E\u3059\u3002"}
      </p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-gray-500 text-xs mb-1">
                {"\u5E74"}
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
                {"\u6708"}
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
                {"\u65E5"}
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
          {"\u8A3A\u65AD\u3059\u308B"}
        </Button>
      </form>
    </div>
  );
}
