import HeaderProfile from '@components/HeaderProfile/HeaderProfile';
import styles from './CreateOrder.module.scss'

import TitleProfile from "@components/TitleProfile/TitleProfile";
import Layout from "@layout/Layout";
import ModalLayout from '@layout/Modal/ModalLayout'
import {useState} from "react";
import {Link} from "react-router-dom";
import PurchaseStep from "@layout/OrderForm/steps/purchase.jsx";

const CreateOrder = () => {

    const [activeInput1, setActiveInput1] = useState(false);
    const [activeInput2, setActiveInput2] = useState(false);
    const [activeInput3, setActiveInput3] = useState(false);
    const [activeInput4, setActiveInput4] = useState(false);

    const handleInputChange = (index) => (e) => {
        const value = e.target.value;
        switch (index) {
            case 1:
                setActiveInput1(value.length > 0);
                break;
            case 2:
                setActiveInput2(value.length > 0);
                break;
            case 3:
                setActiveInput3(value.length > 0);
                break;
            case 4:
                setActiveInput4(value.length > 0);
                break;
            default:
                break;
        }
    }

  /* ============= Preview images upload =========== */

    const [modalActive, setModalActive] = useState(false)
    const [modalActive2, setModalActive2] = useState(false)
    const [modalActive3, setModalActive3] = useState(false)

  /*==============================================*/

    const dispatch = useDispatch()
    const { step, formData } = useSelector((state) => state.form);
    const handleNext = () => {
        dispatch(setFormData(getValues())); // Сохранить данные формы
        dispatch(setStep(step + 1));
    };

    const handlePrev = () => {
        dispatch(setStep(step - 1));
    };

  return ( 
    <>
    {/*<Head>*/}
    {/*  <title>Создать заказ - LegpromRF</title>*/}
    {/*</Head>*/}
     <Layout>
      <div className={styles.createOrder}>
        <TitleProfile>Техническое задание</TitleProfile>
      
        <div className={styles.createOrder__header}>
            <HeaderProfile title="Изделие" number="1" href='/profile/createorder/' active={true}/>
            <HeaderProfile title="Закупка" number="2" href='/profile/purchase' active={false}/>
            <HeaderProfile title="Технология" number="3" href='/profile/technology' active={false}/>
            <HeaderProfile title="Условия" number="4" href='/profile/conditions' active={false}/>
            <HeaderProfile title="Контакты" number="5" href='/profile/contacts' active={false}/>
        </div>
            <PurchaseStep />
            <div className={styles.form__button}>
              <div className={styles.form__buttonBack}>Назад</div>
              <Link to={'/profile/order/purchase'}
                    onClick={() => setModalActive(!modalActive)}
                  // disabled={!(activeInput1 && activeInput2
                  //     && valueInput1 !== 'нажмите для выбора' &&
                  //     valueInput2 !== 'нажмите для выбора' && valueInput3 !== 'нажмите для выбора'
                  //     && valueInput4 !== 'нажмите для выбора')
                  // }
                  // className={activeInput1 && activeInput2
                  //   && valueInput1 !== 'нажмите для выбора' &&
                  //   valueInput2 !== 'нажмите для выбора' && valueInput3 !== 'нажмите для выбора'
                  //   && valueInput4 !== 'нажмите для выбора' ? [styles.form__buttonForward, styles.form__buttonForwardActive].join(' ') : styles.form__buttonForward}
              >
                  Вперед
              </Link>
            </div>
        </div>

          <ModalLayout active={modalActive} setActive={setModalActive}>
              <h3 className={styles.form__modalTitle}>Укажите свою почту</h3>
              <p className={styles.form__modalSubTitle}>Для получения уведомлений о статусе вашего ТЗ и подтверждения вашего акаунта,  укажите свою электронную почту.</p>
              <input 
                className={ activeInput3 ? [styles.form__inputActive, styles.form__inputModal].join(' ') : styles.form__inputModal} 
                onChange={handleInputChange(3)}
                type="text" 
                placeholder="Ваша почта"
              />
              <button 
                onClick={() => {
                  setModalActive(false)
                  setModalActive2(!modalActive2)
                }} 
                className={activeInput3 ? [styles.form__buttonModal, styles.form__buttonModalActive].join(' ') : styles.form__buttonModal}>
                  Далее
              </button>
          </ModalLayout>

          <ModalLayout active={modalActive2} setActive={setModalActive2}>
              <h3 className={styles.form__modalTitle}>Подтвердите свою почту</h3>
              <p className={styles.form__modalSubTitle}>На почту pav*******@mail.ru был отправлен код подтверждения. Введите его в поле ниже</p>
              <input 
                className={ activeInput4 ? [styles.form__inputActive, styles.form__inputModal].join(' ') : styles.form__inputModal} 
                onChange={handleInputChange(4)}
                type="text" 
                placeholder="Код из сообщения"
              />
              <button 
                onClick={() => {
                  setModalActive2(false)
                  setModalActive3(!modalActive3)
                }} 
                className={activeInput4 ? [styles.form__buttonModal, styles.form__buttonModalActive].join(' ') : styles.form__buttonModal}>
                  Далее
              </button>
          </ModalLayout>

          <ModalLayout active={modalActive3} setActive={setModalActive3} height="1000">
              <h3 className={styles.form__modalTitle}>Выберите тариф</h3>
              <p className={styles.form__modalSubTitle}>
                Оплатите <span className={styles.form__modalProSpan}>PRO</span> и отправьте заявку сразу всем подходящим исполнителям! Также у вам будут
                доступны контакты всех исполнителей.
              </p>
              <div className={styles.form__buttomTarif}>
                  <div className={[styles.form__buttonTarifItem, styles.form__buttonTarifItemPRO].join(' ')}>
                    <Link to="/profile/selection">
                      <div className={styles.form__tarifBody}>
                        <h3 className={styles.form__tarifTitle}>PRO подписка</h3>
                        <p className={styles.form__tarifSubTitle}>от 1440 ₽/Месяц</p>
                      </div>
                    </Link>
                  </div>
                  <div className={styles.form__buttonTarifItem}>
                    <Link to="/profile/selection">
                      <div className={styles.form__tarifBody}>
                        <h3 className={styles.form__tarifTitle}>PRO на одно ТЗ</h3>
                        <p className={styles.form__tarifSubTitle}>200 ₽</p>
                      </div>
                    </Link>
                  </div>
              </div>
              <div className={styles.form__modalFree}><Link to="/profile/selection">Вы можете также продолжить работать <br /> <span>бесплатно с ограничениями</span></Link></div>
          </ModalLayout>

      </div>
    </Layout>
    </>
   );
}
 
export default CreateOrder;