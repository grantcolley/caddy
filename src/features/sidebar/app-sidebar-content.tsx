import { Link } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons-react';
import { Module } from '@/shared/models/module';
import type { Icon as TablerIcon } from '@tabler/icons-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

type Props = {
  modules: Module[];
};

function SidebarIcon({ icon: Icon }: { icon?: TablerIcon }) {
  if (!Icon) return null;
  // return <Icon className="mr-2 h-4 w-4 shrink-0" />;
  return <Icon />;
}

export function AppSidebarContent({ modules }: Props) {
  return (
    <>
      {modules.map((module) => (
        <SidebarGroup key={module.moduleId}>
          <SidebarGroupLabel>
            <SidebarIcon icon={module.icon} />
            <span>&nbsp;{module.name}</span>
          </SidebarGroupLabel>
          <SidebarMenu>
            {module.categories.map((category) => (
              <Collapsible
                key={category.categoryId}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={category.name}>
                      <SidebarIcon icon={category.icon} />
                      <span>{category.name}</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {category.pages?.map((page) => (
                        <SidebarMenuSubItem key={page.routeId}>
                          <SidebarMenuSubButton asChild>
                            {/* <Link to={page.fullPath ?? '/'}> */}
                            <Link to={page.fullPath}>
                              <SidebarIcon icon={page.icon} />
                              <span>{page.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
