import React, { useState } from "react";
import { Help, Add, Minus } from "components/icons";

import useMeasure from "react-use-measure";
import { useEstudioStore } from "store/estudio";

const HelpBox = ({ help }: any) => {
  const [open, setOpen] = useState(false);
  let [ref, { height }] = useMeasure();

  const showHelpModal = useEstudioStore((state) => state.showHelpModal);
  const setHelp = useEstudioStore((state) => state.setHelp);

  const setHelpModal = () => {
    setHelp(help);
    showHelpModal();
  };

  return (
    <>
      <div className="hidden lg:flex space-x-2">
        <Help className="w-6 h-6 text-gray-400 inline-block shrink-0" />
        <div>
          {help.map((text: string) => (
            <p key={text} className="text-gray-400 text-sm pb-4 leading-6">
              {text}
            </p>
          ))}
        </div>
      </div>
      <div className="lg:hidden  px-4 py-2 rounded-lg border border-gray-100">
        <div className="flex items-center justify-center">
          <button
            className=" text-gray-500 flex justify-center items-center space-x-2 w-full"
            onClick={() => setHelpModal()}
          >
            <Help className="w-6 h-6 text-gray-400 inline-block shrink-0" />
            <p className="text-gray-400 font-medium text-sm text-center">
              Ayuda
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default HelpBox;
