import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskToTicket } from "apis/tickets";
import { usePortalStore } from "store/portal";
import { Ring } from "@uiball/loaders";
import UploadAttachment from "./upload";
import { useUIStore } from "store/ui";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const schema = z.object({
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const TaskForm = ({ ticketId }: any) => {
  const profile = usePortalStore((state) => state.profile);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [attachment, setAttachment] = useState(null);
  const showModalExtended = useUIStore((state) => state.showModalExtended);
  const [content, setContent] = useState("");

  const taskMutation = useMutation({
    mutationFn: (body: any) =>
      createTaskToTicket(profile.token, ticketId, body),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["tasksByTicket"]);
      setAttachment(null);
      showModalExtended();
    },
  });

  const onSubmitTask = async (data: any) => {
    const body = {
      description: content,
      attachments: [attachment],
    };
    taskMutation.mutate(body);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitTask)} className="space-y-6">
      <div>
        <div className="mt-1">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
      </div>
      <UploadAttachment attachment={attachment} setAttachment={setAttachment} />
      <button
        disabled={taskMutation.isLoading}
        type="submit"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary w-40 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 disabled:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
      >
        {taskMutation.isLoading ? (
          <div className="py-0.5">
            <Ring size={16} color="#fff" />
          </div>
        ) : (
          "Crear tarea"
        )}
      </button>
    </form>
  );
};

export default TaskForm;
