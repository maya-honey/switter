import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import FollowersCard from "../FollowersCard/FollowersCard";


const FollowersModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="md"
      fullScreen={isMobile}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >

    <FollowersCard location='modal'/>
    </Modal>
  );
};

export default FollowersModal;
