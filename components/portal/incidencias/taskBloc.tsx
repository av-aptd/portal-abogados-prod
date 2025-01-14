import { downloadAttachmentById } from "apis/tickets";
import { DownloadFile } from "components/icons";
import React from "react";
import { formatDate } from "shared/helpers";
import { usePortalStore } from "store/portal";
import { saveAs } from "file-saver";

const TaskBloc = ({ task }: any) => {
  const profile = usePortalStore((state) => state.profile);

  const downloadAttachment = async (id: number, ticket_id: number) => {
    const doc = await downloadAttachmentById(profile.token, ticket_id, id);
    saveAs(doc.data, doc.name);
  };

  return (
    <div className="border p-2 mb-4 rounded-lg">
      <div className="flex justify-between items-center text-xs pb-1 text-gray-400">
        <p className="text-secondary">{task.created_by_user}</p>
        <p className="">{formatDate(task.created_at, "short", "es")}</p>
      </div>

      <div
        className="pt-0 text-sm text-gray-600"
        dangerouslySetInnerHTML={{
          __html: task?.description,
        }}
      ></div>
      {task.attachments.map((attachment: any) => (
        <div
          key={attachment.id}
          onClick={() =>
            downloadAttachment(attachment.id, attachment.ticket_id)
          }
          className="mt-2"
        >
          <div className="w-10 h-10 rounded-lg border flex justify-center items-center cursor-pointer bg-gray-50">
            <div>
              <DownloadFile className="h-6 w-6 text-gray-600 mx-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBloc;
