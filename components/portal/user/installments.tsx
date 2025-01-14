import SectionBloc from "components/layouts/components/section/sectionBloc";
import React from "react";
import { formatDate } from "shared/helpers";
import LineItem from "./lineItem";
import LoadingContainer from "../loading";

const InstallmentsUserInfo = ({ info, loaded }: any) => {
  return (
    <SectionBloc
      title="Contrato"
      description="Información del contrato del cliente"
    >
      {loaded ? (
        <div className="">
          <LineItem
            label="Fecha de contrato"
            value={
              info.contract_date != null
                ? formatDate(info.contract_date, "short", "es")
                : "No definida"
            }
          />
          <LineItem
            label="Precio contrato"
            value={`${Number(info.contract_price).toLocaleString("es-AR")}€`}
          />
          <LineItem
            label="Total Pagado"
            value={`${Number(info.total_paid).toLocaleString("es-AR")}€`}
          />
          <LineItem
            label="Total pendiente"
            value={`${Number(info.total_pending).toLocaleString("es-AR")}€`}
          />
          <LineItem label="Cuotas pagadas" value={info.installments_paid} />
          <LineItem
            label="Cuotas pendientes"
            value={info.installments_pending}
          />
          {/* <LineItem
            label="Último pago"
            value={
              info.last_installment_paid != null
                ? formatDate(info.last_installment_paid, "short", "es")
                : "Ninguna"
            }
          /> */}
          {info.installments_pending > 0 && (
            <>
              <LineItem
                label="Próximo pago"
                value={formatDate(
                  info.next_installment?.planneddate,
                  "short",
                  "es"
                )}
              />
              <LineItem
                label="Cantidad cuota"
                value={`${Number(info.next_installment?.amount).toLocaleString(
                  "es"
                )}€`}
              />
            </>
          )}
        </div>
      ) : (
        <LoadingContainer />
      )}
    </SectionBloc>
  );
};

export default InstallmentsUserInfo;
