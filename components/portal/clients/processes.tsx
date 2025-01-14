import SectionBloc from "components/layouts/components/section/sectionBloc";
import React from "react";
import LoadingContainer from "../loading";
import { useUIStore } from "store/ui";
import { usePortalStore } from "store/portal";
import Link from "next/link";
import { useRouter } from "next/router";

const ProcessesBloc = ({ userProcessesQuery }: any) => {
  const showModalExtended = useUIStore((state) => state.showModalExtended);
  const setTypeModal = useUIStore((state) => state.setTypeModal);
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();

  const changePlan = () => {
    setTypeModal("changePlan");
    showModalExtended();
  };

  return (
    <>
      <SectionBloc
        title="Procesos"
        description="Listado de todos los procesos del cliente"
      >
        {userProcessesQuery.isLoading ? (
          <LoadingContainer />
        ) : (
          <>
            {userProcessesQuery.data &&
              userProcessesQuery.data.map((process: any) => (
                <Link
                  href={`/portal/aptd/clientes/${router.query.id}/expedientes/${process.id}/informacion`}
                  className="border p-4 rounded-lg flex justify-between items-start mb-4"
                  key={process.id}
                >
                  <div>
                    <p className="text-gray-500 text-sm">
                      {process.processname}
                    </p>
                    <p className="text-gray-700 font-medium text-sm">
                      Plan {process.planName}
                    </p>
                  </div>

                  <p className="text-gray-700 font-medium">
                    {process.contractprice.toLocaleString("es-AR")}€
                  </p>
                </Link>
              ))}
          </>
        )}

        {/* {showImpersonate(profile) && (
          <div>
            <button
              onClick={changePlan}
              className="text-white bg-secondary text-sm w-40 flex justify-center items-center py-2 rounded-md"
            >
              Cambiar de plan
            </button>
          </div>
        )} */}
      </SectionBloc>
    </>
  );
};

export default ProcessesBloc;
