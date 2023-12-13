import Characteristic from "../../../Characteristic/Characteristic";
import styles from "./MainCharacteristics.module.scss";

const MainCharacteristics = () => {
  return (
    <div className={styles.wrapper}>
      <Characteristic parameter="Тип одежды" value="<Значение>" />
      <Characteristic parameter="Назначение" value="<Значение>" />
      <Characteristic parameter="Вид одежды" value="<Значение>" />
      <Characteristic parameter="Пол и возраст" value="<Значение>" />
      <Characteristic parameter="Сезон" value="<Значение>" />
      <Characteristic parameter="Ценовой сегмент" value="<Значение>" />
      <Characteristic parameter="Регулярность заказа" value="<Значение>" />
      <Characteristic
        parameter="Рассмотрят поставщиков из регионов "
        value="<Значение>"
      />
    </div>
  );
};

export default MainCharacteristics;
