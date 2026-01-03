import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "./Header";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header toggle={() => setOpen(!open)} />
      <Sidebar isOpen={open} close={() => setOpen(false)} />

      <main
        style={{
          marginTop: "56px",
          marginLeft: open ? "240px" : "0",
          transition: "margin-left 0.3s ease",
          height: "calc(100vh - 56px)",
        }}
      >
        {/* IMPORTANT: pass sidebar state */}
        {typeof children === "function"
          ? children({ sidebarOpen: open })
          : children}
      </main>
    </>
  );
}
