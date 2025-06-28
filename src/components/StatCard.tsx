
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  iconColor?: string;
}

export function StatCard({ icon, title, value, iconColor = "text-elegant-gold" }: StatCardProps) {
  return (
    <div className="bg-elegant-cream dark:bg-elegant-dark rounded-lg shadow-sm p-6 flex flex-col items-center border border-elegant-tan/20">
      <div className={`mb-4 ${iconColor}`}>
        {icon}
      </div>
      <h3 className="text-lg text-elegant-coffee dark:text-elegant-tan mb-1">{title}</h3>
      <p className="text-4xl font-bold text-elegant-dark dark:text-elegant-cream">{value}</p>
    </div>
  );
}
