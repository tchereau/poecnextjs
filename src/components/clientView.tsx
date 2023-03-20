import client_view_styles from "../styles/ClientView.module.css";

interface ClientProps {
  useClient: any;
  closeView: () => void;
}

export default function clientView({ useClient, closeView }: ClientProps) {
  return (
    <div>
      <h2 className={client_view_styles.title}>
        {useClient["Nom de société"]}
      </h2>
      <div className={client_view_styles.info}>
        <p>{useClient["Rue"] + " " + useClient["Voie"]}</p>
        <p>{useClient["Code postal"]}</p>
        <p>{useClient["Ville"]}</p>
        <p>{useClient["Téléphone"]}</p>
        <p>{useClient["Dirigeant"]}</p>
      </div>
    </div>
  );
}
