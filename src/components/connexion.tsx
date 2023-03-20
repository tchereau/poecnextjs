import styles from '@/styles/Connexion.module.css'
import React, { useState } from 'react';
import Link from 'next/link';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

export default function Connexion({ isOpen, onClose}:ModalProps){
   
    return <> {isOpen && ( 
            <div>
                <div className={styles.container}>      
                    <h2 className={styles.titre}>Connexion / Inscription</h2>
                    <form className={styles.form}>
                        <input className={styles.input} type="text" placeholder="login"/>
                        <input className={styles.input}  type="text" placeholder="mot de passe"/>
                    </form>
                    <Link href="/" className={styles.link}>S'inscrire</Link>
                    <div className={styles.btncontainer}>
                        <button onClick={onClose} className={styles.bouton}>Annuler</button>
                        <button type="submit" className={styles.bouton}>Se Connecter</button>
                    </div>
                </div>
                <div className={styles.overlaye}></div>
            </div>
     )  }</>
}