import Banner from "@/components/banner";
import ConsoleHeader from "@/components/console-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <ConsoleHeader />
      <SidebarProvider>
        <AppSidebar className="" />
        {children}
      </SidebarProvider>
    </div>
  );
}
