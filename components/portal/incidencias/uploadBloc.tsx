import React, { useState } from "react";
import UploadAttachment from "./upload";

const UploadBloc = ({ attachment, setAttachment }: any) => {
  return (
    <UploadAttachment attachment={attachment} setAttachment={setAttachment} />
  );
};

export default UploadBloc;
