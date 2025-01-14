import React from "react";
import ProcessNavBar from "./components/navbars/process";
import Link from "next/link";
import { useRouter } from "next/router";

const ProcessLayout = ({ children }: any) => {
  return (
    <div>
      <ProcessNavBar />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default ProcessLayout;
