import side_bar_style from "@/styles/Sidebar.module.css";
import { useState } from "react";

interface SideProps {
  openList: () => void;
  closeList: () => void;
  openAdd: () => void;
  closeAdd: () => void;
  closeEdit: () => void;
  closeView: () => void;
}

export default function sidebar({
  openList,
  closeList,
  openAdd,
  closeAdd,
  closeEdit,
  closeView,
}: SideProps) {
  const [displayClient, setDisplayClient] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(false);
  const [displayProduct, setDisplayProduct] = useState(false);

  const toggleDisplayClient = () => {
    setDisplayClient(!displayClient);
  };

  const toggleDisplayOrder = () => {
    setDisplayOrder(!displayOrder);
  };

  const toggleDisplayProduct = () => {
    setDisplayProduct(!displayProduct);
  };

  return (
    <div className={side_bar_style.container}>
      <h3 className={side_bar_style.h3} onClick={toggleDisplayClient}>
        Clients
      </h3>
      <ul className={displayClient ? "null" : side_bar_style.display}>
        <li
          onClick={() => {
            openList();
            closeAdd();
            closeEdit();
            closeView();
          }}
          className={side_bar_style.li}
        >
          Liste clients
        </li>
        <li
          onClick={() => {
            openAdd();
            closeList();
            closeEdit();
            closeView();
          }}
          className={side_bar_style.li}
        >
          Ajouter client
        </li>
      </ul>
      <h3 className={side_bar_style.h3} onClick={toggleDisplayOrder}>
        Commandes
      </h3>
      <ul className={displayOrder ? "null" : side_bar_style.display}>
        <li
          onClick={() => {
            openList();
            closeAdd();
            closeEdit();
            closeView();
          }}
          className={side_bar_style.li}
        >
          Liste clients
        </li>
        <li
          onClick={() => {
            openAdd();
            closeList();
            closeEdit();
            closeView();
          }}
          className={side_bar_style.li}
        >
          Ajouter client
        </li>
      </ul>
      <h3 className={side_bar_style.h3} onClick={toggleDisplayProduct}>
        Produits
      </h3>
      <ul className={displayProduct ? "null" : side_bar_style.display}>
        <li
          onClick={() => {
            openList();
            closeAdd();
            closeEdit();
          }}
          className={side_bar_style.li}
        >
          Liste clients
        </li>
        <li
          onClick={() => {
            openAdd();
            closeList();
            closeEdit();
          }}
          className={side_bar_style.li}
        >
          Ajouter client
        </li>
      </ul>
    </div>
  );
}
