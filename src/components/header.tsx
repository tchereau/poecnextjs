import styles from "@/styles/Header.module.css";
import localFont from "next/font/local";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Connexion from "@/components/connexion";
import React, { useState, useEffect } from "react";

const myFont = localFont({ src: "../../public/PermanentMarker-Regular.ttf" });

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const reload = () => {
    window.location.reload();
  };

  const nothing = () => {
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    var match = document.cookie.match(
      new RegExp("(^| )" + "username" + "=([^;]+)")
    );
    if (match) setUsername(match[2]);
  }, []);

  function deconnexion() {
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    reload();
  }

  return (
    <>
      <div>
        <div className={styles.container}>
          <h1 className={myFont.className}>
            <Link href="/" onClick={nothing}>
              HSTAR
            </Link>
          </h1>
          <div>
            <ul className={styles.container_sous_menu}>
              <li>
                <Link href="/statistiques">Statistiques</Link>
              </li>
              {username == "" && (
                <li>
                  <span>
                    <FontAwesomeIcon icon={faUser} onClick={handleClick} />
                  </span>
                </li>
              )}
              {username !== "" && (
                <div className={styles.container_sous_menu}>
                  <p className={styles.username}>{username.toUpperCase()}</p>
                  <p onClick={deconnexion}>Déconnexion</p>
                </div>
              )}
            </ul>
          </div>
        </div>
        <Connexion isOpen={isOpen} onClose={handleClose}></Connexion>
      </div>
    </>
  );
}
