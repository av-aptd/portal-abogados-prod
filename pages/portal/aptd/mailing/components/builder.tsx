import { Text, Image, Button } from "components/icons";
import React from "react";

const Builder = ({ showComponent }: any) => {
  return (
    <div>
      <p className="text-center">Selecciona un bloque</p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <button
          onClick={() => showComponent("bloque-texto")}
          className="bg-gray-50 border p-2 rounded-lg"
        >
          <div className="flex justify-center pb-2">
            <Text className="h-6 w-6 text-gray-500" />
          </div>
          <p className="text-sm text-gray-500 text-center">Bloque de texto</p>
        </button>
        <button
          onClick={() => showComponent("imagen")}
          className="bg-gray-50 border p-2 rounded-lg"
        >
          <div className="flex justify-center pb-2">
            <Image className="h-6 w-6 text-gray-500" />
          </div>
          <p className="text-sm text-gray-500 text-center">Imagen</p>
        </button>
        <button
          onClick={() => showComponent("boton")}
          className="bg-gray-50 border p-2 rounded-lg"
        >
          <div className="flex justify-center pb-2">
            <Button className="h-6 w-6 text-gray-500" />
          </div>
          <p className="text-sm text-gray-500 text-center">Botón</p>
        </button>
      </div>
    </div>
  );
};

export default Builder;
