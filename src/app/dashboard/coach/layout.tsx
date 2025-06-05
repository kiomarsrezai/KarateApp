import { CoachSidebar } from "~/components/seactions/layout/coach/CoachSidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

type PlayerLayoutProps = {
  children: React.ReactNode;
};

const CoachLayout = ({ children }: PlayerLayoutProps) => {
  return (
    <SidebarProvider>
      <CoachSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default CoachLayout;
