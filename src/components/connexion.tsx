import styles from '@/styles/Connexion.module.css'

export default function Connexion(){
    return  <div className={styles.container}>
                <h2>Connexion / Inscription</h2>
                <form action="">
                    <input type="text" placeholder="login"/>
                    <input type="text" placeholder="mot de passe"/>
                </form>
                <button>Annuler</button>
                <button type="submit">Se Connecter</button>
           </div>
}