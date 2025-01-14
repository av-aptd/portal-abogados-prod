import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { usePreguntasStore } from "store/preguntas";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import { Help, LongArrowRight, Check } from "components/icons";
import { motion } from "framer-motion";
import { useUIStore } from "store/ui";

export enum QuestionType {
  Buttons = "Buttons",
  MultipleChoice = "MultipleChoice",
  DropDown = "DropDown",
  Text = "Text",
  TextSymbol = "TextSymbol",
  MultiText = "MultiText",
  Radio = "Radio",
}

interface IAnswerOption {
  label: string;
  value: string | number;
}

interface QuestionProps {
  title: string;
  description?: string;
  initial?: any;
  size?: string;
  type: QuestionType;
  options?: IAnswerOption[];
  symbol?: string;
  nextStep?: () => void;
}

const Question = ({
  title,
  description,
  initial,
  type,
  size,
  options,
  symbol,
  nextStep,
}: QuestionProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const setAnswer = usePreguntasStore((state) => state.setAnswer);
  const optionsSelected = usePreguntasStore((state) => state.options);
  const addOption = usePreguntasStore((state) => state.addOption);
  const removeOption = usePreguntasStore((state) => state.removeOption);
  const showHelpModal = useUIStore((state) => state.showHelpModal);

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

  const setActualAnswer = (value: any) => {
    setSelected(value);
    setAnswer({ title, selected: value });
  };

  const setOptions = (option: any) => {
    if (optionsSelected.includes(option)) {
      removeOption(option);
    } else {
      addOption(option);
    }
    const optionsStr = optionsSelected.join("|");
    setAnswer({ title, selected: optionsStr });
  };

  useEffect(() => {
    if (initial) {
      setSelected(initial);
      setAnswer({ title, selected: initial });
    }
  }, [initial]);

  return (
    <ComplexSectionBloc>
      <HeaderSection title={title} hasActions>
        <button
          className="text-gray-500 flex justify-center items-center"
          onClick={() => showHelpModal()}
        >
          <Help className="w-7 h-7 text-gray-400 inline-block shrink-0" />
        </button>
      </HeaderSection>
      <BodySection>
        <div>
          {description && (
            <p className="text-gray-500 text-sm">{description}</p>
          )}
          {type === QuestionType.Buttons && (
            <div className="flex flex-col space-y-4 pt-8 items-stretch w-96">
              {options?.map((option) => (
                <div
                  key={option.value}
                  className={clsx(
                    "py-1 rounded-lg inline-flex justify-center cursor-pointer hover:bg-secondary hover:text-white w-auto items-center relative duration-150 px-16",
                    selected === option.value
                      ? "bg-secondary text-white duration-150"
                      : "bg-gray-200"
                  )}
                  onClick={() => setActualAnswer(option.value)}
                >
                  {option.label}{" "}
                  {selected === option.value && (
                    <Check className="absolute w-5 h-5 text-white right-2" />
                  )}
                </div>
              ))}
            </div>
          )}

          {type === QuestionType.Text && (
            <div>
              <div className="pt-8">
                {size === "large" ? (
                  <textarea
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                    onChange={(e) => setActualAnswer(e.target.value)}
                    defaultValue={initial}
                  />
                ) : (
                  <input
                    className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                    onChange={(e) => setActualAnswer(e.target.value)}
                    type="text"
                    defaultValue={initial}
                  />
                )}
              </div>
            </div>
          )}

          {type === QuestionType.TextSymbol && (
            <div className="pt-4">
              <div className="relative mt-1 rounded-md shadow-sm max-w-lg">
                <input
                  onChange={(e) => setActualAnswer(e.target.value)}
                  type="text"
                  defaultValue={initial}
                  className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                  placeholder="0"
                  aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    {symbol}
                  </span>
                </div>
              </div>
            </div>
          )}

          {type === QuestionType.MultipleChoice && (
            <div className="sm:col-span-2 mt-4">
              <div className="max-w-2xl space-y-4">
                {options?.map((option) => (
                  <div className="relative flex items-start" key={option.value}>
                    <div className="flex h-5 items-center">
                      <input
                        name="ckOption"
                        type="checkbox"
                        value={option.value}
                        onChange={(e) => setOptions(e.target.value)}
                        className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === QuestionType.Radio && (
            <div className="sm:col-span-2">
              <div className="max-w-2xl">
                <div className="mt-4 space-y-4">
                  {options?.map((option) => (
                    <div className="flex items-center" key={option.value}>
                      <input
                        name="ckOption"
                        type="radio"
                        value={option.value}
                        onChange={(e) => setActualAnswer(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <label
                        htmlFor="push-everything"
                        className="ml-3 block text-gray-500"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {type === QuestionType.MultiText && (
            <div className="grid sm:grid-cols-2 gap-8 pt-8">
              {options?.map((option) => (
                <div key={option.value}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {option.label}
                  </label>
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
                    onChange={(e) => setActualAnswer(e.target.value)}
                    type="text"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex space-x-4 pt-4 border-t mt-16 justify-end">
          <motion.button
            whileHover="hover"
            type="button"
            onClick={nextStep}
            className="inline-flex items-center rounded-md border border-transparent bg-secondary px-8 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-150"
          >
            Siguiente
            <motion.div variants={textMotion}>
              <LongArrowRight className="ml-2 w-4 h-4 text-white" />
            </motion.div>
          </motion.button>
        </div>
      </BodySection>
    </ComplexSectionBloc>
  );
};

export default Question;
