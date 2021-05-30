import { HStack, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { RiUserAddLine } from "react-icons/ri";

export function NotificationsNav() {
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.800"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Link href="/adm/create-user">
        <Icon cursor="pointer" as={RiUserAddLine} fontSize="20" />
      </Link>
    </HStack>
  );
}
