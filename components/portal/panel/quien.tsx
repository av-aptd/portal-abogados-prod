import { useQuery } from "@tanstack/react-query";
import { getParticipants } from "apis/client";
import { Quien } from "components/icons";
import Image from "next/image";
import React, { useState } from "react";
import { usePortalStore } from "store/portal";

const QuienPanel = ({ procesos }: any) => {
  const [re, setRE] = useState<any>([]);
  const profile = usePortalStore((state) => state.profile);

  const participantsQuery = useQuery(
    ["participants"],
    () => getParticipants(profile.token, procesos.data[0].id),
    {
      enabled: !!procesos.data,
      onSuccess(data) {
        if (data.statusCode == 500) {
          setRE({
            name: "No hay responsable",
            surname: "",
            avatar: "",
          });
        } else {
          const userRE = data?.filter(
            (item: any) => item.role.name === "ResponsibleForSuccess"
          );
          setRE(userRE[0]);
        }
      },
    }
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b flex justify-between items-center p-4 bg-gray-50">
        <div className="flex space-x-2 items-center">
          <Quien className="w-6 h-6 text-gray-400" />
          <h3 className="text-gray-700">Quien lleva mi caso</h3>
        </div>
      </div>
      <div className="p-4">
        {participantsQuery.isLoading ? (
          <p className="px-8 text-gray-500 text-sm">Cargando responsable...</p>
        ) : (
          <>
            {re && (
              <div className="flex justify-between items-center space-x-4">
                <div>
                  {re.avatar ? (
                    <>
                      <Image
                        src={re.avatar}
                        width={48}
                        height={48}
                        alt="Abogado responsable"
                        className="rounded-full"
                      />
                    </>
                  ) : (
                    <div className="bg-gray-100 w-12 h-12 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 text-sm">
                  <h3 className="text-gray-700 font-medium">
                    {re.name} {re.surname}
                  </h3>
                  <p className="text-gray-400">Responsable de éxito</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuienPanel;
