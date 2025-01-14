import NavSection from "components/portal/navSection";
import React from "react";

const ContabilidadLayout = ({ children }: any) => {
  return (
    <div className="pt-6 mx-auto max-w-7xl">
      <NavSection />
      <div>{children}</div>
    </div>
  );
};

export default ContabilidadLayout;
