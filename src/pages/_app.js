
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const hideLayout = ["/login", "/register"].includes(router.pathname);

  return (
    <SessionProvider session={session}>
      {hideLayout ? (
        <Component {...pageProps} />
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="overflow-y-auto h-full">
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      )}
       <ToastContainer position="top-right" autoClose={3000}   hideProgressBar={false} newestOnTop={false} pauseOnFocusLoss closeOnClick draggable pauseOnHover theme="dark" limit={3} />
    </SessionProvider>
  );
}
