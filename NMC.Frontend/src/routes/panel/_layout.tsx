import { Link, Outlet, createFileRoute, useMatch } from '@tanstack/react-router'
import { API } from '@/main'
import { Badge } from '@/components/ui/badge'

const sysInfoQueryOptions = queryOptions({
  queryKey: ['sysInfo'],
  queryFn: async () => {
    return (await API.get("/system/info")).data
  },
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchInterval: 5000
})

export const Route = createFileRoute('/panel/_layout')({
  component: LayoutComponent,
  loader: (c) => {
    const { queryClient } = c.context;
    return queryClient.ensureQueryData(sysInfoQueryOptions);
  }
})

import { GalleryVerticalEnd } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useState } from 'react'
import { queryOptions, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

const data = {
  navMain: [
    {
      title: 'Server Management',
      url: '/panel/servers',
      items: [
        {
          title: 'Servers',
          url: '/panel/servers',
        },
      ],
    },
  ],
}

export default function LayoutComponent() {
  const [title, setTitle] = useState('NMC')
  const sysInfoQuery = useSuspenseQuery(sysInfoQueryOptions);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">NMC</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url} activeProps={{"data-active": true}}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {title}
          <div className="ml-auto px-3">
            {
              sysInfoQuery.isSuccess &&
              <>
                <Badge variant="outline" className={"mx-1"}>{ sysInfoQuery.data.machineName }</Badge>
                <Badge variant="outline" className={"mx-1"}>{ sysInfoQuery.data.cpuLoad }</Badge>
                <Badge variant={sysInfoQuery.data.dockerIsRunning ? "default" : "destructive"} className={"mx-1"}>{sysInfoQuery.data.dockerIsRunning ? "Running" : "Stopped"}</Badge>
              </>
            }
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
