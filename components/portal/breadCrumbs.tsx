import Link from "next/link";
import React from "react";
import { Home, ArrowNext } from "components/icons";

const Breadcrumbs = ({ route }: any) => {
  return (
    <nav
      className="flex bg-white p-2 fixed inset-x-0 pl-4 sm:pl-64 z-10 border-b"
      aria-label="Breadcrumb"
    >
      <ol role="list" className="flex items-center space-x-1 lg:space-x-4">
        <li>
          <div>
            <Link
              href="/portal/clientes/panel"
              className="text-gray-400 hover:text-gray-500"
            >
              <Home className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {route.map((page: any) => (
          <li key={page.title}>
            <div className="flex items-center">
              <ArrowNext
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={page.path}
                className="ml-2 lg:ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.title ? "page" : undefined}
              >
                {page.title}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
