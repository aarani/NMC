import { DataTable } from '@/components/ui/data-table'
import { API } from '@/main'
import { Server } from '@/types/server'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'

export const Route = createLazyFileRoute('/panel/_layout/servers/')({
  component: RouteComponent,
})

export const columns: ColumnDef<Server>[] = [
  {
    id: "icon",
    cell: ({ row }) => {
      return <img src={row.original.thumbnail} className='h-24 w-24'></img>
    }
  },
  {
    accessorKey: "serverId",
    header: "Server Id"
  },
  {
    accessorKey: "serverName",
    header: "Server Name"
  },
  {
    accessorKey: "portNumber",
    header: "Port"
  },
  {
    accessorKey: "status",
    header: "Status"
  },
]

function RouteComponent() {


  const serversQuery = useQuery({
    queryKey: ["servers"],
    queryFn: async () => {
      return (await API.get("/servers")).data as Server[];
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });



  return (
    <>
      {
        serversQuery.isSuccess &&
          <DataTable columns={columns} data={serversQuery.data}></DataTable>
      }
    </>
  )
}
