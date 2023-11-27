import Layout from "@layout/Layout";

import styles from './Selection.module.scss'

import TitleProfile from "@components/TitleProfile/TitleProfile";
import HeaderProfile from "@components/HeaderProfile/HeaderProfile";
import SelectionCard from "@components/SelectionCard/SelectionCard";
import {Link} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios"

const Selection = () => {
  const [choice, setChoice] = useState(false)
  const [companiesID, setCompaniesID] = useState([])
  // const companies = useSelector((state) => state.companies.companiesID)

  const getCompanies = useCallback( async () => {
    try {
      const companies = axios
          .get('https://api.legpromrf.ru/company/test')
          .then((response) => {
            console.log(response)
            return response.data
          })
    } catch (error) {
      console.log(error)
      throw new error
    }
      }, [])

  useEffect(() => {
    getCompanies()
  }, [getCompanies]);


  return ( 

    <Layout>
      <div className={styles.selection}>
        <TitleProfile>Подбор исполнителя</TitleProfile>
        <div className={styles.selection__header}>
          <HeaderProfile title="Поставка материала" number="1" href='/profile/applications' active={true}/>
          <HeaderProfile title="Пошив изделия" number="2" href='/profile/tailoring' active={false}/>
          <HeaderProfile title="Сдача заказа" number="3"  href='/profile/change' active={false}/>
        </div>
        <div className={styles.selection__content}>
            <div className={styles.selection__info}>
              <div className={styles.selection__name}>Ваше ТЗ:  Пошив платья для официантов</div>
              <div className={styles.selection__number}>№24500968</div>
            </div>
            <div className={styles.selection__control}>
              <div className={styles.selection__items}>
                <div className={styles.selection__controlItem}>
                  <Link to="/profile/checkTz/">
                    <div className={styles.selection__controlTitle}>Просмотреть ТЗ</div>
                    <div className={styles.selection__controlIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.74318 1.00781H3.46528C2.14133 1.00781 1 2.09835 1 3.44438V10.4444C1 11.8662 2.06674 12.9999 3.46528 12.9999H8.60224C9.92683 12.9999 11 11.791 11 10.4444V4.4552L7.74318 1.00781Z" stroke="#242424" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.5752 1V2.90077C7.5752 3.82861 8.31401 4.58134 9.22643 4.5833C10.0733 4.58526 10.9394 4.58591 10.9979 4.58199" stroke="#242424" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.45174 9.3687H3.98145" stroke="#242424" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.13839 6.13335H3.98047" stroke="#242424" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </Link>
                </div>
                <div className={styles.selection__controlItem}>
                  <Link to="/profile/order/createorder/">
                    <div className={styles.selection__controlTitle}>Редактировать ТЗ</div>
                    <div className={styles.selection__controlIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <mask id="path-1-inside-1_412_64201" fill="white">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4 10.8C11.7314 10.8 12 11.0687 12 11.4C12 11.7314 11.7314 12 11.4 12H0.6C0.268629 12 0 11.7314 0 11.4C0 11.0687 0.268629 10.8 0.6 10.8H11.4ZM2.57613 6.77588L9.17613 0.17574C9.39242 -0.0405553 9.73276 -0.0571934 9.96813 0.125825L10.0247 0.17574L11.8247 1.97578C12.0409 2.19207 12.0576 2.53242 11.8746 2.7678L11.8247 2.82432L5.22465 9.42446C5.13089 9.51823 5.00928 9.57776 4.87926 9.595L4.80039 9.6002H3.00039C2.69269 9.6002 2.43909 9.36857 2.40443 9.07016L2.40039 9.00019V7.20015C2.40039 7.06754 2.44429 6.93946 2.52404 6.83533L2.57613 6.77588L9.17613 0.17574L2.57613 6.77588ZM9.59943 1.44873L3.59943 7.44886V8.40035H4.5509L10.5509 2.40022L9.59943 1.44873Z"/>
                        </mask>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4 10.8C11.7314 10.8 12 11.0687 12 11.4C12 11.7314 11.7314 12 11.4 12H0.6C0.268629 12 0 11.7314 0 11.4C0 11.0687 0.268629 10.8 0.6 10.8H11.4ZM2.57613 6.77588L9.17613 0.17574C9.39242 -0.0405553 9.73276 -0.0571934 9.96813 0.125825L10.0247 0.17574L11.8247 1.97578C12.0409 2.19207 12.0576 2.53242 11.8746 2.7678L11.8247 2.82432L5.22465 9.42446C5.13089 9.51823 5.00928 9.57776 4.87926 9.595L4.80039 9.6002H3.00039C2.69269 9.6002 2.43909 9.36857 2.40443 9.07016L2.40039 9.00019V7.20015C2.40039 7.06754 2.44429 6.93946 2.52404 6.83533L2.57613 6.77588L9.17613 0.17574L2.57613 6.77588ZM9.59943 1.44873L3.59943 7.44886V8.40035H4.5509L10.5509 2.40022L9.59943 1.44873Z" fill="#242424"/>
                        <path d="M9.17613 0.17574L9.11629 0.115908L9.17613 0.17574ZM9.96813 0.125825L10.0242 0.062276L10.0201 0.0590272L9.96813 0.125825ZM10.0247 0.17574L10.0846 0.115793L10.0807 0.112314L10.0247 0.17574ZM11.8247 1.97578L11.8845 1.91595L11.8247 1.97578ZM11.8746 2.7678L11.9381 2.82391L11.9414 2.81974L11.8746 2.7678ZM11.8247 2.82432L11.8846 2.88427L11.8881 2.88033L11.8247 2.82432ZM4.87926 9.595L4.88484 9.67962L4.89038 9.67888L4.87926 9.595ZM4.80039 9.6002V9.685L4.80596 9.68464L4.80039 9.6002ZM2.40443 9.07016L2.31981 9.07505L2.32038 9.07993L2.40443 9.07016ZM2.40039 9.00019H2.31563L2.31592 9.00506L2.40039 9.00019ZM2.52404 6.83533L2.46026 6.77944L2.45686 6.78388L2.52404 6.83533ZM2.57613 6.77588L2.51616 6.71592L2.51248 6.72012L2.57613 6.77588ZM9.59943 1.44873L9.65927 1.3889L9.59943 1.32906L9.5396 1.3889L9.59943 1.44873ZM3.59943 7.44886L3.5396 7.38903L3.51482 7.41381V7.44886H3.59943ZM3.59943 8.40035H3.51482V8.48497H3.59943V8.40035ZM4.5509 8.40035V8.48497H4.58595L4.61074 8.46018L4.5509 8.40035ZM10.5509 2.40022L10.6107 2.46005L10.6706 2.40022L10.6107 2.34039L10.5509 2.40022ZM11.4 10.8846C11.6846 10.8846 11.9154 11.1154 11.9154 11.4H12.0846C12.0846 11.0219 11.7781 10.7154 11.4 10.7154V10.8846ZM11.9154 11.4C11.9154 11.6847 11.6846 11.9154 11.4 11.9154V12.0847C11.7781 12.0847 12.0846 11.7781 12.0846 11.4H11.9154ZM11.4 11.9154H0.6V12.0847H11.4V11.9154ZM0.6 11.9154C0.315363 11.9154 0.0846154 11.6847 0.0846154 11.4H-0.0846154C-0.0846154 11.7781 0.221896 12.0847 0.6 12.0847V11.9154ZM0.0846154 11.4C0.0846154 11.1154 0.315363 10.8846 0.6 10.8846V10.7154C0.221896 10.7154 -0.0846154 11.0219 -0.0846154 11.4H0.0846154ZM0.6 10.8846H11.4V10.7154H0.6V10.8846ZM2.63596 6.83571L9.23596 0.235571L9.11629 0.115908L2.51629 6.71605L2.63596 6.83571ZM9.23596 0.235571C9.4217 0.0498247 9.71408 0.035469 9.91619 0.192624L10.0201 0.0590272C9.75143 -0.149856 9.36313 -0.130935 9.11629 0.115908L9.23596 0.235571ZM9.91212 0.189251L9.96865 0.239165L10.0807 0.112314L10.0241 0.0623999L9.91212 0.189251ZM9.96482 0.235571L11.7648 2.03561L11.8845 1.91595L10.0845 0.115908L9.96482 0.235571ZM11.7648 2.03561C11.9506 2.22136 11.9649 2.51374 11.8078 2.71586L11.9414 2.81974C12.1502 2.55109 12.1313 2.16279 11.8845 1.91595L11.7648 2.03561ZM11.8111 2.71179L11.7612 2.76832L11.8881 2.88033L11.938 2.82381L11.8111 2.71179ZM11.7648 2.76449L5.16482 9.36463L5.28449 9.4843L11.8845 2.88416L11.7648 2.76449ZM5.16482 9.36463C5.08428 9.44518 4.97982 9.49631 4.86814 9.51112L4.89038 9.67888C5.03873 9.65921 5.17749 9.59129 5.28449 9.4843L5.16482 9.36463ZM4.87369 9.51057L4.79482 9.51577L4.80596 9.68464L4.88483 9.67943L4.87369 9.51057ZM4.80039 9.51559H3.00039V9.68482H4.80039V9.51559ZM3.00039 9.51559C2.73614 9.51559 2.51824 9.31664 2.48848 9.0604L2.32038 9.07993C2.35993 9.42051 2.64923 9.68482 3.00039 9.68482V9.51559ZM2.4889 9.06529L2.48487 8.99532L2.31592 9.00506L2.31995 9.07504L2.4889 9.06529ZM2.48501 9.00019V7.20015H2.31578V9.00019H2.48501ZM2.48501 7.20015C2.48501 7.08625 2.52271 6.97622 2.59122 6.88678L2.45686 6.78388C2.36587 6.90269 2.31578 7.04884 2.31578 7.20015H2.48501ZM2.58768 6.89109L2.63977 6.83164L2.51248 6.72012L2.4604 6.77956L2.58768 6.89109ZM2.63596 6.83571L9.23596 0.235571L9.11629 0.115908L2.51629 6.71605L2.63596 6.83571ZM9.11629 0.115908L2.51629 6.71605L2.63596 6.83571L9.23596 0.235571L9.11629 0.115908ZM9.5396 1.3889L3.5396 7.38903L3.65927 7.50869L9.65927 1.50856L9.5396 1.3889ZM3.51482 7.44886V8.40035H3.68405V7.44886H3.51482ZM3.59943 8.48497H4.5509V8.31573H3.59943V8.48497ZM4.61074 8.46018L10.6107 2.46005L10.4911 2.34039L4.49107 8.34052L4.61074 8.46018ZM10.6107 2.34039L9.65927 1.3889L9.5396 1.50856L10.4911 2.46005L10.6107 2.34039Z" fill="#EDEDED" mask="url(#path-1-inside-1_412_64201)"/>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
              {
                choice ? 
                  <div className={styles.selection__respond}><Link href="/profile/selection/">Отправить выбранным</Link></div>
                :
                  <div className={styles.selection__respond_orange}><Link href="/profile/selection/">Отправить заявку всем</Link></div>  
              }
              
            </div>
          </div>
          <div className={styles.selection__search}>
            <span>Найдено 56 исполнителей согласно критериям:</span>
            {
              choice 
              ?
                <div onClick={() => setChoice(false)} className={styles.selection__searchBtn}>Отменить выбор</div>
              :
                <div onClick={() => setChoice(!choice)} className={styles.selection__searchBtnChoice}>Выбрать несколько</div>
            }
            
          </div>
          <div className={styles.selection__cardList}>
            <SelectionCard recommendation={true} choice={choice}/>
            <SelectionCard recommendation={true} choice={choice}/>
            <SelectionCard recommendation={true} choice={choice}/>
            <SelectionCard choice={choice}/>
            <SelectionCard choice={choice}/>
            <SelectionCard choice={choice}/>
            <SelectionCard choice={choice}/>
            <SelectionCard choice={choice}/>
            <SelectionCard choice={choice}/>
            <SelectionCard choice={choice}/>
          </div>
      </div>
    </Layout>
   );
}
 
export default Selection;