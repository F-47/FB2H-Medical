import { Outlet } from "react-router";
import Footer from "@/components/global/footer";
import Header from "@/components/global/header";

function MainLayout() {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
