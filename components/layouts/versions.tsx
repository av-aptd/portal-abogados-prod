import Link from "next/link";
import React from "react";
import SectionBloc from "./components/section/sectionBloc";
import clsx from "clsx";
import { useRouter } from "next/router";

const versions = [
  {
    id: 103,
    title: "v1.03",
    date: "29.08.2023",
    path: "103",
  },
  {
    id: 102,
    title: "v1.02",
    date: "05.07.2023",
    path: "102",
  },
  {
    id: 101,
    title: "v1.01",
    date: "28.06.2023",
    path: "101",
  },
];

const VersionsLayout = ({ children }: any) => {
  const router = useRouter();

  return (
    <div className="pt-6 mx-auto max-w-4xl">
      <div className="flex space-x-4 items-start">
        <div className="sticky top-20 hidden lg:block">
          <SectionBloc title="Versiones">
            <div className="flex flex-col space-y-1 w-[200px]">
              {versions.map((version) => (
                <Link
                  key={version.id}
                  href={`/portal/aptd/mejoras/version/${version.id}`}
                  className={clsx(
                    router.asPath ===
                      `/portal/aptd/mejoras/version/${version.id}`
                      ? "bg-gray-100"
                      : "",
                    "flex justify-between items-baseline py-2 px-4 rounded-lg"
                  )}
                >
                  <p> {version.title}</p>
                  <p className="text-sm text-gray-500"> {version.date}</p>
                </Link>
              ))}
            </div>
          </SectionBloc>
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default VersionsLayout;
