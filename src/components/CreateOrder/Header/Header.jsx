import HeaderProfile from "./HeaderProfile/HeaderProfile";
import styles from "../CreateOrder.module.scss";
import { useSelector } from "react-redux";

const Header = () => {
  const stage = useSelector(state => state.form.currentStage)
  if (stage == 6) return ''
  return (
    <div className={styles.createOrder__header}>
      <HeaderProfile title="Изделие" stage={1} done={stage > 1} active={stage == 1} />
      <HeaderProfile title="Закупка" stage={2} done={stage > 2} active={stage == 2} />
      <HeaderProfile title="Технология" stage={3} done={stage > 3} active={stage == 3} />
      <HeaderProfile title="Условия" stage={4} done={stage > 4} active={stage == 4} />
      <HeaderProfile title="Контакты" stage={5} done={stage > 5} active={stage == 5} />
    </div>
  );
};
export default Header;
