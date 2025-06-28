
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  iconColor: string;
}

export function FeatureCard({ icon, title, description, iconColor }: FeatureCardProps) {
  return (
    <div className="bg-elegant-cream dark:bg-elegant-dark rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow border border-elegant-tan/20">
      <div className={`mb-4 ${iconColor}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-elegant-dark dark:text-elegant-cream">{title}</h3>
      <p className="text-elegant-coffee dark:text-elegant-tan">{description}</p>
    </div>
  );
}
