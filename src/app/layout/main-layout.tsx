import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/features/sidebar/app-sidebar';
import { AppSidebarHeader } from '@/features/sidebar/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const MainLayout = () => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <AppSidebarHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
