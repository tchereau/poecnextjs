import side_bar_style from "@/styles/Sidebar.module.css";
interface SideProps {
  openList: () => void;
  closeList: () => void;
  openAdd: () => void;
  closeAdd: () => void;
  closeEdit: () => void;
}

export default function sidebar({
  openList,
  closeList,
  openAdd,
  closeAdd,
  closeEdit,
}: SideProps) {
  return (
    <div className={side_bar_style.container}>
      <h3>Clients</h3>
      <ul>
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
