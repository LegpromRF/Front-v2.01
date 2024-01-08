import Characteristic from "../Characteristic/Characteristic";
import styles from "./CharacteristicsList.module.scss";

const CharacteristicsList = ({ list }) => {
  return (
    <div className={styles.list}>
      {list.map((el, idx) => {
        if (!el.value) {
          return;
        }

        return (
          <Characteristic key={idx} parameter={el.parameter} value={el.value} />
        );
      })}
    </div>
  );
};

export default CharacteristicsList;
