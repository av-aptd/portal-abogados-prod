import React from "react";
import { Loading } from "components/icons";
import { Ring } from "@uiball/loaders";

const ErrorContainer = () => {
  return (
    <div className="flex justify-center p-8 bg-white rounded-lg">
      <div className="flex space-x-4 items-center">
        <p>Error al cargar la información</p>
      </div>
    </div>
  );
};

export default ErrorContainer;
