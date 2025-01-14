import React from "react";
import {
  getPropertyValueMap,
  getPropertyValue,
  formatDate,
} from "shared/helpers";

const BienDescription = ({ activo }: any) => {
  const naturalezaType = (activo: any) => {
    return getPropertyValueMap(
      getPropertyValue("naturaleza", activo.propertyValue),
      "naturaleza"
    );
  };

  return (
    <>
      {/* Bien Inmueble */}
      {naturalezaType(activo) == "Bien Inmueble" && (
        <div className="text-gray-500">
          {getPropertyValueMap(
            getPropertyValue("tipoInmueble", activo.propertyValue),
            "tipoInmueble"
          )}{" "}
          en{" "}
          {getPropertyValueMap(
            getPropertyValue("provincia", activo.propertyValue),
            "provincia"
          )}{" "}
          inscrita en el Registro de la Propiedad nº{" "}
          {getPropertyValueMap(
            getPropertyValue("numInscripcion", activo.propertyValue),
            "numInscripcion"
          )}{" "}
          de{" "}
          {getPropertyValueMap(
            getPropertyValue("provincia", activo.propertyValue),
            "provincia"
          )}{" "}
          , libro{" "}
          {getPropertyValueMap(
            getPropertyValue("numLibro", activo.propertyValue),
            "numLibro"
          )}
          , folio{" "}
          {getPropertyValueMap(
            getPropertyValue("folio", activo.propertyValue),
            "folio"
          )}
          , tomo{" "}
          {getPropertyValueMap(
            getPropertyValue("tomo", activo.propertyValue),
            "tomo"
          )}{" "}
          y nº de finca{" "}
          {getPropertyValueMap(
            getPropertyValue("numFinca", activo.propertyValue),
            "numFinca"
          )}
        </div>
      )}
      {/* Bien Mueble */}
      {naturalezaType(activo) == "Bien mueble" && (
        <div className="text-gray-500">
          {getPropertyValueMap(
            getPropertyValue("name", activo.propertyValue),
            "name"
          )}{" "}
          {getPropertyValueMap(
            getPropertyValue("brandVehicle", activo.propertyValue),
            "brandVehicle"
          )}{" "}
          modelo{" "}
          {getPropertyValueMap(
            getPropertyValue("modelVehicle", activo.propertyValue),
            "modelVehicle"
          )}{" "}
          con matrícula{" "}
          {getPropertyValueMap(
            getPropertyValue("licensePlate", activo.propertyValue),
            "licensePlate"
          )}{" "}
          adquirido el{" "}
          {formatDate(
            getPropertyValueMap(
              getPropertyValue("acquisitionDate", activo.propertyValue),
              "acquisitionDate"
            ),
            "short",
            "es"
          )}
          ,{" "}
          {getPropertyValueMap(
            getPropertyValue("reservationTitle", activo.propertyValue),
            "reservationTitle"
          ) == "no"
            ? "sin reserva de título."
            : "con reserva de título."}
        </div>
      )}
      {/* Otro activo */}
      {naturalezaType(activo) == "Otro activo" && (
        <div className="text-gray-500">
          {getPropertyValueMap(
            getPropertyValue("moreDetails", activo.propertyValue),
            "moreDetails"
          )}
        </div>
      )}
    </>
  );
};

export default BienDescription;
