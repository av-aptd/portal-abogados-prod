import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Activo from "./components/activo";
import ActivoModal from "./components/activos/pensionesModal";
import InmuebleModal from "./components/activos/inmuebleModal";
import CarModal from "./components/activos/cocheModal";
import PensionesModal from "./components/activos/pensionesModal";
import OtroModal from "./components/activos/otroModal";
import { usePreguntasStore } from "store/preguntas";
import { usePortalStore } from "store/portal";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import Nav from "../nav";
import { Help } from "components/icons";
import { useUIStore } from "store/ui";

const help = [
  `<p>Marca los activos que tienes en propiedad.</p>
  <p>Marca también el activo en caso de tener solamente un porcentaje de la propiedad, ya sea porque compartes la vivienda o el local con otra persona. Marca también el activo si la vivienda está fuera de España.</p>
  <p>En el caso del coche, es importante revisar que el vehículo está realmente a tu nombre, sobre todo en caso de renting o leasing. Revísalo por favor en tu permiso de circulación.</p>
`,
];

const EligeActivosQuePosees = () => {
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const profile = usePortalStore((state) => state.profile);
  const showModal: any = usePreguntasStore((state) => state.showModal);
  const setHelp = useUIStore((state) => state.setHelp);
  const showHelpModal = useUIStore((state) => state.showHelpModal);

  useEffect(() => {
    setHelp(help);
  }, []);

  const activos = [
    {
      name: "Vivienda habitual",
      value: "vivienda-habitual",
    },
    {
      name: "Segunda vivienda",
      value: "segunda-vivienda",
    },
    {
      name: "Local",
      value: "local",
    },
    {
      name: "Suelo",
      value: "suelo",
    },
    {
      name: "Parking",
      value: "parking",
    },
    {
      name: "Coche",
      value: "coche",
    },
    {
      name: "Plan de pensiones",
      value: "plan-de-pensiones",
    },
    {
      name: "Otro activo",
      value: "otro",
    },
  ];

  const [activoName, setActivoName] = useState<string>("");
  const [userActivos, setUserActivos] = useState<any[]>([]);

  const nextStep = () => {
    for (let i = 0; i < userActivos.length; i++) {
      insertAnswer({
        userId: profile.id,
        groupValue: "Elige los activos que posees",
        groupKey: `activo-${i + 1}`,
        groupNextKey: "erestitulardetcuentasbancarias",
        properties: [
          {
            propertyKey: "activo",
            propertyValue: JSON.stringify(userActivos[i]),
          },
        ],
      });
    }

    setCurrentQuestion("erestitulardetcuentasbancarias");
  };

  const openActivo = () => {
    showModal();
  };

  const deleteActivo = (activo: any) => {
    setUserActivos(userActivos.filter((c) => c !== activo));
  };

  return (
    <ComplexSectionBloc>
      <HeaderSection title="Elige los activos que posees" hasActions>
        <button
          className="text-gray-500 flex justify-center items-center"
          onClick={() => showHelpModal()}
        >
          <Help className="w-7 h-7 text-gray-400 inline-block shrink-0" />
        </button>
      </HeaderSection>
      <BodySection>
        <div className="flex space-x-4 items-center mt-8">
          <div className="flex-1 max-w-lg">
            <label
              htmlFor="activo"
              className="block text-sm font-medium text-gray-900"
            >
              Tipo de activo
            </label>
            <select
              id="activo"
              name="activo"
              value={activoName}
              onChange={(e) => setActivoName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
            >
              <option value="">Seleccionar</option>
              {activos.map((activo: any) => (
                <option key={activo.value} value={activo.name}>
                  {activo.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              openActivo();
            }}
            type="button"
            className="mt-5 inline-flex items-center rounded-md border border-transparent bg-secondary px-6 py-2.5 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Añadir
          </button>
        </div>
        <div className="mt-8">
          {userActivos.map((activo) => (
            <Activo
              key={activo.name}
              activo={activo}
              deleteActivo={() => deleteActivo(activo)}
            />
          ))}
        </div>

        {/* <ActivoModal
        name={activoName}
        setUserActivos={setUserActivos}
        userActivos={userActivos}
      /> */}
        {(activoName == "Vivienda habitual" ||
          activoName == "Segunda vivienda" ||
          activoName == "Local" ||
          activoName == "Suelo" ||
          activoName == "Parking") && (
          <InmuebleModal
            name={activoName}
            setUserActivos={setUserActivos}
            userActivos={userActivos}
          />
        )}

        {activoName == "Coche" && (
          <CarModal
            name={activoName}
            setUserActivos={setUserActivos}
            userActivos={userActivos}
          />
        )}

        {activoName == "Plan de pensiones" && (
          <PensionesModal
            name={activoName}
            setUserActivos={setUserActivos}
            userActivos={userActivos}
          />
        )}

        {activoName == "Otro activo" && (
          <OtroModal
            name={activoName}
            setUserActivos={setUserActivos}
            userActivos={userActivos}
          />
        )}

        <Nav nextStep={nextStep} />
      </BodySection>
    </ComplexSectionBloc>
  );
};

export default EligeActivosQuePosees;
