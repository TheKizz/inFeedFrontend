import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { ResponsiveNotReady } from "./ResponsiveNotReady";
import { Background } from "./Background";

export const Layout = () => {
  return (
    <>
      {/* <Background /> */}
      <div className="flex flex-col container py-5 animate-slide-in-top">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      {/* <div className="flex min-h-screen items-center justify-center md:hidden">
        <ResponsiveNotReady />
      </div> */}
    </>
  );
};
