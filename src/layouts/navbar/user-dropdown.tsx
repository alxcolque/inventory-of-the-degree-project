import {
  Avatar,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
//import React, { useCallback } from "react";
import { useAuthStore } from "../../stores";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useNavigate } from "react-router-dom";
//import { useRouter } from "next/navigation";
//import { deleteAuthCookie } from "../../actions/auth.action";

export const UserDropdown = () => {
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  /* const router = useRouter();

  const handleLogout = useCallback(async () => {
    await deleteAuthCookie();
    router.replace("/login");
  }, [router]); */
  //console.log(user);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as='button'
            color='secondary'
            size='md'
            src={user?.avatar}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label='User menu actions'
        onAction={(actionKey) => console.log({ actionKey })}>
        <DropdownItem
            href={user?.roles[0] === 'admin' ? '/admin' : '/home'}
          
          key='profile'
          className='flex flex-col justify-start w-full items-start'>
          <p>{ user?.username }</p>
          <p>
          <span className="text-xs font-medium text-default-500">
          { user?.name }
            </span>
          </p>
          <Chip
            size="sm"
            variant="flat"
            color={user?.roles[0] === 'admin' ? 'success' : 'warning'}
          >
            <span className="capitalize text-xs">{user?.roles}</span>
          </Chip>
        </DropdownItem>
        <DropdownItem key='billetera' onPress={() => navigate('/billetera')}>Billetera</DropdownItem>
        <DropdownItem key='reservas' onPress={() => navigate('/reservas/mis-reservas')} >Mis reservas</DropdownItem>
        <DropdownItem key='favoritos' onPress={() => navigate('/campos/favoritos')}>Mis Favoritos</DropdownItem>
        <DropdownItem key='campos' onPress={() => navigate('/campos/mis-campos')}>Mis campos</DropdownItem>
        <DropdownItem key='planes' onPress={() => navigate('/planes/mis-planes')}>Mis planes</DropdownItem>
        <DropdownItem
          key='logout'
          color='danger'
          className='text-danger'
          onPress={logout}>
          Cerrar sesión
          
        </DropdownItem>
        <DropdownItem key='help_and_feedback'>
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
