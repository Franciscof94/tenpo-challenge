import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <ScrollToTopButton />
    </div>
  );
};

export default PrivateLayout;
