import { useSelector } from "react-redux";
import { useAppCharacteristics } from "../../../hooks/useAppCharacteristics";
import CharacteristicsList from "../../CharacteristicsList/CharacteristicsList";
import styles from "./ApplicationCard.module.scss";
import ApplicationMainContent from "./ApplicationMainContent/ApplicationMainContent";
import ApplicationSlider from "./ApplicationSlider/ApplicationSlider";
import { useEffect, useState } from "react";

const ApplicationCard = () => {
  const { firstCharact, secondCharact, thirdCharact, fourthCharact } =
    useAppCharacteristics();
  const { technology, files, other, filesError } = useSelector(
    (state) => state.viewTz
  );
  const [filesArr, setFilesArr] = useState([]);

  useEffect(() => {
    if (!files) return;

    const filesArrFromAPI = Object.entries(files);

    setFilesArr(
      filesArrFromAPI.map((el) => {
        return {
          name: el[0],
          url: el[1],
        };
      })
    );
  }, [files]);

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
          {firstCharact.some((el) => Boolean(el.value)) && (
            <div className="box">
              <CharacteristicsList list={firstCharact} />
            </div>
          )}
          {secondCharact.some((el) => Boolean(el.value)) && (
            <div className="box">
              <CharacteristicsList list={secondCharact} />
            </div>
          )}

          <div className={styles.characteristicsBlockList}>
            {!filesError && (
              <div>
                <div className="box" style={{ padding: "10px 14px" }}>
                  <h2 className="characteristics-title center">Файлы</h2>
                </div>
                <div className={styles.filesList}>
                  {filesArr.map((el, idx) => {
                    return (
                      <a key={idx} href={el.url}>
                        {el.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
            {technology.sizes && (
              <div className="box">
                <h2 className="characteristics-title">Размеры / ростовки</h2>

                <p>{technology.sizes}</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.characteristicsBlock}>
          {thirdCharact.some((el) => Boolean(el.value)) && (
            <div className="box">
              <CharacteristicsList list={thirdCharact} />
            </div>
          )}
          {fourthCharact.some((el) => Boolean(el.value)) && (
            <div className="box">
              <CharacteristicsList list={fourthCharact} />
            </div>
          )}

          {other.comment && (
            <div className="box">
              <h2 className="characteristics-title">Комментарий к заказу</h2>

              <p>{other.comment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
