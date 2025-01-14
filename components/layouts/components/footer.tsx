import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-100 py-4">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row space-y-10 sm:space-y-0 justify-between items-center px-4 2xl:px-0">
          <img
            src="/footer/logo_confianza-online_footer.svg"
            className="h-14 w-auto"
          />
          <img src="/footer/mj-logo.svg" className="h-14 w-auto" />
          <img src="/footer/logo-icab.svg" className="w-14 h-14" />
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-500 text-sm text-center">
            ©2023 Cormeum Global SL. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
