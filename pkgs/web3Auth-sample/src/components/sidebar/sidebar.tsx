import React from "react";
import { Sidebar } from "./sidebar.styles";
import iconImage from "../../public/DCCEX.png";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "../layout/layout-context";
import { useRouter } from "next/router";
import Image from "next/image";

/**
 * SidebarWrapper Component
 * @returns 
 */
export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <Image src={iconImage} alt="DCCEX" width={40} height={40} />
          <div className="text-xl font-semibold">DCCEX</div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={router.pathname === "/"}
              href="/"
            />
            <SidebarItem
              isActive={router.pathname === "/payments"}
              title="Pools"
              icon={<PaymentsIcon />}
            />
            <SidebarItem
              isActive={router.pathname === "/accounts"}
              title="CreateToken"
              icon={<AccountsIcon />}
              href="accounts"
            />
             <SidebarItem
              isActive={router.pathname === "/accounts"}
              title="Faucet"
              icon={<AccountsIcon />}
              href="accounts"
            />
          </div>  
        </div>
      </div>
    </aside>
  );
};
