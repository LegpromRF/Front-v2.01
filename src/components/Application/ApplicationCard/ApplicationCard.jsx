import Characteristic from "../../Characteristic/Characteristic";
import CharacteristicsList from "../../CharacteristicsList/CharacteristicsList";
import styles from "./ApplicationCard.module.scss";
import ApplicationMainContent from "./ApplicationMainContent/ApplicationMainContent";
import ApplicationSlider from "./ApplicationSlider/ApplicationSlider";

const firstCharacteristics = [
  {
    parameter: "Заказчик предоставляет образец",
    value: "<Значение>",
  },
  {
    parameter: "Требуется пошив образца",
    value: "<Значение>",
  },
  {
    parameter: "Образец из материалоа заказчика",
    value: "<Значение>",
  },
  {
    parameter: "Заказчик оплачивает пошив образца",
    value: "<Значение>",
  },
  {
    parameter: "Конструкторская документация",
    value: "<Значение>",
  },
  {
    parameter: "Технологическая документация",
    value: "<Значение>",
  },
  {
    parameter: "Дополнительные услуги",
    value: "<Значение>",
  },
  {
    parameter: "Нанесение лого / принта",
    value: "<Значение>",
  },
];

const secondCharacteristics = [
  {
    parameter: "Вид ткани",
    value: "<Значение>",
  },
  {
    parameter: "Состав ткани",
    value: "<Значение>",
  },
  {
    parameter: "Плотность ткани",
    value: "<Значение>",
  },
  {
    parameter: "Комментарий по сырью",
    value: "<Значение>",
  },
  {
    parameter: "Доступ на производство для ОТК заказчика",
    value: "<Значение>",
  },
  {
    parameter: "Цена с НДС/Без НДС",
    value: "<Значение>",
  },
];

const thirdCharacteristics = [
  {
    parameter: "Взять в производство не позднее",
    value: "<Значение>",
  },
  {
    parameter: "Срок поставки не позднее",
    value: "<Значение>",
  },
  {
    parameter: "Срок исполнения заказа с момента поставки сырья",
    value: "<Значение>",
  },
  {
    parameter: "Возможность взять заказ частично от (штук)",
    value: "<Значение>",
  },
  {
    parameter: "Доступ на производство для ОТК заказчика",
    value: "<Значение>",
  },
  {
    parameter: "Цена с НДС/Без НДС",
    value: "<Значение>",
  },
];

const fourthCharacteristics = [
  {
    parameter: "Условия оплаты",
    value: "<Значение>",
  },
  {
    parameter: "Условия приемки",
    value: "<Значение>",
  },
  {
    parameter: "Условия доставки",
    value: "<Значение>",
  },
  {
    parameter: "Требования к упаковке",
    value: "<Значение>",
  },
  {
    parameter: "Требования к маркировке",
    value: "<Значение>",
  },
  {
    parameter: "Требования к персоналу",
    value: "<Значение>",
  },
  {
    parameter: "Требования к оборудованию",
    value: "<Значение>",
  },
];

const ApplicationCard = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.mainContentWrapper}>
          <div className={styles.slider}>
            <ApplicationSlider />
          </div>

          <div className={styles.mainContent}>
            <ApplicationMainContent />
          </div>
        </div>
      </div>
      <div className={styles.characteristics}>
        <div className={styles.characteristicsBlock}>
          <div className="box">
            <CharacteristicsList list={firstCharacteristics} />
          </div>
          <div className="box">
            <CharacteristicsList list={secondCharacteristics} />
          </div>

          <div className={styles.characteristicsBlockList}>
            <div>
              <div className="box" style={{ padding: "10px 14px" }}>
                <h2 className="characteristics-title center">Файлы</h2>
              </div>
            </div>
            <div className="box">
              <h2 className="characteristics-title">Размеры / ростовки</h2>

              <Characteristic parameter="parameter" value="value" />
            </div>
          </div>
        </div>
        <div className={styles.characteristicsBlock}>
          <div className="box">
            <CharacteristicsList list={thirdCharacteristics} />
          </div>
          <div className="box">
            <CharacteristicsList list={fourthCharacteristics} />
          </div>

          <div className="box">
            <h2 className="characteristics-title">Комментарий к заказу</h2>

            <CharacteristicsList
              list={[{ parameter: "parameter", value: "value" }]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
