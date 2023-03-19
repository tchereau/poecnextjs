import Header from "@/components/header";
import home_style from "@/styles/Home.module.css";
import Sidebar from "@/components/sidebar";
import ClientList from "@/components/clientList";
import ClientAdd from "@/components/clientAdd";
import { useState } from "react";

export default function clients() {
  const [listClientIsOpen, setListClientIsOpen] = useState(false);
  const [addClientIsOpen, setAddClientIsOpen] = useState(false);

  const handleAddClick = () => {
    setAddClientIsOpen(true);
  };

  const handleAddClose = () => {
    setAddClientIsOpen(false);
  };

  const handleClick = () => {
    setListClientIsOpen(true);
  };

  const handleClose = () => {
    setListClientIsOpen(false);
  };

  return (
    <>
      <Header />
      <Sidebar
        openList={handleClick}
        closeList={handleClose}
        openAdd={handleAddClick}
        closeAdd={handleAddClose}
      />
      {listClientIsOpen && <ClientList />}
      {addClientIsOpen && <ClientAdd />}
      <main className={home_style.main}></main>
    </>
  );
}
