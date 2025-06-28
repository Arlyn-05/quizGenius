
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  path: string;
  bgColor: string;
  textColor?: string;
}

export function ActionCard({ 
  icon, 
  title, 
  description, 
  path, 
  bgColor,
  textColor = "text-elegant-dark" 
}: ActionCardProps) {
  return (
    <div className={`rounded-lg ${bgColor} ${textColor} p-6 flex flex-col items-center text-center border border-elegant-tan/20`}>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="mb-6">{description}</p>
      <Link 
        to={path}
        className="bg-elegant-cream text-elegant-dark px-4 py-2 rounded-md hover:bg-elegant-tan transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
}
