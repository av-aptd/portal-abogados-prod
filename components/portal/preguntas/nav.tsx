import React from "react";
import { motion } from "framer-motion";
import { Ring } from "@uiball/loaders";
import { LongArrowRight } from "components/icons";

const Nav = ({ nextStep, loading }: any) => {
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

  const validate = async () => {
    await nextStep();
  };

  return (
    <div className="flex py-4 px-1 justify-end">
      <motion.button
        whileHover="hover"
        disabled={loading}
        onClick={validate}
        type="submit"
        className="flex justify-center items-center rounded-md border border-transparent bg-secondary w-40 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-150"
      >
        {loading ? (
          <Ring size={16} color="#fff" />
        ) : (
          <>
            <p>Siguiente</p>
            <motion.div variants={textMotion}>
              <LongArrowRight className="ml-2 w-4 h-4 text-white" />
            </motion.div>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default Nav;
