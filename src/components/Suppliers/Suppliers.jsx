import { useState } from 'react'
import Filters from "./Filters/Filters"
import Cards from './CardsArea/Cards'
import GeoMapArea from './GeoMapArea/GeoMapArea'
import HeaderLanding from '@/layout/HeaderLanding/HeaderLanding.jsx'

import footerStyles from './Footer/Footer.module.scss'
import styles from './Suppliers.module.scss'
import Footer from './Footer/Footer'

const Suppliers = () => {
  const [isFiltersOpen, setFiltersOpen] = useState(false) //!мб временно, потом можно через useDispatch
  const handleFiltersOpen = () => setFiltersOpen(prev => !prev)
  
   return (
      // <div className={styles.container}>
        <>
        <HeaderLanding />
        <Filters open={isFiltersOpen} handleOpen={handleFiltersOpen} query={null} />
        <div className={styles.body}>
          <Cards />
          <GeoMapArea />
          <div className={footerStyles['footer-main-wrapper']}>
            <Footer />
          </div>
        </div>
        </>
      // </div>
   )
}
export default Suppliers