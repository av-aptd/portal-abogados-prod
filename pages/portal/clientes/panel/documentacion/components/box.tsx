import React from "react";
import { Check, Pending, Warning, Help } from "components/icons";
import clsx from "clsx";

import { useUIStore } from "store/ui";
import ChipStatus from "./chip";

const BoxDocument = ({ showModalUpload, filesUploaded, docType }: any) => {
  const docIncluded = filesUploaded.find(
    (document: any) => document.documentType?.id == docType.docTypeId
  );

  const showHelpModal = useUIStore((state) => state.showHelpModal);
  const setHelp = useUIStore((state) => state.setHelp);

  const setHelpModal = (doc: any) => {
    const moreInfo = `<div><p className="text-gray-200">Podrás encontrar más información en <a
    href=${doc.url}
    target="_blank"
    rel="noopener"
    className="text-xs text-secondary"
  >
    link
  </a></p></div>`;

    const totalInfo = doc.helpMessage + moreInfo;

    setHelp(totalInfo);
    showHelpModal();
  };

  const disabledButton = (status: any) => {
    if (status == 0 || status == 1) {
      return true;
    }
    return false;
  };

  return (
    <>
      {docType.minDocsRequired > 1 ? (
        <>
          <div className="px-4 py-2 mb-4 border rounded-lg bg-gray-50">
            <div className="mb-2">
              <div className="flex items-center justify-center md:justify-start space-x-2 pb-2 md:pb-0">
                <p className="text-xs md:text-sm font-medium">{docType.name}</p>
                {docType.helpMessage != null && (
                  <button onClick={() => setHelpModal(docType)}>
                    <Help className="w-5 h-5 text-gray-400 inline-block" />
                  </button>
                )}
              </div>
            </div>

            <>
              {[...Array(docType.minDocsRequired)].map((_, index) => (
                <>
                  <div
                    key={index}
                    className="px-4 py-2 mb-4 border rounded-lg grid lg:grid-cols-5 items-center bg-white"
                  >
                    <div className="md:col-span-3 pr-4">
                      <div className="flex items-center justify-center md:justify-start space-x-2 pb-2 md:pb-0">
                        <p className="text-xs md:text-sm text-gray-500">
                          {docType.name} - {index + 1}
                        </p>
                      </div>

                      {docIncluded?.status == 2 && (
                        <p className="text-xs text-red-500 pt-1 md:pt-0 text-center md:text-left pb-2 md:pb-0">
                          Motivo del rechazo: {docIncluded.status_reason}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <ChipStatus
                        filesUploaded={filesUploaded}
                        docType={docType}
                        index={index}
                      />
                    </div>
                    <div className="flex justify-end mt-4 md:mt-0">
                      <button
                        type="button"
                        // disabled={disabledButton(docIncluded?.status)}
                        onClick={() =>
                          showModalUpload(
                            `${docType.name} - ${index + 1}`,
                            docType.docTypeId
                          )
                        }
                        className={clsx(
                          "rounded-lg px-4 py-1.5 bg-gray-700 w-full md:w-auto disabled:opacity-20"
                        )}
                      >
                        <p className="text-xs text-white">subir documento</p>
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </>
          </div>
        </>
      ) : (
        <div className="px-4 py-2 mb-4 border rounded-lg grid lg:grid-cols-5 items-center bg-gray-50">
          <div className="md:col-span-3 pr-4">
            <div className="flex items-center justify-center md:justify-start space-x-2 pb-2 md:pb-0">
              <p className="text-xs md:text-sm font-medium">{docType.name}</p>
              {docType.helpMessage != null && (
                <button onClick={() => setHelpModal(docType)}>
                  <Help className="w-5 h-5 text-gray-400 inline-block" />
                </button>
              )}
            </div>

            {docIncluded?.status == 2 && (
              <p className="text-xs text-red-500 pt-1 md:pt-0 text-center md:text-left pb-2 md:pb-0">
                Motivo del rechazo: {docIncluded.status_reason}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            {docIncluded?.status != 0 &&
              docIncluded?.status != 1 &&
              docIncluded?.status != 2 && (
                <div
                  className={clsx(
                    "px-2 py-1 bg-gray-200 rounded-full inline-block"
                  )}
                >
                  <h3 className="text-xs text-center text-gray-700">
                    Pendiente de subir
                  </h3>
                </div>
              )}
            {docIncluded?.status == 0 && (
              <div
                className={clsx(
                  "px-2 py-1 bg-yellow-100 rounded-full inline-flex items-center space-x-2"
                )}
              >
                <Pending className="w-5 h-5 text-yellow-700" />
                <h3 className="text-xs text-center text-yellow-800">
                  En revisión
                </h3>
              </div>
            )}
            {docIncluded?.status == 1 && (
              <div
                className={clsx(
                  "px-2 py-1 bg-green-100 rounded-full inline-flex items-center space-x-2"
                )}
              >
                <Check className="w-5 h-5 text-green-700" />
                <h3 className="text-xs text-center text-green-800">Aprobado</h3>
              </div>
            )}
            {docIncluded?.status == 2 && (
              <div
                className={clsx(
                  "px-2 py-1 bg-red-100 rounded-full inline-flex items-center space-x-2"
                )}
              >
                <Warning className="w-5 h-5 text-red-700" />
                <h3 className="text-xs text-center text-red-800">Rechazado</h3>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-4 md:mt-0">
            <button
              type="button"
              disabled={disabledButton(docIncluded?.status)}
              onClick={() => showModalUpload(docType.name, docType.docTypeId)}
              className={clsx(
                "rounded-lg px-4 py-1.5 bg-gray-700 w-full md:w-auto disabled:opacity-20"
              )}
            >
              <p className="text-xs text-white">subir documento</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BoxDocument;
