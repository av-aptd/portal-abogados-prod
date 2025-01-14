import React from "react";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { EmptyFolder } from "components/icons";
import LoadingContainer from "../loading";

const ParticipantsBloc = ({ participantsQuery }: any) => {
  return (
    <SectionBloc
      title="Participantes"
      description="Información de los participantes del proceso"
    >
      {participantsQuery.isLoading ? (
        <LoadingContainer />
      ) : (
        <>
          {participantsQuery?.data && participantsQuery?.data.length > 0 ? (
            <>
              {participantsQuery?.data.map((participant: any) => (
                <div
                  className="flex justify-between items-center py-2 border-b border-gray-100"
                  key={participant.id}
                >
                  <p className="text-gray-500 text-sm">
                    {participant.role.displayName}
                  </p>
                  <p className="text-gray-700 font-medium text-sm">
                    {participant.name} {participant.surname}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8">
              <EmptyFolder className="text-gray-500 w-10 h-10 mx-auto mb-2" />
              <p className="text-sm text-gray-500 text-center">
                No tiene definido los participantes
              </p>
            </div>
          )}
        </>
      )}
    </SectionBloc>
  );
};

export default ParticipantsBloc;
