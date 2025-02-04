//"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { FaCreativeCommons } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSettingStore } from "../../stores";
import { useEffect } from "react";


export const CompaniesDropdown = () => {
  const navigate = useNavigate();
  const company = useSettingStore(state => state.systemData);
  const { logo, name } = company as any;
  const getSystemData = useSettingStore(state => state.getSystemData);
  useEffect(() => {
    getSystemData();
  }, []);
  console.log(company);
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          {/* Logo image */}
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap uppercase">
              {name}
            </h3>
            <span className="text-xs font-medium text-default-500">
              Oruro, Bolivia
            </span>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Avatar Actions">
        <DropdownSection title="Companies">
          <DropdownItem
            key="1"
            startContent={<FaHome />}
            description="Página de bienvenida"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            Pantalla de inicio
          </DropdownItem>
          <DropdownItem
            key="2"
            startContent={<FaCreativeCommons />}
            description="Landing page de la empresa"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
            href="https://culking.com"
            target="_blank"
          >
            Culking
          </DropdownItem>
          {/* <DropdownItem
            key="3"
            startContent={<FaCreativeCommons />}
            description="Brooklyn, NY"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Twitter
          </DropdownItem>
          <DropdownItem
            key="4"
            startContent={<FaCreativeCommons />}
            description="Palo Alto, CA"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Acme Co.
          </DropdownItem> */}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
