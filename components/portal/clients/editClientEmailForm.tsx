import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ring } from "@uiball/loaders";
import { changeEmail } from "apis/client";

import { usePortalStore } from "store/portal";

const schema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

const EditEmailClientForm = ({ client }: any) => {
  const queryClient = useQueryClient();
  const profile = usePortalStore((state) => state.profile);

  useEffect(() => {
    setValue("email", client?.emailaddress);
  }, [client]);

  const { register, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (user: any) => changeEmail(profile.token, client.id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });
    },
  });

  const onSubmit = async (data: any) => {
    const user = { userId: client.id, newEmail: data.email };
    mutation.mutate(user);
  };

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-2 gap-8"
      >
        <div className="col-span-2">
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <div className="mt-1">
            <input
              {...register("email")}
              type="email"
              className="block w-full rounded-md border-gray-200 py-1.5 px-4 focus:border-secondary focus:ring-secondary text-sm text-gray-700"
            />
          </div>
        </div>

        <div className="col-span-2 border-t border-gray-100 pt-4 flex justify-end space-x-4">
          <button
            disabled={mutation.isLoading}
            type="submit"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary w-40 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 disabled:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            {mutation.isLoading ? (
              <div className="py-0.5">
                <Ring size={16} color="#fff" />
              </div>
            ) : (
              "Cambiar email"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmailClientForm;
