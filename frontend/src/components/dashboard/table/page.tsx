import { Url } from "@/lib/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getUrls } from "@/lib/url";

export default function URLTable({ data }: { data: Url[]}) {
  return (
    <div className="mx-auto py-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
