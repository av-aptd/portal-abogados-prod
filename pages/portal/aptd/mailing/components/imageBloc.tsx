import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getSettingsSecureDocument, getSettingsSecure } from "shared/helpers";
import { usePortalStore } from "store/portal";

const ImageBloc = ({ setComponents, setCurrentComponent }: any) => {
  const profile = usePortalStore((state) => state.profile);
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    setComponents((components: any) => [
      ...components,
      {
        componentType: "image",
        imageUrl: imageUrl,
        imageLink: data.imageLink,
        imageAlt: data.imageAlt,
      },
    ]);
    reset();
    setCurrentComponent(null);
  };

  const uploadImage = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    console.log(formData);
    const url = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/upload-file`,
      getSettingsSecureDocument("POST", profile.token, formData)
    );

    const response = await url.json();
    setImageUrl(response.url);
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="mt-2 mb-4">
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
                htmlFor="imageFile"
                className="relative cursor-pointer rounded-md bg-white font-medium text-secondary focus-within:outline-none hover:text-blue-600"
              >
                <span>Subir documento</span>
                <input
                  id="imageFile"
                  name="imageFile"
                  type="file"
                  className="sr-only"
                  accept="image/*,.pdf"
                  onChange={uploadImage}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">Hasta 50MB</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="imageLink"
            className="block text-sm font-medium text-gray-700"
          >
            Link imagen
          </label>
          <div className="mt-1">
            <input
              {...register("imageLink", { required: true })}
              id="imageLink"
              name="imageLink"
              type="text"
              className="block border-gray-300 w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="imageAlt"
            className="block text-sm font-medium text-gray-700"
          >
            Alt imagen
          </label>
          <div className="mt-1">
            <input
              {...register("imageAlt", { required: true })}
              id="imageAlt"
              name="imageAlt"
              type="text"
              className="block border-gray-300 w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-gray-400 py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
        >
          guardar
        </button>
      </form>
    </div>
  );
};

export default ImageBloc;
