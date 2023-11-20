import HeaderProfile from '@components/HeaderProfile/HeaderProfile';
import styles from './CreateOrder.module.scss'

import TitleProfile from "@components/TitleProfile/TitleProfile";
import Layout from "@layout/Layout";
import ModalLayout from '@layout/Modal/ModalLayout'
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import getPropObject from "@/utils/services/createOrder/fetchOrderData.js";

const CreateOrder = () => {
    const [typeActive, setTypeActive] = useState([false, false]);
    const handleTypeClick = (index) => {
        console.log(typeActive, index)
        setTypeActive((prev) => {
            console.log(prev)
            return prev.map((_, i) => i === index)
        });
    }


    const [visibleLists, setVisibleLists] = useState(Array(6).fill(false));
    const [inputValues, setInputValues] = useState(Array(6).fill('нажмите для выбора'));

    const clickMenu = (index) => (e) => {
        setInputValues(prev => prev.map((value, i) => (i === index ? e.target.innerHTML : value)));
        setVisibleLists(prev => prev.map((value, i) => (i === index ? false : value)));
    };

    const [pol, setPol] = useState([])
    const [priceSegment, setPriceSegment] = useState([])
    const [regularZakaz, setRegularZakaz] = useState([])
    const [sezons, setSezons] = useState([])
    const [sferaPrim, setSferaPrim] = useState([])
    const [tipOdejdy, setTipOdejdy] = useState([])
    const [vidOdejdy, setVidOdejdy] = useState([])
    const [vidPostavki, setVidPostavki] = useState([])
    const [vidProduct, setVidProduct] = useState([])

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

    const [visibleControlImage, setVisibleControlImage] = useState(false)
    const [preview, setPreview] = useState([]);

    const fileobj= [];

    const changedHandler = (e) => {
        let files = e.target.files;
        fileobj.push(files);
        let reader;

        for (var i = 0; i < fileobj[0].length; i++) {
            reader = new FileReader();
            reader.readAsDataURL(fileobj[0][i]);
            reader.onload = e => {
            preview.push(e.target.result);   // обновить массив вместо замены всего значения превью

            setPreview([...new Set(preview)]); // spread into a new array to trigger rerender
            } 
        } 
    }

    const deleteImage=(e)=>{
      const index = e.target.id;
      let newPreview = [...preview];
      newPreview.splice(index, 1);

      setPreview(newPreview);
    }

  /* ============= Preview images upload =========== */

    const [modalActive, setModalActive] = useState(false)
    const [modalActive2, setModalActive2] = useState(false)
    const [modalActive3, setModalActive3] = useState(false)

  /*==============================================*/
    const optionStatePairs = [
            [setPol, 'spr_pol'],
            [setPriceSegment, 'spr_price_segment'],
            [setRegularZakaz, 'spr_regular_zakaz'],
            [setSezons, 'spr_sezons'],
            [setSferaPrim, 'spr_sfera_prim'],
            [setTipOdejdy, 'spr_tip_odejdy'],
            [setVidOdejdy, 'spr_vid_odejdy'],
            [setVidPostavki, 'spr_vid_postavki'],
            [setVidProduct, 'spr_vid_product'],
    ]

    useEffect(() => {
        async function loadOptions() {
            try {
                const options = await getPropObject();
                console.log(options);
                const labels = {
                    spr_pol: "Пол",
                    spr_price_segment: "Ценовой сегмент",
                    spr_regular_zakaz: "Обычный заказ",
                    spr_sezons: "Сезоны",
                    spr_sfera_prim: "Сфера применения",
                    spr_tip_odejdy: "Тип одежды",
                    spr_vid_odejdy: "Вид одежды",
                    spr_vid_postavki: "Вид поставки",
                    spr_vid_product: "Вид продукта",
                };

                for (const [setState, propName] of optionStatePairs) {
                    const label = labels[propName] || propName;

                    setState({
                        label,
                        options: options[propName],
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        loadOptions();
    }, []);

    const formInputs = useMemo(() => {
        return {
            pol,
            priceSegment,
            regularZakaz,
            sezons,
            sferaPrim,
            tipOdejdy,
            vidOdejdy,
            vidPostavki,
            vidProduct
        };
    }, [pol, priceSegment, regularZakaz, sezons, sferaPrim, tipOdejdy, vidOdejdy, vidPostavki, vidProduct]);


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

        <div className={styles.createOrder__order}>
          <div className={styles.createOrder__type}>
            <div className={styles.createOrder__typeTitle}>Вид продукции</div>
              {
                  formInputs.vidProduct.options && Object.entries(formInputs.vidProduct.options).map(([value, num], index) => {
                      return (
                          <div
                              key={index}
                              onClick={() => handleTypeClick(index)}
                              className={typeActive[index] ? [styles.createOrder__typeItem, styles.createOrder__typeItem_active].join(' ')
                                  :
                                  styles.createOrder__typeItem}
                          >
                              {value}
                          </div>
                      )
                  })
              }
            {/*<div onClick={activeType1} className={typeActive1 ? [styles.createOrder__typeItem, styles.createOrder__typeItem_active].join(' ') : styles.createOrder__typeItem}>одежда</div>*/}
            {/*<div onClick={activeType2} className={typeActive2 ? [styles.createOrder__typeItem, styles.createOrder__typeItem_active].join(' ') : styles.createOrder__typeItem}>другие виды изделий</div>*/}
            {/*{typeActive1 || typeActive2 */}
            {/*  ?*/}
            {/*    <div className={styles.createOrder__typeWarning}>От вида продукции зависят остальные параметры заказа.</div>*/}
            {/*  :*/}
            {/*    null*/}
            {/*}*/}
          </div>
            <div className={styles.createOrder__content}>
              <div className={styles.createOrder__body}>
                  {
                          <form className={styles.form}>
                            <div className={styles.form__content}>
                                <div className={styles.form__row}>
                                    <div className={styles.form__title}>Основная информация</div>
                                    <div className={styles.form__items}>
                                        {[formInputs.tipOdejdy, formInputs.sferaPrim, formInputs.vidOdejdy, formInputs.pol, formInputs.sezons].map((values, index) => (
                                            <div key={index} className={styles.form__item}>
                                                <h3 className={styles.form__itemLabel}>
                                                    <span>{values.label}</span> <span className={styles.form__itemLabel_star}>*</span>
                                                </h3>
                                                <div
                                                    onClick={() => setVisibleLists(prev => prev.map((value, i) => (i === index ? !value : value)))}
                                                    className={inputValues[index] !== 'нажмите для выбора' ? [styles.form__control, styles.form__controlActiveBlue].join(' ') : styles.form__control}
                                                >
                                                    {inputValues[index]}
                                                </div>
                                                <div className={visibleLists[index] ? [styles.form__list, styles.form__list_active].join(' ') : styles.form__list}>
                                                    {values.options && Object.entries(values.options).map(([value, num], i) => (
                                                        <div key={i} onClick={clickMenu(index, values.options)} className={styles.form__listItem}>
                                                            {value}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                              {/*<div className={styles.form__row}>*/}
                              {/*  <div className={styles.form__title}>Дополнительная информация</div>*/}
                              {/*  <div className={styles.form__items}>*/}
                              {/*    <div className={styles.form__item}>*/}
                              {/*      <h3 className={styles.form__itemLabel}>*/}
                              {/*        <span>Плановый бюджет</span>*/}
                              {/*        <div className={styles.form__itemLabelPro}>*/}
                              {/*          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="14" viewBox="0 0 28 14" fill="none">*/}
                              {/*            <rect width="28" height="14" rx="3" fill="url(#paint0_linear_408_56651)"/>*/}
                              {/*            <path d="M8.36991 7.83824H6.81923V6.89973H8.36991C8.60954 6.89973 8.8046 6.8623 8.95507 6.78743C9.10554 6.70989 9.2156 6.60294 9.28527 6.46658C9.35493 6.33021 9.38976 6.17647 9.38976 6.00535C9.38976 5.83155 9.35493 5.66979 9.28527 5.52005C9.2156 5.37032 9.10554 5.25 8.95507 5.15909C8.8046 5.06818 8.60954 5.02273 8.36991 5.02273H7.25392V9.91979H6V4.08021H8.36991C8.8464 4.08021 9.25462 4.1631 9.59457 4.32888C9.9373 4.49198 10.1992 4.71791 10.3804 5.00668C10.5615 5.29545 10.652 5.62567 10.652 5.99733C10.652 6.37433 10.5615 6.70053 10.3804 6.97594C10.1992 7.25134 9.9373 7.4639 9.59457 7.61364C9.25462 7.76337 8.8464 7.83824 8.36991 7.83824Z" fill="#F5F5F5"/>*/}
                              {/*            <path d="M11.5172 4.08021H13.7868C14.2522 4.08021 14.652 4.14706 14.9864 4.28075C15.3236 4.41444 15.5827 4.6123 15.7638 4.87433C15.945 5.13636 16.0355 5.45856 16.0355 5.84091C16.0355 6.15374 15.9798 6.42246 15.8683 6.64706C15.7597 6.86898 15.605 7.05481 15.4044 7.20455C15.2065 7.3516 14.9739 7.46925 14.7064 7.55749L14.3093 7.75802H12.3365L12.3281 6.81952H13.7952C14.0153 6.81952 14.1978 6.78209 14.3427 6.70722C14.4876 6.63235 14.5963 6.52807 14.6688 6.39438C14.744 6.2607 14.7816 6.10561 14.7816 5.92914C14.7816 5.74198 14.7454 5.58021 14.6729 5.44385C14.6005 5.30749 14.4904 5.20321 14.3427 5.13102C14.1951 5.05882 14.0098 5.02273 13.7868 5.02273H12.7712V9.91979H11.5172V4.08021ZM14.9195 9.91979L13.5319 7.31684L14.8568 7.30882L16.2612 9.86364V9.91979H14.9195Z" fill="#F5F5F5"/>*/}
                              {/*            <path d="M22 6.86364V7.14037C22 7.58422 21.9373 7.98262 21.8119 8.33556C21.6865 8.6885 21.5096 8.9893 21.2811 9.23797C21.0526 9.48396 20.7795 9.67246 20.4619 9.80348C20.147 9.93449 19.7973 10 19.4127 10C19.031 10 18.6813 9.93449 18.3636 9.80348C18.0488 9.67246 17.7757 9.48396 17.5444 9.23797C17.3131 8.9893 17.1334 8.6885 17.0052 8.33556C16.8798 7.98262 16.8171 7.58422 16.8171 7.14037V6.86364C16.8171 6.41711 16.8798 6.01872 17.0052 5.66845C17.1306 5.31551 17.3076 5.01471 17.536 4.76604C17.7673 4.51738 18.0404 4.32754 18.3553 4.19652C18.6729 4.06551 19.0226 4 19.4044 4C19.7889 4 20.1386 4.06551 20.4535 4.19652C20.7712 4.32754 21.0442 4.51738 21.2727 4.76604C21.504 5.01471 21.6823 5.31551 21.8077 5.66845C21.9359 6.01872 22 6.41711 22 6.86364ZM20.7335 7.14037V6.85561C20.7335 6.54545 20.7043 6.27273 20.6458 6.03743C20.5873 5.80214 20.5009 5.60428 20.3866 5.44385C20.2724 5.28342 20.1331 5.1631 19.9687 5.08289C19.8042 5 19.6162 4.95856 19.4044 4.95856C19.1926 4.95856 19.0045 5 18.8401 5.08289C18.6785 5.1631 18.5406 5.28342 18.4263 5.44385C18.3149 5.60428 18.2299 5.80214 18.1714 6.03743C18.1129 6.27273 18.0836 6.54545 18.0836 6.85561V7.14037C18.0836 7.44786 18.1129 7.72059 18.1714 7.95856C18.2299 8.19385 18.3163 8.39305 18.4305 8.55615C18.5448 8.71658 18.6841 8.83823 18.8485 8.92112C19.0129 9.00401 19.201 9.04545 19.4127 9.04545C19.6245 9.04545 19.8126 9.00401 19.977 8.92112C20.1414 8.83823 20.2793 8.71658 20.3908 8.55615C20.5023 8.39305 20.5873 8.19385 20.6458 7.95856C20.7043 7.72059 20.7335 7.44786 20.7335 7.14037Z" fill="#F5F5F5"/>*/}
                              {/*            <defs>*/}
                              {/*              <linearGradient id="paint0_linear_408_56651" x1="0" y1="0" x2="28.4235" y2="13.0798" gradientUnits="userSpaceOnUse">*/}
                              {/*                <stop stopColor="#FF961B"/>*/}
                              {/*                <stop offset="1" stopColor="#DA7600"/>*/}
                              {/*              </linearGradient>*/}
                              {/*            </defs>*/}
                              {/*          </svg>*/}
                              {/*        </div>*/}
                              {/*      </h3>*/}
                              {/*      <input */}
                              {/*        onChange={handleInputChange(1)}*/}
                              {/*        className={activeInput1 ? [styles.form__control, styles.form__controlActiveOrange].join(' ') : styles.form__control} */}
                              {/*        placeholder="нажмите для ввода" */}
                              {/*        type="text" */}
                              {/*      />*/}
                              {/*    </div>*/}
                              {/*    <div className={styles.form__item}>*/}
                              {/*      <h3 className={styles.form__itemLabel}>*/}
                              {/*      <span>Срок поставки</span>*/}
                              {/*        <div className={styles.form__itemLabelPro}>*/}
                              {/*          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="14" viewBox="0 0 28 14" fill="none">*/}
                              {/*            <rect width="28" height="14" rx="3" fill="url(#paint0_linear_408_56651)"/>*/}
                              {/*            <path d="M8.36991 7.83824H6.81923V6.89973H8.36991C8.60954 6.89973 8.8046 6.8623 8.95507 6.78743C9.10554 6.70989 9.2156 6.60294 9.28527 6.46658C9.35493 6.33021 9.38976 6.17647 9.38976 6.00535C9.38976 5.83155 9.35493 5.66979 9.28527 5.52005C9.2156 5.37032 9.10554 5.25 8.95507 5.15909C8.8046 5.06818 8.60954 5.02273 8.36991 5.02273H7.25392V9.91979H6V4.08021H8.36991C8.8464 4.08021 9.25462 4.1631 9.59457 4.32888C9.9373 4.49198 10.1992 4.71791 10.3804 5.00668C10.5615 5.29545 10.652 5.62567 10.652 5.99733C10.652 6.37433 10.5615 6.70053 10.3804 6.97594C10.1992 7.25134 9.9373 7.4639 9.59457 7.61364C9.25462 7.76337 8.8464 7.83824 8.36991 7.83824Z" fill="#F5F5F5"/>*/}
                              {/*            <path d="M11.5172 4.08021H13.7868C14.2522 4.08021 14.652 4.14706 14.9864 4.28075C15.3236 4.41444 15.5827 4.6123 15.7638 4.87433C15.945 5.13636 16.0355 5.45856 16.0355 5.84091C16.0355 6.15374 15.9798 6.42246 15.8683 6.64706C15.7597 6.86898 15.605 7.05481 15.4044 7.20455C15.2065 7.3516 14.9739 7.46925 14.7064 7.55749L14.3093 7.75802H12.3365L12.3281 6.81952H13.7952C14.0153 6.81952 14.1978 6.78209 14.3427 6.70722C14.4876 6.63235 14.5963 6.52807 14.6688 6.39438C14.744 6.2607 14.7816 6.10561 14.7816 5.92914C14.7816 5.74198 14.7454 5.58021 14.6729 5.44385C14.6005 5.30749 14.4904 5.20321 14.3427 5.13102C14.1951 5.05882 14.0098 5.02273 13.7868 5.02273H12.7712V9.91979H11.5172V4.08021ZM14.9195 9.91979L13.5319 7.31684L14.8568 7.30882L16.2612 9.86364V9.91979H14.9195Z" fill="#F5F5F5"/>*/}
                              {/*            <path d="M22 6.86364V7.14037C22 7.58422 21.9373 7.98262 21.8119 8.33556C21.6865 8.6885 21.5096 8.9893 21.2811 9.23797C21.0526 9.48396 20.7795 9.67246 20.4619 9.80348C20.147 9.93449 19.7973 10 19.4127 10C19.031 10 18.6813 9.93449 18.3636 9.80348C18.0488 9.67246 17.7757 9.48396 17.5444 9.23797C17.3131 8.9893 17.1334 8.6885 17.0052 8.33556C16.8798 7.98262 16.8171 7.58422 16.8171 7.14037V6.86364C16.8171 6.41711 16.8798 6.01872 17.0052 5.66845C17.1306 5.31551 17.3076 5.01471 17.536 4.76604C17.7673 4.51738 18.0404 4.32754 18.3553 4.19652C18.6729 4.06551 19.0226 4 19.4044 4C19.7889 4 20.1386 4.06551 20.4535 4.19652C20.7712 4.32754 21.0442 4.51738 21.2727 4.76604C21.504 5.01471 21.6823 5.31551 21.8077 5.66845C21.9359 6.01872 22 6.41711 22 6.86364ZM20.7335 7.14037V6.85561C20.7335 6.54545 20.7043 6.27273 20.6458 6.03743C20.5873 5.80214 20.5009 5.60428 20.3866 5.44385C20.2724 5.28342 20.1331 5.1631 19.9687 5.08289C19.8042 5 19.6162 4.95856 19.4044 4.95856C19.1926 4.95856 19.0045 5 18.8401 5.08289C18.6785 5.1631 18.5406 5.28342 18.4263 5.44385C18.3149 5.60428 18.2299 5.80214 18.1714 6.03743C18.1129 6.27273 18.0836 6.54545 18.0836 6.85561V7.14037C18.0836 7.44786 18.1129 7.72059 18.1714 7.95856C18.2299 8.19385 18.3163 8.39305 18.4305 8.55615C18.5448 8.71658 18.6841 8.83823 18.8485 8.92112C19.0129 9.00401 19.201 9.04545 19.4127 9.04545C19.6245 9.04545 19.8126 9.00401 19.977 8.92112C20.1414 8.83823 20.2793 8.71658 20.3908 8.55615C20.5023 8.39305 20.5873 8.19385 20.6458 7.95856C20.7043 7.72059 20.7335 7.44786 20.7335 7.14037Z" fill="#F5F5F5"/>*/}
                              {/*            <defs>*/}
                              {/*              <linearGradient id="paint0_linear_408_56651" x1="0" y1="0" x2="28.4235" y2="13.0798" gradientUnits="userSpaceOnUse">*/}
                              {/*                <stop stopColor="#FF961B"/>*/}
                              {/*                <stop offset="1" stopColor="#DA7600"/>*/}
                              {/*              </linearGradient>*/}
                              {/*            </defs>*/}
                              {/*          </svg>*/}
                              {/*        </div>*/}
                              {/*      </h3>*/}
                              {/*      <input */}
                              {/*        onChange={handleInputChange(2)}*/}
                              {/*        className={activeInput2 ? [styles.form__control, styles.form__controlActiveOrange].join(' ') : styles.form__control} */}
                              {/*        placeholder="нажмите для ввода" */}
                              {/*        type="text" */}
                              {/*      />*/}
                              {/*    </div>*/}
                              {/*    <div className={styles.form__item}>*/}
                              {/*      <h3 className={styles.form__itemLabel}>*/}
                              {/*        <span>Доп нанесения</span>*/}
                              {/*        <div className={styles.form__itemLabelPro}>*/}
                              {/*          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="14" viewBox="0 0 28 14" fill="none">*/}
                              {/*            <rect width="28" height="14" rx="3" fill="url(#paint0_linear_408_56651)"/>*/}
                              {/*            <path d="M8.36991 7.83824H6.81923V6.89973H8.36991C8.60954 6.89973 8.8046 6.8623 8.95507 6.78743C9.10554 6.70989 9.2156 6.60294 9.28527 6.46658C9.35493 6.33021 9.38976 6.17647 9.38976 6.00535C9.38976 5.83155 9.35493 5.66979 9.28527 5.52005C9.2156 5.37032 9.10554 5.25 8.95507 5.15909C8.8046 5.06818 8.60954 5.02273 8.36991 5.02273H7.25392V9.91979H6V4.08021H8.36991C8.8464 4.08021 9.25462 4.1631 9.59457 4.32888C9.9373 4.49198 10.1992 4.71791 10.3804 5.00668C10.5615 5.29545 10.652 5.62567 10.652 5.99733C10.652 6.37433 10.5615 6.70053 10.3804 6.97594C10.1992 7.25134 9.9373 7.4639 9.59457 7.61364C9.25462 7.76337 8.8464 7.83824 8.36991 7.83824Z" fill="#F5F5F5"/>*/}
                              {/*            <path d="M11.5172 4.08021H13.7868C14.2522 4.08021 14.652 4.14706 14.9864 4.28075C15.3236 4.41444 15.5827 4.6123 15.7638 4.87433C15.945 5.13636 16.0355 5.45856 16.0355 5.84091C16.0355 6.15374 15.9798 6.42246 15.8683 6.64706C15.7597 6.86898 15.605 7.05481 15.4044 7.20455C15.2065 7.3516 14.9739 7.46925 14.7064 7.55749L14.3093 7.75802H12.3365L12.3281 6.81952H13.7952C14.0153 6.81952 14.1978 6.78209 14.3427 6.70722C14.4876 6.63235 14.5963 6.52807 14.6688 6.39438C14.744 6.2607 14.7816 6.10561 14.7816 5.92914C14.7816 5.74198 14.7454 5.58021 14.6729 5.44385C14.6005 5.30749 14.4904 5.20321 14.3427 5.13102C14.1951 5.05882 14.0098 5.02273 13.7868 5.02273H12.7712V9.91979H11.5172V4.08021ZM14.9195 9.91979L13.5319 7.31684L14.8568 7.30882L16.2612 9.86364V9.91979H14.9195Z" fill="#F5F5F5"/>*/}
                              {/*            <path d="M22 6.86364V7.14037C22 7.58422 21.9373 7.98262 21.8119 8.33556C21.6865 8.6885 21.5096 8.9893 21.2811 9.23797C21.0526 9.48396 20.7795 9.67246 20.4619 9.80348C20.147 9.93449 19.7973 10 19.4127 10C19.031 10 18.6813 9.93449 18.3636 9.80348C18.0488 9.67246 17.7757 9.48396 17.5444 9.23797C17.3131 8.9893 17.1334 8.6885 17.0052 8.33556C16.8798 7.98262 16.8171 7.58422 16.8171 7.14037V6.86364C16.8171 6.41711 16.8798 6.01872 17.0052 5.66845C17.1306 5.31551 17.3076 5.01471 17.536 4.76604C17.7673 4.51738 18.0404 4.32754 18.3553 4.19652C18.6729 4.06551 19.0226 4 19.4044 4C19.7889 4 20.1386 4.06551 20.4535 4.19652C20.7712 4.32754 21.0442 4.51738 21.2727 4.76604C21.504 5.01471 21.6823 5.31551 21.8077 5.66845C21.9359 6.01872 22 6.41711 22 6.86364ZM20.7335 7.14037V6.85561C20.7335 6.54545 20.7043 6.27273 20.6458 6.03743C20.5873 5.80214 20.5009 5.60428 20.3866 5.44385C20.2724 5.28342 20.1331 5.1631 19.9687 5.08289C19.8042 5 19.6162 4.95856 19.4044 4.95856C19.1926 4.95856 19.0045 5 18.8401 5.08289C18.6785 5.1631 18.5406 5.28342 18.4263 5.44385C18.3149 5.60428 18.2299 5.80214 18.1714 6.03743C18.1129 6.27273 18.0836 6.54545 18.0836 6.85561V7.14037C18.0836 7.44786 18.1129 7.72059 18.1714 7.95856C18.2299 8.19385 18.3163 8.39305 18.4305 8.55615C18.5448 8.71658 18.6841 8.83823 18.8485 8.92112C19.0129 9.00401 19.201 9.04545 19.4127 9.04545C19.6245 9.04545 19.8126 9.00401 19.977 8.92112C20.1414 8.83823 20.2793 8.71658 20.3908 8.55615C20.5023 8.39305 20.5873 8.19385 20.6458 7.95856C20.7043 7.72059 20.7335 7.44786 20.7335 7.14037Z" fill="#F5F5F5"/>*/}
                              {/*            <defs>*/}
                              {/*              <linearGradient id="paint0_linear_408_56651" x1="0" y1="0" x2="28.4235" y2="13.0798" gradientUnits="userSpaceOnUse">*/}
                              {/*                <stop stopColor="#FF961B"/>*/}
                              {/*                <stop offset="1" stopColor="#DA7600"/>*/}
                              {/*              </linearGradient>*/}
                              {/*            </defs>*/}
                              {/*          </svg>*/}
                              {/*        </div>*/}
                              {/*      </h3>*/}
                              {/*      <div */}
                              {/*        onClick={() => setVisibleList4(!visibleList4)} */}
                              {/*        className={valueInput6 !== 'нажмите для выбора' ? [styles.form__control, styles.form__controlActiveOrange].join(' ') : styles.form__control}>*/}
                              {/*          {valueInput6}*/}
                              {/*      </div>*/}
                              {/*      <div className={visibleList6 ? [styles.form__list, styles.form__list_active].join(' ') : styles.form__list}>*/}
                              {/*        {additionally.map((elem, index) => {*/}
                              {/*          return ( */}
                              {/*          <div key={index} onClick={clickMenu6} className={styles.form__listItem}>{elem}</div>*/}
                              {/*        )})}*/}
                              {/*      </div>*/}
                              {/*    </div>*/}
                              {/*  </div>*/}
                              {/*</div>*/}

                              <div className={styles.form__row}>
                                <div className={styles.form__title}>Фото изделия</div>
                                <form className={styles.form__imagesForm} method="post" encType="multipart/form-data">
                                  <div className={styles.form__imagesBlockPreview}>
                                    {(preview || []).map((url, index) => (
                                      <div className={styles.form__imageItem} key={index} onMouseEnter={() => setVisibleControlImage(true)} onMouseLeave={() => setVisibleControlImage(false)}>
                                        <img src={url} alt="img"  className={styles.form__imagePreview}/>
                                        <div id={index} onClick={deleteImage} className={visibleControlImage ? [styles.form__deleteImage, styles.form__deleteImageActive].join(' ') : styles.form__deleteImage}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.01007 5.00009L9.79072 1.21944C10.07 0.940162 10.07 0.488741 9.79072 0.209461C9.51144 -0.0698202 9.06002 -0.0698202 8.78074 0.209461L5.00009 3.99011L1.21944 0.209461C0.940162 -0.0698202 0.488741 -0.0698202 0.209461 0.209461C-0.0698202 0.488741 -0.0698202 0.940162 0.209461 1.21944L3.99011 5.00009L0.209461 8.78074C-0.0698202 9.06002 -0.0698202 9.51144 0.209461 9.79072C0.348744 9.93 0.531598 10 0.714452 10C0.897305 10 1.08016 9.93 1.21944 9.79072L5.00009 6.01007L8.78074 9.79072C8.92002 9.93 9.10287 10 9.28573 10C9.46858 10 9.65144 9.93 9.79072 9.79072C10.07 9.51144 10.07 9.06002 9.79072 8.78074L6.01007 5.00009Z" fill="#FF0A00"/>
                                          </svg>
                                        </div>
                                      </div>
                                    ))}
                                    <div className={styles.form__addButton}>
                                      <div className={styles.form__inputImages}>
                                        <input type="file"  name="file" multiple onChange={changedHandler} />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="33" viewBox="0 0 36 33" fill="none">
                                          <path fillRule="evenodd" clipRule="evenodd" d="M27.792 5.82553C27.864 5.95139 27.99 6.04129 28.152 6.04129C32.472 6.04129 36 9.56537 36 13.8806V24.5607C36 28.8759 32.472 32.4 28.152 32.4H7.848C3.51 32.4 0 28.8759 0 24.5607V13.8806C0 9.56537 3.51 6.04129 7.848 6.04129C7.992 6.04129 8.136 5.96937 8.19 5.82553L8.298 5.60977C8.36005 5.47916 8.42374 5.34502 8.48839 5.20884C8.94887 4.2389 9.45832 3.16584 9.774 2.53518C10.602 0.916981 12.006 0.01798 13.752 0H22.23C23.976 0.01798 25.398 0.916981 26.226 2.53518C26.5095 3.10156 26.9414 4.01387 27.3577 4.89318C27.4436 5.07463 27.5289 5.25466 27.612 5.42997L27.792 5.82553ZM26.478 12.7297C26.478 13.6287 27.198 14.3479 28.098 14.3479C28.998 14.3479 29.736 13.6287 29.736 12.7297C29.736 11.8307 28.998 11.0935 28.098 11.0935C27.198 11.0935 26.478 11.8307 26.478 12.7297ZM14.886 15.5166C15.732 14.6716 16.83 14.2221 18 14.2221C19.17 14.2221 20.268 14.6716 21.096 15.4986C21.924 16.3257 22.374 17.4225 22.374 18.5912C22.356 21.0005 20.412 22.9604 18 22.9604C16.83 22.9604 15.732 22.5108 14.904 21.6838C14.076 20.8567 13.626 19.7599 13.626 18.5912V18.5732C13.608 17.4405 14.058 16.3437 14.886 15.5166ZM22.986 23.5896C21.708 24.8662 19.944 25.6573 18 25.6573C16.11 25.6573 14.346 24.9202 12.996 23.5896C11.664 22.2411 10.926 20.4791 10.926 18.5912C10.908 16.7213 11.646 14.9592 12.978 13.6107C14.328 12.2622 16.11 11.525 18 11.525C19.89 11.525 21.672 12.2622 23.004 13.5928C24.336 14.9413 25.074 16.7213 25.074 18.5912C25.056 20.551 24.264 22.3131 22.986 23.5896Z" fill="#242424"/>
                                        </svg>
                                        <span>нажмите для <br /> загрузки</span>
                                      </div>
                                    <div className={styles.form__prompt}>
                                      <h4 className={styles.form__promptTitle}>Добавьте <br /> фото или файлы</h4>
                                      <div className={styles.form__size}>до 250 МБ</div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                              </div>
                            </div>
                          </form>
                  }
                {/*:*/}
                {/*  <div className={styles.createOrder__noTypeActive}>*/}
                {/*    <h2 className={styles.createOrder__warningTitle}>Выберите нужный вид пошива.</h2>*/}
                {/*    <p className={styles.createOrder__warningsubTitle}>От этого будут зависить другие дополнительные <br /> характеристики вашего пошива.</p>*/}
                {/*  </div>*/}
                {/*}*/}
              </div>
            </div>
        </div>
        <div className={styles.form__button}>
          <div className={styles.form__buttonBack}>Назад</div>
          <button
            // onClick={() => setModalActive(!modalActive)}
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
          </button>
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