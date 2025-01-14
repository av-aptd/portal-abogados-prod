import React from "react";

const LineItem = ({ label, value }: any) => {
  return (
    <div className="flex justify-between border-b border-gray-100 last:border-none py-3 items-center px-4">
      <h3 className="text-sm text-gray-500">{label}</h3>
      <p className="text-sm font-semibold text-gray-700">{value}</p>
    </div>
  );
};

export default LineItem;
