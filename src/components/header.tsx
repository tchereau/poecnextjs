import Image from 'next/image'
import styles from '@/styles/Header.module.css'
import localFont from 'next/font/local'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
const myFont = localFont({ src: '../../public/PermanentMarker-Regular.ttf' })
function toggle(){
    let div = document.getElementsByClassName(".container");
    console.log(div)
}

export default function Header() {
    return <>
             <div className={styles.container}>
             
                <h1 className={myFont.className}>HSTAR</h1>
                <div>
                    <ul className={styles.container_sous_menu}>
                        <li>Clients</li>
                        <li>Commandes</li>
                        <li>Statistiques</li>
                        <li><FontAwesomeIcon icon={faUser} /></li>  
                        <li onClick={toggle}>Connexion</li>
                    </ul>
                </div>
             </div>
           </> ;
  }
  
 