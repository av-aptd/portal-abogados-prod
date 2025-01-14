var xlsx = require("xlsx");
import { Check } from "components/icons";
import { useState } from "react";
import useAutorizacionStore from "store/procesal/autorizacionStore";

export default function ExcelUploader() {
  const [file, setFile] = useState<any>();
  const [name, setName] = useState<string>("");
  const setAutorizaciones = useAutorizacionStore(
    (state) => state.setAutorizaciones
  );

  const uploadExcel = (e: any) => {
    e.preventDefault();

    setName(e.target.files[0].name);

    var reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet);
      console.log(json);
      setFile(json);
      setAutorizaciones(json);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
    setFile(reader);
  };

  return (
    <div className="">
      <div className="">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Excel a subir
        </label>

        {file ? (
          <>
            <div className="bg-white mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-6">
              <div>
                <div className="flex justify-center pb-2">
                  <Check className="h-12 w-12 text-green-400" />
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  Excel subido correctamente
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-2">
              <div className="bg-white flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="excel"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 hover:text-blue-600"
                    >
                      <span>Subir documento de excel</span>
                      <input
                        id="excel"
                        name="excel"
                        type="file"
                        className="sr-only"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={uploadExcel}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">Hasta 50MB</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
