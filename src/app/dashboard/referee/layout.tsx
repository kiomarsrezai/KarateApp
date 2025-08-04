import { MobilePanelSidebarBtn } from "~/components/common/MobilePanelSidebarBtn";
import { RefereeSidebar } from "~/components/seactions/layout/referee/RefereeSidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

type RefereeLayoutProps = {
  children: React.ReactNode;
};

const RefereeLayout = ({ children }: RefereeLayoutProps) => {
  return (
    <SidebarProvider>
      <RefereeSidebar />
      <SidebarInset>
        <MobilePanelSidebarBtn />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RefereeLayout;
