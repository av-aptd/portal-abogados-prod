import { HowCase } from "components/icons";
import Link from "next/link";
import React from "react";

const ComoPanel = () => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b flex justify-between items-center p-4 bg-gray-50">
        <div className="flex space-x-2 items-center">
          <HowCase className="w-6 h-6 text-gray-400" />
          <h3 className="text-gray-700">Como va mi caso</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-sm">
          Haz click en el botón para ver el estado de tu caso
        </p>

        <div className="flex justify-end">
          <Link
            href={`/portal/clientes/caso`}
            className="border text-sm p-2 rounded-lg mt-4 inline-block text-gray-500 hover:bg-gray-50 duration-150"
          >
            Ver mi caso
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComoPanel;
