import clsx from "clsx";
import React from "react";
import { nameTicketState } from "shared/helpers";

const ChipTicket = ({ status }: any) => {
  return (
    <>
      <span
        className={clsx(
          status === "open" &&
            "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
          status === "in progress" &&
            "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
          status === "resolved" &&
            "bg-green-50 text-green-700 ring-green-600/20",
          status === "closed" &&
            "bg-orange-50 text-orange-700 ring-orange-600/20",
          status === "rejected" && "bg-red-50 text-red-700 ring-red-600/10",
          "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset "
        )}
      >
        {nameTicketState(status)}
      </span>
    </>
  );
};

export default ChipTicket;
