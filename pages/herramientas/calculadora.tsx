import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../_app";
import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";

import Breadcrumbs from "components/portal/breadCrumbs";

const Calculadora: NextPageWithLayout = () => {
  const [embargar, setEmbargar] = useState(0);
  const [number, setNumber] = useState(0);

  const route = [
    {
      title: "Procesal",
      path: "/portal/procesal",
    },
    {
      title: "Herramientas",
      path: "/portal/procesal/herramientas",
    },
    {
      title: "Calculadora",
      path: "/portal/procesal/herramientas/calculadora",
    },
  ];

  useEffect(() => {
    calcular();
  }, [number]);

  const tramo1 = (number: any) => {
    return (number - 1080) * 0.3;
  };

  const tramo2 = (number: any) => {
    const tramo1 = 1080 * 0.3;
    const tramo2 = (number - 2160) * 0.5;
    return tramo1 + tramo2;
  };

  const tramo3 = (number: any) => {
    const tramo1 = 1080 * 0.3;
    const tramo2 = 1080 * 0.5;
    const tramo3 = (number - 3240) * 0.6;
    return tramo1 + tramo2 + tramo3;
  };

  const tramo4 = (number: any) => {
    const tramo1 = 1080 * 0.3;
    const tramo2 = 1080 * 0.5;
    const tramo3 = 1080 * 0.6;
    const tramo4 = (number - 4320) * 0.75;
    return tramo1 + tramo2 + tramo3 + tramo4;
  };

  const tramo5 = (number: any) => {
    const tramo1 = 1080 * 0.3;
    const tramo2 = 1080 * 0.5;
    const tramo3 = 1080 * 0.6;
    const tramo4 = 1080 * 0.75;
    const tramo5 = (number - 5400) * 0.9;
    return tramo1 + tramo2 + tramo3 + tramo4 + tramo5;
  };

  const calcular = () => {
    if (number < 1080) {
      setEmbargar(0);
    }
    if (number >= 1080 && number <= 2160) {
      setEmbargar(Math.ceil(tramo1(number)));
    }
    if (number > 2160 && number <= 3240) {
      setEmbargar(Math.ceil(tramo2(number)));
    }
    if (number > 3240 && number <= 4320) {
      setEmbargar(Math.ceil(tramo3(number)));
    }
    if (number > 4320 && number <= 5400) {
      setEmbargar(Math.ceil(tramo4(number)));
    }
    if (number > 5400) {
      setEmbargar(Math.ceil(tramo5(number)));
    }
  };

  return (
    <>
      <Breadcrumbs route={route} />
      <div className="pt-14 max-w-lg">
        <h1 className="font-bold text-2xl mb-6 text-primary">Calculadora</h1>
        <div>
          <div>
            <div className="pb-8">
              <h2 className=" text-gray-500">
                ¿Cuánto te pueden embargar de la nómina?
              </h2>
            </div>

            <label htmlFor="name" className="block text-gray-500">
              Escribe a continuación tu sueldo actual
            </label>

            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="number"
                name="price"
                id="price"
                className="block w-full rounded-md border-gray-300 pl-3 pr-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                aria-describedby="price-currency"
                value={number}
                onChange={(e) => setNumber(e.target.valueAsNumber)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  EUROS
                </span>
              </div>
            </div>
          </div>
          {number > 1080 && (
            <div className="pt-4">
              <p className="text-xl text-gray-500">
                Te pueden embargar:{" "}
                <span className="text-primary font-bold">
                  {embargar.toLocaleString("en").replace(/,/g, ".")}€
                </span>
              </p>
            </div>
          )}
          {number > 1 && number <= 1080 && (
            <div className="pt-4">
              <p className="text-sm text-primary">
                Sueldo menor de 1.080€ no te lo pueden embargar.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Calculadora.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Calculadora;
