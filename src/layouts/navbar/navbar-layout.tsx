
import { Toaster } from "sonner";
import { Button, CircularProgress, Link, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

import { BurguerButton } from "./burguer-button";
/* import { NotificationsDropdown } from "./notifications-dropdown"; */
import { UserDropdown } from "./user-dropdown";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore, useSettingStore } from "../../stores";
import { DarkModeSwitch } from "./darkmodeswitch";
import { FaCircleQuestion } from "react-icons/fa6";
import { RiMegaphoneFill } from "react-icons/ri";
//import { IoMdSearch } from "react-icons/io";
import { useEffect } from "react";
import { NotificationCenter } from "../../components/notifications/notification-center";
import { useEcho } from '../../hooks/echo';


export const NavbarLayout = () => {
  //const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const authStatus = useAuthStore(state => state.authStatus);
  const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);
  const user = useAuthStore(state => state.user);
  const company = useSettingStore(state => state.systemData);
  const { logo, name } = company as any;
  // Inicializar Echo para notificaciones en tiempo real
  const { isConnected } = useEcho();

  const getSystemData = useSettingStore(state => state.getSystemData);
  useEffect(() => {
    getSystemData();
  }, []);


  if (authStatus === 'pending') {
    checkAuthStatus();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Cargando...</p>
        <CircularProgress />
      </div>
    )
  }
  /* if (authStatus === 'not-auth') {
    return <Navigate to='/' />
  } */
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{
          position: 'absolute',
        }}
      />
      {/* overflow-x-hidden */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Navbar
          isBordered
          className="w-full"
          classNames={{
            wrapper: "w-full max-w-full",
          }}

        >
          <NavbarContent className="md:hidden">
            {
              window.location.pathname.includes('/admin') && (
                <BurguerButton />
              )
            }
            <NavbarBrand className="md:flex">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
              <p className="font-bold text-inherit uppercase">{name}</p>
            </NavbarBrand>
            {
              !window.location.pathname.includes('/admin') && (
                <NavbarContent className="hidden md:flex" justify="start">
                  <NavbarBrand className="cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                    <p className="font-bold text-inherit uppercase">{name}</p>
                  </NavbarBrand>
                </NavbarContent>
              )
            }
          </NavbarContent>
          {
            !window.location.pathname.includes('/admin') && (
              <NavbarContent className="max-md:hidden" justify="start">
                <NavbarBrand className="cursor-pointer hover:opacity-80 gap-2" onClick={() => navigate('/')}>
                  <img src={logo ?? `https://picsum.photos/seed/${Math.random()}/200/300`} alt="Logo" className="w-10 h-10 rounded-full" />
                  <p className="font-bold text-inherit uppercase">{name ?? ''}</p>
                </NavbarBrand>
              </NavbarContent>
            )
          }
          <NavbarContent className="w-full">
            {/* <Input
              startContent={<IoMdSearch />}
              isClearable
              className="w-full"
              classNames={{
                input: "w-full",
                mainWrapper: "w-full",
              }}
              placeholder="Buscar..."
            /> */}
          </NavbarContent>

          <NavbarContent
            justify="end"
            className="w-fit data-[justify=end]:flex-grow-0"
          >
            <div className="flex items-center gap-2 max-md:hidden">
              <RiMegaphoneFill className="text-default-500" size={20} />
              <span>Feedback?</span>
            </div>
            {authStatus === 'auth' && (
              <>
              {/* <NotificationsDropdown />  */}
              <div className="hidden sm:flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-500">
                  {isConnected ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
            <NotificationCenter userId={user?.id ?? 0} />
              </>
            )}
            

            <div className="max-md:hidden">
              <FaCircleQuestion className="text-default-500" size={20} />
            </div>

            <NavbarContent className="max-md:hidden" key='switch'>
              <DarkModeSwitch />
            </NavbarContent>

            <NavbarContent className="">
              {
                authStatus === 'auth' ? <UserDropdown /> : <Button as={Link} href="/login" variant="flat">Iniciar sesión</Button>
              }

            </NavbarContent>
          </NavbarContent>
        </Navbar>

        <Outlet />
      </div>
    </>
  );
};
