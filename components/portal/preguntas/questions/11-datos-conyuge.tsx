import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import { useForm } from "react-hook-form";
import { usePortalStore } from "store/portal";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import { Help, LongArrowRight } from "components/icons";
import { motion } from "framer-motion";
import { useUIStore } from "store/ui";

const help = [
  `<p>Si durante la contratación nos indicaste que compartes las deudas, aquí te aparecerán los datos de tu cónyuge. Revisa por favor que son correctos.</p>
  <p>Si no aparecen los datos de tu cónyuge, rellena por favor las casillas indicadas.</p>
`,
];

const DatosConyuge = () => {
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const profile = usePortalStore((state) => state.profile);
  const setHelp = useUIStore((state) => state.setHelp);
  const showHelpModal = useUIStore((state) => state.showHelpModal);

  useEffect(() => {
    setHelp(help);
  }, []);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    insertAnswer({
      userId: profile.id,
      groupValue: "Pon los datos del conyuge",
      groupKey: "datosconyuge",
      groupNextKey: "fechamatrimonio",
      properties: [
        {
          propertyKey: "name",
          propertyValue: data.name,
        },
        {
          propertyKey: "surname",
          propertyValue: data.surname,
        },
        {
          propertyKey: "dni",
          propertyValue: data.dni,
        },
        {
          propertyKey: "email",
          propertyValue: data.email,
        },
        {
          propertyKey: "phone",
          propertyValue: data.phone,
        },
      ],
    });

    setCurrentQuestion("fechamatrimonio");
  };

  return (
    <ComplexSectionBloc>
      <HeaderSection title="Pon los datos del cónyuge" hasActions>
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <div className="mt-1">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="surname"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido
              </label>
              <div className="mt-1">
                <input
                  {...register("surname", { required: true })}
                  type="text"
                  name="surname"
                  id="surname"
                  className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="dni"
                className="block text-sm font-medium text-gray-700"
              >
                DNI
              </label>
              <div className="mt-1">
                <input
                  {...register("dni", { required: true })}
                  type="text"
                  name="dni"
                  id="dni"
                  className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <div className="mt-1">
                <input
                  {...register("phone", { required: true })}
                  type="text"
                  name="phone"
                  id="phone"
                  className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                />
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

export default DatosConyuge;
