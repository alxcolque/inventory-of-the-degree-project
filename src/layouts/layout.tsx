//"use client";

import React from "react";

import { SidebarContext } from "./layout-context";
import { useLockedBody } from "../hooks/useBodyLock";
import { SidebarLayout } from "./sidebar/sidebar-layout";
import { NavbarLayout } from "./navbar/navbar-layout";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}>
      <section className='flex'>
        <SidebarLayout />
        <NavbarLayout/>
      </section>
    </SidebarContext.Provider>
  );
};
