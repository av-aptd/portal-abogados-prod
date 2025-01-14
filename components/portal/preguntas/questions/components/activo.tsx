import { Trash, ArrowDown, ArrowUp } from "components/icons";
import React, { useState } from "react";
import iCreditor from "interfaces";

const Activo = ({ activo, deleteActivo }: any) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      key={activo.name}
      className="mb-4 flex items-start justify-between space-x-4 "
    >
      <div className="flex-1  bg-gray-50 border px-4 py-2.5 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between items-center">
            <div className="text-gray-700 font-medium text-sm">
              {activo.name}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteActivo()}
        className="bg-gray-50 hover:bg-gray-100 p-2.5 border rounded-lg"
      >
        <Trash className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
};

export default Activo;
