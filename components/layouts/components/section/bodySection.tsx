import clsx from "clsx";
import React from "react";

const BodySection = ({ children, full }: any) => {
  return (
    <div
      className={clsx(
        "border-t border-gray-200 ",
        full ? "p-0" : "px-4 sm:px-6 py-5"
      )}
    >
      {children}
    </div>
  );
};

export default BodySection;
