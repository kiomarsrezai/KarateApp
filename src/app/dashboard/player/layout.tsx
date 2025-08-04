import { MobilePanelSidebarBtn } from "~/components/common/MobilePanelSidebarBtn";
import { PlayerSidebar } from "~/components/seactions/layout/player/PlayerSidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

type PlayerLayoutProps = {
  children: React.ReactNode;
};

const PlayerLayout = ({ children }: PlayerLayoutProps) => {
  return (
    <SidebarProvider>
      <PlayerSidebar />
      <SidebarInset>
        <MobilePanelSidebarBtn />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PlayerLayout;
