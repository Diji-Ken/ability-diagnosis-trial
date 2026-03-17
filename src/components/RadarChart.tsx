import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { CoreParams } from "@/types/diagnosis";

interface RadarChartProps {
  params: CoreParams;
  size?: number;
}

const AXIS_LABELS: Record<keyof CoreParams, string> = {
  communication: "\u30B3\u30DF\u30E5\u529B",
  specialist: "\u5C02\u9580\u30B9\u30AD\u30EB",
  marketing: "\u30DE\u30FC\u30B1\u529B",
  ai: "AI\u30B9\u30AD\u30EB",
};

export function RadarChart({ params }: RadarChartProps) {
  const data = (Object.keys(AXIS_LABELS) as (keyof CoreParams)[]).map(
    (key) => ({
      axis: AXIS_LABELS[key],
      value: params[key],
      fullMark: 100,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="axis"
          tick={{ fill: "#374151", fontSize: 12, fontWeight: "bold" }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "#9ca3af", fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          name="\u30D1\u30E9\u30E1\u30FC\u30BF"
          dataKey="value"
          stroke="#f97316"
          fill="#f97316"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
