import { createLazyFileRoute } from "@tanstack/react-router";

import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "@/main";
import { ImageCard } from "@/components/ui/selectable_card";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DynamicForm from "@/components/ui/dynamic-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute("/panel/_layout/servers/add")({
  component: RouteComponent,
});

interface Variable {
  name: string;
  description: string;
  acceptable_answers: string[];
}

interface TemplateDetails {
  variables: Variable[],
  eula_needed: boolean
}

function RouteComponent() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const templatesQuery = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      return (await API.get("/templates")).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const templateDetailsQuery = useQuery({
    queryKey: ["templates_details", selectedId],
    queryFn: async () => {
      if (selectedId !== null)
        return (await API.get(`/templates/${selectedId}/details`)).data as TemplateDetails;
      else
        return undefined;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  function setTemplate(templateId: string){
    setSelectedId(templateId);
    templateDetailsQuery.refetch();
  }

  const createServerMutation = useMutation({
    mutationFn: () => {
      return API.put('/servers', { template_id: selectedId, variables: formValues });
    },
  })


  return (
    <>
      <div className="p-5">
        <ScrollArea className="py-5 h-96">
          <div className="flex flex-1 flex-col gap-4 p-5">
            <div className="grid auto-rows-min gap-4 md:grid-cols-5">
              {templatesQuery.isSuccess &&
                templatesQuery.data.entries.map((template) => {
                  return (
                    <ImageCard
                      key={template.template_id}
                      imageUrl={template.thumbnail_url}
                      label={template.template_name}
                      isSelected={selectedId === template.template_id}
                      onSelect={() => setTemplate(template.template_id)}
                    />
                  );
                })}
            </div>
          </div>
        </ScrollArea>
        {
          selectedId !== null &&
            <ScrollArea className="py-5">
              <Card>
                <CardHeader>
                  <CardTitle>Configure your server</CardTitle>
                </CardHeader>
                <CardContent>
                <div>
                  <div className="flex gap-4 mb-6">
                    {
                      templateDetailsQuery.isSuccess &&
                      <div className="grid">
                        {
                          templateDetailsQuery.data?.eula_needed &&
                            <>
                              <Alert variant={"destructive"}>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>EULA</AlertTitle>
                                <AlertDescription>
                                  This template requires agreeing to EULA, by creating the server you're agreeing to all applicable EULAs.
                                </AlertDescription>
                              </Alert>
                              <Separator className="my-4"></Separator>
                            </>
                        }
                        <div key="server_name" className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="server_name">Server Name</Label>
                            <Input id="server_name" placeholder="Server Name" value={formValues["server_name"]} onChange={(e) => handleInputChange("server_name", e.target.value)}></Input>
                          </div>
                          <p className="text-sm text-gray-500">Display name for your server (only visible in NMC)</p>
                        </div>

                        <div key="server_port" className="space-y-2">
                          <div className="flex items-center space-x-2">
                          <Label htmlFor="server_port">Server Port</Label>
                            <Input id="server_port" type="number" placeholder="Server Port" value={formValues["server_port"]} onChange={(e) => handleInputChange("server_port", e.target.value)}></Input>
                          </div>
                          <p className="text-sm text-gray-500">TCP port for your sever (should be unique/unused)</p>
                        </div>

                        <DynamicForm variables={templateDetailsQuery.data?.variables!} formValues={formValues} handleInputChange={handleInputChange}></DynamicForm>
                      </div>
                    }
                  </div>
                </div>
                </CardContent>
                <CardFooter>
                  <Button value={"Create"} onClick={() => createServerMutation.mutate()}></Button>
                </CardFooter>
              </Card>
            </ScrollArea>
        }
      </div>
    </>
  );
}
