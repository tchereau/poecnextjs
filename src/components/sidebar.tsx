import side_bar_style from "@/styles/Sidebar.module.css";
import { useState } from "react";

interface SideProps {
  openList: () => void;
  closeList: () => void;
  openAdd: () => void;
  closeAdd: () => void;
  closeEdit: () => void;
  closeView: () => void;
  openProductList: () => void;
  closeProductList: () => void;
  openProductAdd: () => void;
  closeProductAdd: () => void;
  openOrderList: () => void;
  closeOrderList: () => void;
  openOrderAdd: () => void;
  closeOrderAdd: () => void;
}

export default function sidebar({
  openList,
  closeList,
  openAdd,
  closeAdd,
  closeEdit,
  closeView,
  openProductList,
  closeProductList,
  openProductAdd,
  closeProductAdd,
  openOrderList,
  closeOrderList,
  openOrderAdd,
  closeOrderAdd,
}: SideProps) {
  const [displayClient, setDisplayClient] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(false);
  const [displayProduct, setDisplayProduct] = useState(false);

  function closeAll() {
    closeList();
    closeEdit();
    closeAdd();
    closeView();
    closeProductList();
    closeProductAdd();
    closeOrderList();
    closeOrderAdd();
  }

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
            closeAll();
            openList();
          }}
          className={side_bar_style.li}
        >
          Liste clients
        </li>
        <li
          onClick={() => {
            closeAll();
            openAdd();
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
            closeAll();
            openOrderList();
          }}
          className={side_bar_style.li}
        >
          Liste commandes
        </li>
        <li
          onClick={() => {
            closeAll();
            openOrderAdd();
          }}
          className={side_bar_style.li}
        >
          Créer une commande
        </li>
      </ul>
      <h3 className={side_bar_style.h3} onClick={toggleDisplayProduct}>
        Produits
      </h3>
      <ul className={displayProduct ? "null" : side_bar_style.display}>
        <li
          onClick={() => {
            closeAll();
            openProductList();
          }}
          className={side_bar_style.li}
        >
          Liste produits
        </li>
        <li
          onClick={() => {
            closeAll();
            openProductAdd();
          }}
          className={side_bar_style.li}
        >
          Ajouter produit
        </li>
      </ul>
    </div>
  );
}
