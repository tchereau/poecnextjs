import Header from "@/components/header";
import home_style from "@/styles/Home.module.css";
import Sidebar from "@/components/sidebar";
import ClientList from "@/components/clientList";
import { useState } from "react";

export default function clients() {
  const [listClientIsOpen, setListClientIsOpen] = useState(false);

  return (
    <>
      <Header />
      <Sidebar />
      {listClientIsOpen && <ClientList />}
      <main className={home_style.main}></main>
    </>
  );
}
