import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "./../../../../../_app";
import React, { useState } from "react";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Ring } from "@uiball/loaders";
import { getPlanById, getPlans } from "apis/pricing";
import { usePortalStore } from "store/portal";
import {
  createStripeCustomerId,
  setInitialLead,
  validateLeadByEmail,
} from "apis/leads";
import { formatDate } from "shared/helpers";
import { getUsers } from "apis/users";
import { clientCreationByPayment } from "apis/payments";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import { useUIStore } from "store/ui";
import ListPlans from "components/portal/plans/listPlans";
import { saveAs } from "file-saver";
import { downloadDocById } from "apis/processes";

const AdminToolsNuevaCuenta: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const [filter, setFilter] = useState<any>("");
  const [value, setValue] = useState<any>("");
  const [action, setAction] = useState<any>("crear-cliente");
  const [search, setSearch] = useState<any>("search-lead");
  const [planId, setPlanId] = useState<any>(null);
  const showModalExtended: any = useUIStore((state) => state.showModalExtended);

  const [operator, setOperator] = useState("neq");
  const [limit, setLimit] = useState(100);
  const [group, setGroup] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const leadMutation = useMutation({
    mutationFn: async (data) => createLead(data),
  });

  const clientMutation = useMutation({
    mutationFn: async (data) => createClient(data),
  });

  const planQuery = useQuery(
    ["plan", planId],
    () => getPlanById(profile.token, planId),
    {
      enabled: !!planId,
    }
  );

  var queryParams = `group=${group}&op=${operator}&limit=${limit}&page=${currentPage}`;

  const userQuery = useQuery({
    queryKey: ["usersListAPTD", queryParams],
    queryFn: async () =>
      getUsers(profile.token, "group=1&op=neq&limit=100&page=1"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const emailLead = watch("emailUser");

  const leadQuery = useQuery(
    ["leadInfo", emailLead],
    () => validateLeadByEmail(emailLead),
    {
      enabled: !!emailLead,
    }
  );

  const onSubmit = async (data: any) => {
    if (action == "crear-lead-conyuge") {
      leadMutation.mutate(data);
    }
    if (action == "crear-cliente") {
      clientMutation.mutate(data);
    }
  };

  const descargarDocumento = async (processId: number, docId: number) => {
    const docToDownload = await downloadDocById(
      profile.token,
      processId,
      docId
    );

    saveAs(docToDownload.data, docToDownload.name);
  };

  const createLead = async (data: any) => {
    // if (leadQuery?.data?.lead != null) {
    if (action == "crear-lead-conyuge") {
      const body = JSON.stringify({
        email: data.email,
        name: data.first_name,
        surname: data.last_name,
        phone: data.phone,
        dni: data.dni,
        parentLeadId: leadQuery?.data?.lead ? leadQuery?.data?.lead.id : null,
        source: "Estudio económico",
        leadType: "Persona",
        comercialId: data.comercialId,
      });

      await setInitialLead(body);
    } else {
      const body = JSON.stringify({
        email: data.email,
        name: data.first_name,
        surname: data.last_name,
        phone: data.phone,
        dni: data.dni,
        parentLeadId: leadQuery?.data?.lead ? leadQuery?.data?.lead.id : null,
        source: "Estudio económico",
        leadType: "Persona",
        comercialId: data.comercialId,
      });
      await setInitialLead(body);
    }
    // } else {
    //   alert("No se ha encontrado el parent");
    // }
  };

  const createClient = async (data: any) => {
    const payload = {
      customerStripeId: leadQuery.data.lead.id,
      planId: planId,
      comercialId: data.comercialId,
    };

    console.log("lead Id:", leadQuery.data.lead.id);

    await clientCreationByPayment(
      leadQuery.data.lead.id,
      payload,
      "bankTransfer"
    );
  };

  const setPlan = (planId: any) => {
    setPlanId(planId);
    showModalExtended();
  };

  var queryParams = `searchBy=${""}&searchValue=${""}&limit=1000&page=1`;

  const pricingsQuery = useQuery(["pricings", queryParams], () =>
    getPlans(profile.token, queryParams)
  );

  return (
    <>
      <div className="mt-8">
        <div className="bg-white p-8 rounded-lg border max-w-3xl mx-auto">
          <h1 className="text-center text-primary font-bold text-lg">
            Nueva cuenta
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="col-span-2">
              <label
                htmlFor="emailUser"
                className="block text-sm font-medium text-gray-700"
              >
                Email lead o cliente
              </label>
              <div className="mt-1">
                <input
                  {...register("emailUser", { required: true })}
                  id="emailUser"
                  name="emailUser"
                  type="email"
                  className={clsx(
                    "border-gray-300 block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  )}
                />
              </div>
            </div>
            <div className="col-span-2">
              {emailLead &&
              emailLead.length > 10 &&
              leadQuery?.data?.statusCode === 400 ? (
                <div className="bg-red-100 rop-8 text-center rounded-lg text-red-500 py-2">
                  <p className="text-sm">Lead no existe</p>
                </div>
              ) : (
                <>
                  {leadQuery.isLoading ? (
                    <></>
                  ) : (
                    <div>
                      {leadQuery.data.lead != null && (
                        <div className="bg-gray-50 p-4 text-sm border rounded-lg mb-4">
                          <p className="font-bold text-lg text-gray-700">
                            Info lead
                          </p>
                          <div className="flex justify-between">
                            <p>{leadQuery.data.lead.name}</p>
                            <p>{leadQuery.data.lead.surname}</p>
                            <p>{leadQuery.data.lead.email}</p>
                            <p>{leadQuery.data.lead.phone}</p>
                            <p>{leadQuery.data.lead.dni}</p>
                          </div>
                        </div>
                      )}

                      {leadQuery.data.childLead != null && (
                        <div className="bg-gray-50 p-4 text-sm border rounded-lg mb-4">
                          <p className="font-bold text-lg text-gray-700">
                            Info child
                          </p>
                          <div className="flex justify-between">
                            <p>{leadQuery.data.childLead.name}</p>
                            <p>{leadQuery.data.childLead.surname}</p>
                            <p>{leadQuery.data.childLead.email}</p>
                            <p>{leadQuery.data.childLead.phone}</p>
                            <p>{leadQuery.data.childLead.dni}</p>
                          </div>
                        </div>
                      )}

                      {leadQuery.data.parentLead != null && (
                        <div className="bg-gray-50 p-4 text-sm border rounded-lg mb-4">
                          <p className="font-bold text-lg text-gray-700">
                            Info parent
                          </p>
                          <div className="flex justify-between">
                            <p>{leadQuery.data.parentLead.name}</p>
                            <p>{leadQuery.data.parentLead.surname}</p>
                            <p>{leadQuery.data.parentLead.email}</p>
                            <p>{leadQuery.data.parentLead.phone}</p>
                            <p>{leadQuery.data.parentLead.dni}</p>
                          </div>
                        </div>
                      )}

                      {leadQuery.data.survey != null && (
                        <div className="bg-gray-50 p-4 text-sm border rounded-lg mb-4">
                          <p className="font-bold text-lg text-gray-700">
                            Info estudio
                          </p>
                          <div className="flex justify-between">
                            <p>
                              Deuda:{" "}
                              {Number(
                                leadQuery.data.survey.debtValue
                              ).toLocaleString("es-AR")}
                              €
                            </p>
                            <p>
                              Preguntas respondidas:{" "}
                              {leadQuery.data.survey.answers.length}
                            </p>
                          </div>
                        </div>
                      )}
                      {leadQuery.data.user != null && (
                        <div className="bg-gray-50 p-4 text-sm border rounded-lg mb-4">
                          <p className="font-bold text-lg text-gray-700">
                            Info cliente
                          </p>
                          <div className="flex justify-between">
                            <p>{leadQuery.data.user.name}</p>
                            <p>{leadQuery.data.user.surname}</p>
                            <p>{leadQuery.data.user.emailaddress}</p>
                            <p>{leadQuery.data.user.id}</p>
                            <p>{leadQuery.data.user.kmaleonid}</p>
                          </div>
                        </div>
                      )}

                      {leadQuery.data.document_he &&
                        leadQuery.data.document_he.length > 0 && (
                          <>
                            <div className="bg-gray-50 p-4 text-sm border rounded-lg mb-4">
                              <p className="font-bold text-lg text-gray-700">
                                Hoja de encargo
                              </p>
                              {leadQuery.data.document_he.map((he: any) => (
                                <>
                                  {he.processid != null && (
                                    <div className="flex justify-between">
                                      <button
                                        onClick={() =>
                                          descargarDocumento(
                                            he.processid,
                                            he.id
                                          )
                                        }
                                      >
                                        <p className="text-secondary">
                                          {he.name}
                                        </p>
                                      </button>

                                      <p>
                                        {he.clientsigned == "t"
                                          ? "Firmada"
                                          : "Pendiente de firmar"}
                                      </p>
                                    </div>
                                  )}
                                </>
                              ))}
                            </div>
                          </>
                        )}
                      {leadQuery.data.contract != null && (
                        <div className="bg-gray-50 p-4 text-sm border rounded-lg mb-4">
                          <p className="font-bold text-lg text-gray-700">
                            Contrato
                          </p>
                          <div className="flex justify-between">
                            <p>
                              {formatDate(
                                leadQuery.data.contract.created_at,
                                "short",
                                "es"
                              )}
                            </p>
                            <p>{leadQuery.data.contract.category}</p>
                            <p>{leadQuery.data.contract.subscription_type}</p>
                            <p>
                              {Number(
                                leadQuery.data.contract.amount
                              ).toLocaleString("es-AR")}
                              €
                            </p>
                            <p>{leadQuery.data.contract.comercialname}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}{" "}
                </>
              )}
            </div>

            {
              <div className="bg-gray-100 p-2 rounded-lg col-span-2 flex justify-center space-x-4 mb-4">
                <button
                  type="button"
                  className={clsx(
                    action == "crear-lead-conyuge"
                      ? "bg-white rounded-lg shadow text-gray-700 font-bold"
                      : "text-gray-500",
                    "text-sm px-4 py-2"
                  )}
                  onClick={() => setAction("crear-lead-conyuge")}
                >
                  Crear lead cónyuge
                </button>

                <button
                  type="button"
                  className={clsx(
                    action == "crear-cliente"
                      ? "bg-white rounded-lg shadow text-gray-700 font-bold"
                      : "text-gray-500",
                    "text-sm px-4 py-2"
                  )}
                  onClick={() => setAction("crear-cliente")}
                >
                  Crear cliente
                </button>
              </div>
            }

            {action == "crear-lead-conyuge" && (
              <>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre lead cónyuge
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("first_name")}
                      id="first_name"
                      name="first_name"
                      type="text"
                      className={clsx(
                        "border-gray-300 block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apellido lead cónyuge
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("last_name")}
                      id="last_name"
                      name="last_name"
                      type="text"
                      className={clsx(
                        "border-gray-300 block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      )}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email cónyuge
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("email")}
                      id="email"
                      name="email"
                      type="email"
                      className={clsx(
                        "border-gray-300 block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      )}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="dni"
                    className="block text-sm font-medium text-gray-700"
                  >
                    DNI cónyuge
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("dni")}
                      id="dni"
                      name="dni"
                      type="text"
                      className={clsx(
                        "border-gray-300 block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      )}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Teléfono cónyuge
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("phone")}
                      id="phone"
                      name="phone"
                      type="text"
                      className={clsx(
                        "border-gray-300 block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                      )}
                    />
                  </div>
                </div>
              </>
            )}

            {userQuery.isLoading && planQuery.isLoading ? (
              <></>
            ) : (
              <>
                <div className="col-span-2 border rounded-lg p-2">
                  {planId != null && planQuery.data != null && (
                    <>
                      <h3 className="text-center pb-2 text-sm">
                        Plan seleccionado
                      </h3>
                      <div className="flex justify-between items-center text-sm border p-2 mb-4 rounded-lg bg-gray-50 font-semibold">
                        <p className="">
                          {planQuery.data.category}{" "}
                          {planQuery.data.subscription_type}
                        </p>
                        <p className="">
                          <span className="text-gray-500 font-normal">
                            Precio:
                          </span>{" "}
                          {planQuery.data.amount.toLocaleString("es-AR")}€
                        </p>
                        <p className="">
                          <span className="text-gray-500 font-normal">
                            Pago inicial:
                          </span>{" "}
                          {planQuery.data.initial_payment.toLocaleString(
                            "es-AR"
                          )}
                          €
                        </p>
                        <p className="">
                          <span className="text-gray-500 font-normal">
                            Cuotas:
                          </span>{" "}
                          {""}
                          {planQuery.data.total_installments} x{" "}
                          {planQuery.data.installment_amount}€
                        </p>
                        <p>
                          <span className="text-gray-500 font-normal">
                            Mín:
                          </span>{" "}
                          {planQuery.data.import_debt_min.toLocaleString(
                            "es-AR"
                          )}
                          €
                        </p>
                      </div>
                    </>
                  )}
                  <div className=" flex justify-center">
                    <button
                      type="button"
                      className={clsx(
                        " text-gray-500 text-xs w-40 py-2 rounded-md border-gray-300 border flex justify-center items-center bg-white"
                      )}
                      onClick={() => showModalExtended()}
                    >
                      {planQuery.data != null
                        ? "Seleccionar otro plan"
                        : "Seleccionar plan"}
                    </button>
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="planId"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Seleccionar comercial
                  </label>
                  <select
                    {...register("comercialId")}
                    id="comercialId"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  >
                    {userQuery?.data?.users
                      .filter((u: any) => u.isactive == true)
                      .sort((a: any, b: any) => a.name.localeCompare(b.name))
                      .map((user: any) => (
                        <option key={user.id} value={user.AuthId}>
                          {user.name} {user.surname}
                        </option>
                      ))}
                  </select>
                </div>
              </>
            )}

            <div className="pt-4 col-span-2">
              <button
                disabled={leadMutation.isLoading || clientMutation.isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
              >
                {leadMutation.isLoading || clientMutation.isLoading ? (
                  <Ring size={20} color="#fff" />
                ) : (
                  <>
                    {action == "crear-lead-conyuge" && "Crear lead cónyuge"}
                    {action == "crear-cliente" && "Crear cliente"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ModalExtended size="big">
        <ListPlans
          planId={planId}
          setPlanId={setPlan}
          typeList="tool"
          plans={pricingsQuery.data}
        />
      </ModalExtended>
    </>
  );
};

AdminToolsNuevaCuenta.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default AdminToolsNuevaCuenta;
