import Header from "@/components/header";
import home_style from "@/styles/Home.module.css";
import Sidebar from "@/components/sidebar";
import ClientList from "@/components/clientList";
import ClientAdd from "@/components/clientAdd";
import { useState } from "react";
import ClientView from "@/components/clientView";

export default function clients() {
  const [listClientIsOpen, setListClientIsOpen] = useState(false);
  const [addClientIsOpen, setAddClientIsOpen] = useState(false);
  const [editClientIsOpen, setEditClientIsOpen] = useState(false);
  const [client, setClient] = useState({});
  const [clientViewIsOpen, setClientViewIsOpen] = useState(false);

  const handleAddClick = () => {
    setAddClientIsOpen(true);
  };

  const handleAddClose = () => {
    setAddClientIsOpen(false);
  };

  const handleListClick = () => {
    setListClientIsOpen(true);
  };

  const handleListClose = () => {
    setListClientIsOpen(false);
  };

  const handleEditClick = () => {
    setEditClientIsOpen(true);
  };

  const handleEditClose = () => {
    setEditClientIsOpen(false);
  };

  const handleViewClick = () => {
    setClientViewIsOpen(true);
  };

  const handleViewClose = () => {
    setClientViewIsOpen(false);
  };

  return (
    <>
      <Header />
      <Sidebar
        openList={handleListClick}
        closeList={handleListClose}
        openAdd={handleAddClick}
        closeAdd={handleAddClose}
        closeEdit={handleEditClose}
        closeView={handleViewClose}
      />
      {listClientIsOpen && (
        <ClientList
          openEdit={handleEditClick}
          getClient={setClient}
          closeList={handleListClose}
          openClientView={handleViewClick}
          closeView={handleViewClose}
        />
      )}
      {addClientIsOpen && (
        <ClientAdd closeEdit={handleEditClose} openList={handleListClick} />
      )}
      {editClientIsOpen && (
        <ClientAdd
          useClient={client}
          closeEdit={handleEditClose}
          openList={handleListClick}
        />
      )}
      {clientViewIsOpen && (
        <ClientView useClient={client} closeView={handleViewClose} />
      )}
    </>
  );
}
