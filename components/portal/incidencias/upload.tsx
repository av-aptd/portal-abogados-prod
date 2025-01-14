import React from "react";
import { useMutation } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";
import { Check, Upload } from "components/icons";
import { uploadAttachment } from "apis/tickets";
import { Ring } from "@uiball/loaders";

const UploadAttachment = ({ attachment, setAttachment }: any) => {
  const profile = usePortalStore((state) => state.profile);

  const mutation = useMutation({
    mutationFn: ({ formData }: any) =>
      uploadAttachment(profile.token, formData),
    onSuccess: (data) => {
      setAttachment(data);
    },
  });

  const uploadDoc = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    mutation.mutate({ formData });
  };

  return (
    <div className="">
      {attachment ? (
        <>
          {mutation.isLoading ? (
            <>
              <div className="bg-white mt-2 w-20 h-20 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-6">
                <Ring color="#19ABE3" size={20} />
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-50/50 mt-2 w-20 h-20 flex justify-center items-center rounded-md border border-gray-300 p-3">
                <div>
                  <div className="flex justify-center">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="mt-2">
            <label
              htmlFor="imageFile"
              className="cursor-pointer bg-white w-20 h-20 flex justify-center items-center rounded-md border border-dashed border-gray-300 p-3"
            >
              <Upload className="w-6 h-6 text-gray-400" />
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                className="sr-only"
                onChange={uploadDoc}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadAttachment;
