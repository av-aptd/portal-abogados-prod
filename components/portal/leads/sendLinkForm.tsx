import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Ring } from "@uiball/loaders";
import { formatDate } from "shared/helpers";
import { editLead, sendEmailToLead } from "apis/leads";
import { getTenants } from "apis/tenants";
import { usePortalStore } from "store/portal";
import { getPrincingsPlan } from "apis/pricing";

const schema = z.object({
  planId: z.string(),
});

type FormData = z.infer<typeof schema>;

const SendLinkForm = ({ lead, type, plans }: any) => {
  const queryClient = useQueryClient();
  const profile = usePortalStore((state) => state.profile);
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const planOptions = plans.filter(
    (plan: any) => plan.tenantid == 1 && plan.is_public == true

    // && plan.category == type
  );

  console.log(planOptions);

  const mutation = useMutation({
    mutationFn: (body: any) => sendEmailToLead(body, profile.token),
    onSuccess: () => {},
  });

  const onSubmit = async (data: any) => {
    const body = {
      email: lead.email,
      message: {
        name: lead.name,
        email: lead.email,
        nameLawyer: dataProfile.name,
        surnameLawyer: dataProfile.surname,
        authId: profile.AuthId,
        showOnline: 0,
        source: "lead",
        tenant: lead.tenant.name,
        planId: data.planId,
        dev: process.env.NEXT_PUBLIC_PLATFORM == "development" ? true : false,
      },
    };

    mutation.mutate(body);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-2 items-center text-sm text-gray-500 py-3">
          <label htmlFor="tenantid" className="block text-sm">
            Estudio económico con plan
          </label>

          <select
            {...register("planId", { required: true })}
            id="planId"
            name="planId"
            className="block w-full max-w-lg rounded-md border-gray-300 focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
          >
            {planOptions.map((plan: any) => (
              <option key={plan.id} value={plan.id}>
                {plan.category} - {plan.subscription_type} -{" "}
                {plan.total_installments} cuotas - {plan.amount}€
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
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
              "Reenviar estudio"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendLinkForm;
