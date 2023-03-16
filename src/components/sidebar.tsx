import side_bar_style from "@/styles/Sidebar.module.css";
interface SideProps {
  listClientIsOpen: boolean;
}
export default function sidebar() {
  return (
    <div className={side_bar_style.container}>
      <h3>Clients</h3>
      <ul>
        <li>Liste clients</li>
        <li>Ajouter client</li>
      </ul>
    </div>
  );
}
