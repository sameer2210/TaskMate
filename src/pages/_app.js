import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="p-6 overflow-y-auto flex-1">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}
