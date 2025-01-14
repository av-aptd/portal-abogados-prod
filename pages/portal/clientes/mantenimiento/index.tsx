import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "./../../../_app";
import React from "react";
import type { ReactElement } from "react";
import { usePreguntasStore } from "store/preguntas";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Ring } from "@uiball/loaders";
import { LongArrowRight, WelcomeIcon } from "components/icons";
import { usePortalStore } from "store/portal";

const Mantenimiento: NextPageWithLayout = () => {
  const router = useRouter();
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );
  const profile = usePortalStore((state) => state.profile);

  return (
    <div className="mx-auto max-w-3xl py-10 bg-white mt-10 rounded-lg border p-8">
      <div className="mb-4">
        <WelcomeIcon className="w-16 h-16 text-secondary" />
        <h1 className="text-gray-500 py-4">Hola {profile.name},</h1>
        <p className="text-gray-500 pb-2">
          En este momento estamos realizando mantenimiento a nuestro sistema.
        </p>
        <p className="text-gray-500 pb-4">Vuelve a intentarlo más tarde.</p>
      </div>

      {/* <motion.button
        whileHover="hover"
        onClick={start}
        type="submit"
        className="flex justify-center items-center rounded-md border border-transparent bg-secondary w-auto px-8 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-150"
      >
        <p>Empezar las preguntas</p>
        <motion.div variants={textMotion}>
          <LongArrowRight className="ml-2 w-4 h-4 text-white" />
        </motion.div>
      </motion.button> */}
    </div>
  );
};

Mantenimiento.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Mantenimiento;
