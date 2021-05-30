import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiAdminLine,
  RiImageEditLine,
  RiImageAddLine,
  RiUserAddLine
} from "react-icons/ri"

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="LISTAR">
        <NavLink icon={RiAdminLine} href="/adms">Administradores</NavLink>
        <NavLink icon={RiDashboardLine} href="/adm/carousels">Carrosseis</NavLink>
        <NavLink icon={RiContactsLine} href="/adm/users">Usuários</NavLink>
        <NavLink icon={RiImageEditLine} href="/adm/images">Imagens</NavLink>
      </NavSection>

      <NavSection title="CRIAR">
        <NavLink icon={RiUserAddLine} href="/adm/create-user">Usuário</NavLink>
        <NavLink icon={RiImageAddLine} href="/adm/create-image">Imagens</NavLink>
        <NavLink icon={RiDashboardLine} href="/adm/create-carousel">Carrossel</NavLink>
      </NavSection>
    </Stack>
  );
}
