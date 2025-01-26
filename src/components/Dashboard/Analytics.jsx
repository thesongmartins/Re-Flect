import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const moodData = [
  { type: "happy", emoji: "😊", count: 15 },
  { type: "sad", emoji: "😢", count: 5 },
  { type: "neutral", emoji: "😐", count: 10 },
  { type: "excited", emoji: "🎉", count: 8 },
  { type: "tired", emoji: "😴", count: 6 },
];

function Analytics() {
  return (
    <div className="flex-1 p-2 lg:p-6">
      <h2 className="text-xl font-semibold">Analytics</h2>
      <div className="w-full h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={moodData}
            margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" name="Mood Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;
