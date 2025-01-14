import { usePortalStore } from "store/portal";

export const getReport = async ({ reportName }: any) => {
  const profile = usePortalStore.getState().profile;

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/reporting?report_name=${reportName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
    }
  );
  return await resp.json();
};
