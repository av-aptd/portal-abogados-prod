import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "components/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Pagination = ({
  total,
  limit,
  nextPage,
  prevPage,
  selectPage,
  currentPage,
}: any) => {
  const [pagesArray, setPagesArray] = useState<any[]>([]);
  const [longArray, setLongArray] = useState<any[]>([]);

  const schema = z
    .object({
      page: z.number().min(1).max(pagesArray.length),
    })
    .required();

  type FormData = z.infer<typeof schema>;

  useEffect(() => {
    getArray();
  }, [total, limit]);

  const getArray = () => {
    setPagesArray([]);
    for (let i = 0; i < Math.ceil(total / limit); i++) {
      setPagesArray((pagesArray: any) => [...pagesArray, i + 1]);
    }

    setValue("page", currentPage);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    selectPage(data.page);
  };

  return (
    <>
      <div className="flex items-center justify-between py-3">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={prevPage}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </button>
          <button
            onClick={nextPage}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Siguiente
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="shrink-0">
            <p className="text-sm text-gray-700">
              Mostrando{" "}
              <span className="font-medium">
                {currentPage == 1
                  ? currentPage
                  : (currentPage - 1) * Number(limit) + 1}
              </span>{" "}
              de{" "}
              <span className="font-medium">
                {total < currentPage * limit ? total : currentPage * limit}
              </span>{" "}
              de <span className="font-medium">{total}</span> resultados
            </p>
          </div>
          {pagesArray.length < 8 ? (
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md  bg-white"
                aria-label="Pagination"
              >
                <button
                  onClick={prevPage}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {pagesArray.map((page: any) => (
                  <button
                    key={page}
                    onClick={() => selectPage(page)}
                    aria-current="page"
                    className={clsx(
                      currentPage == page
                        ? "bg-secondary text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                        : "text-gray-900",
                      "relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-200 focus:z-20 focus:outline-offset-0"
                    )}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          ) : (
            <>
              <nav
                className="isolate inline-flex -space-x-px rounded-md  bg-white"
                aria-label="Pagination"
              >
                <button
                  onClick={prevPage}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <button
                  onClick={nextPage}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;
