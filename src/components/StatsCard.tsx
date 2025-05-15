import { ReactElement } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactElement | null;
  iconColor: string;
  iconBg: string;
  percentage: string;
  percentageColor: string;
  trend: string;
}

const StatsCard = ({ title, value, icon, iconColor, iconBg, percentage, percentageColor, trend }: StatsCardProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <div className={`flex justify-between items-center`}>
        <div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-2xl">{value}</p>
        </div>
        <button type="button" style={{ color: iconColor, backgroundColor: iconBg }} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
          {icon}
        </button>
      </div>
      <div className={`mt-6`}>
        <button type="button" style={{ color: percentageColor }} className={`text-sm font-semibold flex items-center gap-2`}>
          {trend}
          {percentage}
        </button>
      </div>
    </div>
  )
}
export default StatsCard