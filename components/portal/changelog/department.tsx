import clsx from "clsx";
import React from "react";

type departmentProps = {
  department: string;
};

const Department = ({ department }: departmentProps) => {
  return (
    <div
      className={clsx(
        department == "Comercial" && "bg-green-100 text-green-800",
        department == "RE" && "bg-primary/20 text-primary",
        department == "Procesal" && "bg-yellow-100 text-yellow-800",
        department == "Marketing" && "bg-red-100 text-red-800",
        department == "General" && "bg-indigo-100 text-indigo-800",
        department == "Contabilidad" && "bg-orange-100 text-orange-800",
        " text-xs rounded-full px-4 py-0.5 inline-block mb-4"
      )}
    >
      {department}
    </div>
  );
};

export default Department;
