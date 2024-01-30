import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";

export const Layout = () => {
  return (
    <>
      {/* <Nav /> */}
      <div className={`antialiased bg-gray-900 text-gray-200 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};
