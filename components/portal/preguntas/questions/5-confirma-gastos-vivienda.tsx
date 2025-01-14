import React, { useEffect } from "react";
import { usePortalStore } from "store/portal";
import { usePreguntasStore } from "store/preguntas";
import { useForm } from "react-hook-form";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import { Help, LongArrowRight } from "components/icons";
import { motion } from "framer-motion";
import { useUIStore } from "store/ui";

const help = [
  `<p>Confirma si pagas hipoteca o vives de alquiler.</p>
  <p>Si pagas <strong>hipoteca</strong> pon el importe que pagas de la cuota mensual.</p>
  <p>Si vives de <strong>alquiler</strong> pon el importe que pagas mensualmente.</p>
`,
];

const ConfirmaGastosVivienda = () => {
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const textMotion = {
    hover: {
      x: 10,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
  };
  const setHelp = useUIStore((state) => state.setHelp);
  const showHelpModal = useUIStore((state) => state.showHelpModal);
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const profile = usePortalStore((state) => state.profile);
  const answers = usePortalStore((state) => state.answers);
  let q: any;
  let r: any;
  let y: any;

  useEffect(() => {
    setHelp(help);
  }, []);

  const { register, handleSubmit, setValue } = useForm();

  if (answers.length > 0) {
    q = answers?.filter(
      (f: any) => f.questionKey == "tieneshipotecavivesdealquiler"
    )[0].selected;
  } else {
    q = "";
  }

  if (
    answers.find((f: any) => f.questionKey == "cuotashipotecaaldia") !=
    undefined
  ) {
    r = answers?.filter((f: any) => f.questionKey == "cuotashipotecaaldia")[0]
      .selected;
  } else {
    r = "";
  }

  if (q == "alquiler") {
    y = answers?.filter((f: any) => f.questionKey == "cuantopagasdealquiler")[0]
      .selected;
  } else {
    if (q == "hipoteca") {
      y = answers?.filter(
        (f: any) => f.questionKey == "cuantopagasdehipoteca"
      )[0].selected;
    } else {
    }
  }

  useEffect(() => {
    setValue("tipoVivienda", q);
    setValue("costeVivienda", y);
  }, [q, y]);

  const options = [
    { label: "Alquiler", value: "alquiler" },
    { label: "Hipoteca", value: "hipoteca" },
  ];

  const onSubmit = async (data: any) => {
    insertAnswer({
      userId: profile.id,
      groupValue: "Confirma la información de tu de vivienda",
      groupKey: "confirmatusgastosvivienda",
      groupNextKey: "confirmatusgastosmensuales",
      properties: [
        {
          propertyKey: "tipoVivienda",
          propertyValue: data.tipoVivienda,
        },
        {
          propertyKey: "costeVivienda",
          propertyValue: data.costeVivienda,
        },
      ],
    });

    if (r != "") {
      insertAnswer({
        userId: profile.id,
        groupValue:
          "¿ Estás al corriente en el pago de las cuotas hipotecarias ?",
        groupKey: "cuotashipotecaaldia",
        groupNextKey: "cualessontusgastostotales",
        properties: [
          {
            propertyKey: "cuotasHipotecaAlDia",
            propertyValue: r,
          },
        ],
      });
    }

    setCurrentQuestion("confirmatusgastosmensuales");
  };

  return (
    <ComplexSectionBloc>
      <HeaderSection
        title="Confirma la información de tus gastos de vivienda"
        hasActions
      >
        <button
          className="text-gray-500 flex justify-center items-center"
          onClick={() => showHelpModal()}
        >
          <Help className="w-7 h-7 text-gray-400 inline-block shrink-0" />
        </button>
      </HeaderSection>
      <BodySection>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="tipoVivienda"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de vivienda
              </label>

              <div className="mt-4 space-y-2">
                {options?.map((option) => (
                  <div className="flex items-center" key={option.value}>
                    <input
                      {...register("tipoVivienda", { required: true })}
                      type="radio"
                      value={option.value}
                      className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                    />
                    <label
                      htmlFor="push-everything"
                      className="ml-3 block font-medium text-gray-500"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="costeVivienda"
                className="block text-sm font-medium text-gray-700"
              >
                Coste vivienda en euros
              </label>
              <div className="relative mt-1 rounded-md shadow-sm w-64">
                <input
                  {...register("costeVivienda", { required: true })}
                  type="text"
                  name="costeVivienda"
                  id="costeVivienda"
                  className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                  placeholder="0"
                  aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    EUROS
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 pt-4 border-t mt-16 justify-end">
            <motion.button
              whileHover="hover"
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-secondary px-8 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-150"
            >
              Siguiente
              <motion.div variants={textMotion}>
                <LongArrowRight className="ml-2 w-4 h-4 text-white" />
              </motion.div>
            </motion.button>
          </div>
        </form>
      </BodySection>
    </ComplexSectionBloc>
  );
};

export default ConfirmaGastosVivienda;
