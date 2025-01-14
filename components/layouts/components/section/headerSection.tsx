import React from "react";

const HeaderSection = ({ children, title, description, hasActions }: any) => {
  return (
    <div className="px-4 py-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
      <div className="">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        {description != undefined && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      {hasActions && <>{children}</>}
    </div>
  );
};

export default HeaderSection;
