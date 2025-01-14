import clsx from "clsx";
import React from "react";

const SectionBloc = ({ children, title, description, full }: any) => {
  return (
    <div className="overflow-hidden bg-white border rounded-lg">
      <div className="px-4 py-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
          {description != undefined && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>

      <div
        className={clsx(
          "border-t border-gray-200 ",
          full ? "p-0" : "px-4 sm:px-6 py-5"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SectionBloc;
