
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout-context";

import { FaBox, FaHouse, FaStore, FaUsers } from 'react-icons/fa6'
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { TbCategoryPlus } from "react-icons/tb";

export const SidebarLayout = () => {
  const pathname = useLocation().pathname;
  const { collapsed, setCollapsed } = useSidebarContext();
  const authStatus = useAuthStore(state => state.authStatus);
  if (authStatus === 'not-auth') {
    return <Navigate to='/' />
  }

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>

            <SidebarMenu title="Menu">
              <SidebarItem
                title="Inicio"
                icon={<FaHouse className="text-default-500" size={20} />}
                isActive={pathname === "/admin"}
                href="/admin"
              />
              {/* Inventory */}
              <SidebarItem
                isActive={pathname === "/admin/inventories" || pathname === "/admin/inventories/input"}
                title="Inventario"
                icon={<FaBox className="text-default-500" size={20} />}
                href="/admin/inventories"
              />
              <SidebarItem
                title="Tiendas"
                icon={<FaStore className="text-default-500" size={20} />}
                isActive={pathname === "/admin/stores"}
                href="/admin/stores"
              />
              <SidebarItem
                isActive={pathname === "/admin/users"}
                title="Usuarios"
                icon={<FaUsers className="text-default-500" size={20} />}
                href="/admin/users"
              />

              <SidebarItem
                isActive={pathname === "/admin/categories"}
                title="Categorias"
                icon={<TbCategoryPlus className="text-default-500" size={20} />}
                href="/admin/categories"
              />
              {/* Subcategories */}
              <SidebarItem
                isActive={pathname === "/admin/subcategories"}
                title="Subcategorias"
                icon={<TbCategoryPlus className="text-default-500" size={20} />}
                href="/admin/subcategories"
              />
              {/* Customers */}
              <SidebarItem
                isActive={pathname === "/admin/customers"}
                title="Clientes"
                icon={<FaUsers className="text-default-500" size={20} />}
                href="/admin/customers"
              />
              {/* Suppliers */}
              <SidebarItem
                isActive={pathname === "/admin/suppliers"}
                title="Proveedores"
                icon={<FaUsers className="text-default-500" size={20} />}
                href="/admin/suppliers"
              />
              {/* Products */}
              <SidebarItem
                isActive={pathname === "/admin/products"}
                title="Productos"
                icon={<FaBox className="text-default-500" size={20} />}
                href="/admin/products"
              />
              
              {/* Orders */}
              {/* <SidebarItem
                isActive={pathname === "/admin/orders"}
                title="Ventas"
                icon={<FaBox className="text-default-500" size={20} />}
                href="/admin/orders"
              /> */}

            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};

