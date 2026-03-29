import { ReactNode } from "react";
import galaxyBg from "@/assets/galaxy-bg.jpg";

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen relative">
    <div
      className="fixed inset-0 bg-cover bg-center opacity-30"
      style={{ backgroundImage: `url(${galaxyBg})` }}
    />
    <div className="fixed inset-0 galaxy-gradient" />
    <div className="relative z-10 pt-16">{children}</div>
  </div>
);

export default PageWrapper;
