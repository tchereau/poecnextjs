import styles from "@/styles/Connexion.module.css";
import React, { useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Connexion({ isOpen, onClose }: ModalProps) {
  const [cookies, setCookie] = useCookies();
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const data = {
      username: username,
      password: password,
    };

    const content = await fetch("/api/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    }).then((res) => res.json());
    if (content.error) {
      alert("Erreur de connexion");
    } else if (content.result) {
      setCookie("token", content.result, { path: "/" });
      setCookie("username", username, { path: "/" });
      window.location.reload();
      onClose();
    }
  }
  return (
    <>
      {" "}
      {isOpen && (
        <div>
          <div className={styles.container}>
            <h2 className={styles.titre}>Connexion</h2>
            <form className={styles.form} onSubmit={login}>
              <input
                className={styles.input}
                name="username"
                type="text"
                placeholder="login"
              />
              <input
                className={styles.input}
                name="password"
                type="text"
                placeholder="mot de passe"
              />

              <div className={styles.btncontainer}>
                <button onClick={onClose} className={styles.bouton}>
                  Annuler
                </button>
                <button type="submit" className={styles.bouton}>
                  Se Connecter
                </button>
              </div>
            </form>
          </div>
          <div className={styles.overlaye}></div>
        </div>
      )}
    </>
  );
}
