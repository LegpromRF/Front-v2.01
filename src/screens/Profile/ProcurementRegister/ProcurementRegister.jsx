import { useSelector } from "react-redux";
import { createQueryString } from "../../../utils/helpers/procurementRegister/index.js";
import Filters from "../../../components/ProcurementRegister/Filters/Filters.jsx";
import Items from "../../../components/ProcurementRegister/Items/Items";
import styles from "./ProcurementRegister.module.scss";

function ProcurementRegister() {
  const open = useSelector((state) => state.procRegister.open);
  const query = useSelector((state) => state.procRegister.query);

  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <Filters open={open} query={query} />
        <Items query={createQueryString(query)} open={open} />
      </div>
    </div>
  );
}

export default ProcurementRegister;
