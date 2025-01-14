export const getTranscription = async (idCall: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/qa/calls/${idCall}/transcript`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
  const data = await res.json();
  return data;
};
