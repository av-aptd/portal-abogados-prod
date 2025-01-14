import React from "react";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { formatDate } from "shared/helpers";
import LineItem from "../user/lineItem";
import LoadingContainer from "../loading";
import { EmptyFolder } from "components/icons";

const ContractBloc = ({ ContractQuery }: any) => {
  return (
    <SectionBloc
      title="Contrato"
      description="Información del contrato del cliente"
    >
      {ContractQuery.isLoading ? (
        <LoadingContainer />
      ) : (
        <>
          {ContractQuery.data != undefined ? (
            <>
              {ContractQuery.data.contract_price > 0 ? (
                <>
                  <div className="">
                    {ContractQuery.data.contract_date != null && (
                      <LineItem
                        label="Fecha de contrato"
                        value={
                          ContractQuery.data.contract_date != null
                            ? formatDate(
                                ContractQuery.data.contract_date,
                                "short",
                                "es"
                              )
                            : "No definida"
                        }
                      />
                    )}

                    <LineItem
                      label="Precio contrato"
                      value={`${Number(
                        ContractQuery.data.contract_price
                      ).toLocaleString("es-AR")}€`}
                    />
                    <LineItem
                      label="Total Pagado"
                      value={`${Number(
                        ContractQuery.data.total_paid
                      ).toLocaleString("es-AR")}€`}
                    />
                    <LineItem
                      label="Total pendiente"
                      value={`${Number(
                        ContractQuery.data.total_pending
                      ).toLocaleString("es-AR")}€`}
                    />
                    <LineItem
                      label="Cuotas pagadas"
                      value={ContractQuery.data.installments_paid}
                    />
                    <LineItem
                      label="Cuotas pendientes"
                      value={ContractQuery.data.installments_pending}
                    />

                    {ContractQuery.data.installments_pending > 0 && (
                      <>
                        <LineItem
                          label="Próximo pago"
                          value={formatDate(
                            ContractQuery.data.next_installment?.planneddate,
                            "short",
                            "es"
                          )}
                        />
                        <LineItem
                          label="Cantidad cuota"
                          value={`${Number(
                            ContractQuery.data.next_installment?.amount
                          ).toLocaleString("es")}€`}
                        />
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 rounded-lg px-8 py-4">
                  <p className="text-sm text-gray-500 text-center">
                    Contrato de LSO UF sin coste
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8">
              <EmptyFolder className="text-gray-500 w-10 h-10 mx-auto mb-2" />
              <p className="text-sm text-gray-500 text-center">
                Pendiente de firmar la Hoja de Encargo o de hacer el pago
              </p>
            </div>
          )}
          {/* </>
           */}
        </>
      )}
    </SectionBloc>
  );
};

export default ContractBloc;
