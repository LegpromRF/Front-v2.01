import { useSelector } from "react-redux";
import Characteristic from "../../../Characteristic/Characteristic";
import styles from "./MainCharacteristics.module.scss";
import { useEffect, useState } from "react";

const MainCharacteristics = () => {
  const item = useSelector((state) => state.viewTz.item);
  const [supplierRegions, setSupplierRegions] = useState([]);

  useEffect(() => {
    if (!item) return;

    const regions = item.supplier_region?.split(",");

    setSupplierRegions(regions);
  }, [item]);

  return (
    <div className={styles.wrapper}>
      <Characteristic parameter="Тип одежды" value={item.clothes_type || "-"} />
      <Characteristic parameter="Назначение" value={item.purpose || "-"} />
      <Characteristic parameter="Вид одежды" value={item.clothes_name || "-"} />
      <Characteristic
        parameter="Пол и возраст"
        value={item.gender_and_age || "-"}
      />
      <Characteristic parameter="Сезон" value={item.season || "-"} />
      <Characteristic
        parameter="Ценовой сегмент"
        value={item.product_type || "-"}
      />
      <Characteristic
        parameter="Регулярность заказа"
        value={item.regularity_of_order || "-"}
      />
      <Characteristic
        parameter="Рассмотрят поставщиков из регионов "
        value={supplierRegions?.join(", ") || "-"}
      />
    </div>
  );
};

export default MainCharacteristics;
