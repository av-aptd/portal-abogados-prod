import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEstudioStore } from "store/estudio";

const EncargoNulidad = ({ onSubmit }: any) => {
  const lead = useEstudioStore((state) => state.lead);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setData();
  }, []);

  const setData = () => {
    setValue("name", lead.name + " " + lead.surname);
    setValue("email", lead.email);
    setValue("phone", lead.phone);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-auto max-w-4xl text-gray-500 bg-white p-8 rounded-lg border text-justify">
        <h2>Nulidad</h2>

        <div className="border-t fixed bottom-0 inset-x-0 bg-white p-4">
          <div className="mx-auto max-w-4xl">
            <button
              type="submit"
              className="bg-secondary text-white rounded px-8 py-3 w-full"
            >
              FIRMAR AHORA
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default EncargoNulidad;
