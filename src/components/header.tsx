import Image from "next/image";
import styles from "@/styles/Header.module.css";
import localFont from "next/font/local";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Connexion from "@/components/connexion";
import React, { useState } from "react";

const myFont = localFont({ src: "../../public/PermanentMarker-Regular.ttf" });

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <div className={styles.container}>
          <h1 className={myFont.className}>
            <Link href="/">HSTAR</Link>
          </h1>
          <div>
            <ul className={styles.container_sous_menu}>
              <li>
                <Link href="/clients">Clients</Link>
              </li>
              <li>Commandes</li>
              <li>Statistiques</li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faUser} onClick={handleClick} />
                </span>
              </li>
            </ul>
          </div>
        </div>
        <Connexion isOpen={isOpen} onClose={handleClose}></Connexion>
      </div>
    </>
  );
}
