import React from "react";
import { Loading } from "components/icons";
import { Ring } from "@uiball/loaders";

const LoadingContainer = () => {
  return (
    <div className="flex justify-center p-8 bg-white rounded-lg">
      <div className="flex space-x-4 items-center">
        <Ring size={20} color="#1AABE3" />
      </div>
    </div>
  );
};

export default LoadingContainer;
