import clsx from "clsx";
import React from "react";

const ChipInstallment = ({ status }: any) => {
  return (
    <>
      <span
        className={clsx(
          status === 0 && "bg-red-50 text-red-700 ring-red-600/10  ",
          status === 1 && "bg-green-50 text-green-700 ring-green-600/20",
          "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset "
        )}
      >
        {status == 0 ? "Pendiente" : "Pagado"}
      </span>
    </>
  );
};

export default ChipInstallment;
