import clsx from "clsx";
import React from "react";

const DotStatus = ({ status }: any) => {
  return (
    <div
      className={clsx(
        status === "open" && "bg-yellow-500",
        status === "in progress" && "bg-indigo-500",
        status === "resolved" && "bg-green-500",
        status === "closed" && "bg-orange-700",
        status === "rejected" && "bg-red-700",
        "w-2 h-2 rounded-full"
      )}
    ></div>
  );
};

export default DotStatus;
