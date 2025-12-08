import React from "react";
import { PrivateBackground } from "@/shared/backgrounds/PrivateBackground";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  return <PrivateBackground>{children}</PrivateBackground>;
};
