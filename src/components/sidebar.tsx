import side_bar_style from "@/styles/Sidebar.module.css";
interface SideProps {
  openList: () => void;
  closeList: () => void;
  openAdd: () => void;
  closeAdd: () => void;
}

export default function sidebar({
  openList,
  closeList,
  openAdd,
  closeAdd,
}: SideProps) {
  return (
    <div className={side_bar_style.container}>
      <h3>Clients</h3>
      <ul>
        <li
          onClick={() => {
            openList();
            closeAdd();
          }}
          className={side_bar_style.li}
        >
          Liste clients
        </li>
        <li
          onClick={() => {
            openAdd();
            closeList();
          }}
          className={side_bar_style.li}
        >
          Ajouter client
        </li>
      </ul>
    </div>
  );
}
