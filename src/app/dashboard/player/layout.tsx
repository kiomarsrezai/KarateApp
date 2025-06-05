import { PlayerSidebar } from "~/components/seactions/layout/player/PlayerSidebar";
import { SidebarProvider } from "~/components/ui/sidebar";

const PlayerLayout = () => {
  return (
    <SidebarProvider>
      <PlayerSidebar />
    </SidebarProvider>
  );
};

export default PlayerLayout;
