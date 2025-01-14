import { Trash, ArrowDown, ArrowUp } from "components/icons";
import React, { useState } from "react";

const Employee = ({ employee, deleteEmployee }: any) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      key={employee.email}
      className="mb-4 flex items-start justify-between space-x-4 "
    >
      <div className="flex-1  bg-gray-50 border px-4 py-2.5 rounded-lg">
        <div className="grid grid-cols-5 gap-4">
          <div className=" text-gray-700 font-medium text-sm col-span-2">
            {employee.name} {employee.surname}
          </div>
          <div className="text-gray-500 text-sm">{employee.phone}</div>
          <div className="text-gray-500 text-sm">{employee.email}</div>

          <div className="pr-4 text-sm text-gray-500 text-right">
            {Number(employee.salary).toLocaleString("es-AR")} €
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteEmployee()}
        className="bg-gray-50 hover:bg-gray-100 p-2.5 border rounded-lg"
      >
        <Trash className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
};

export default Employee;
