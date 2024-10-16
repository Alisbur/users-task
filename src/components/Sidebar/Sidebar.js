import "./Sidebar.css";
import Button from "../../shared/ui/Button/Button";
import { useUsersStore } from "../../hooks/useStore";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const { companySort, citySort } = useUsersStore();
  const { pathname } = useLocation();

  return (
    <div className="wrapper">
      <h3 style={{ fontSize: "12px", margin: 0 }}>Сортировка</h3>
      <Button
        caption="по компании"
        onClick={() => {
          companySort();
        }}
        disabled={pathname !== "/"}
      />
      <Button
        caption="по городу"
        onClick={() => {
          citySort();
        }}
        disabled={pathname !== "/"}
      />
    </div>
  );
}
