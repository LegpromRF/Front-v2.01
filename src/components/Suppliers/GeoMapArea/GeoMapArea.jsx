import { useEffect, useMemo } from 'react'
import styles from './GeoMapArea.module.scss'
import footerStyles from "../Footer/Footer.module.scss";
import Footer from '../Footer/Footer'

const GeoMapArea = () => {
   useEffect(() => {
      const initMap = () => {
         const ymaps = window.ymaps;
         let myMap = null
         if (ymaps.Map) myMap = new ymaps.Map("map", {
            center: [55, 60],
            zoom: 4,
            controls: [],
            duration: 500
        }, {
            minZoom: 2,
            maxZoom: 22
        })
      //   console.log('myMap', myMap);
      }
      initMap()
   }, [])

   const mapSizesStyle = useMemo(() => {
      const breakpoint = 1280 // 1280px - длина окна при котором меняется сетка (из scss файла)
      const screenWidth = window.screen.width
      const paddingX = 10 //(из scss файла)
      if (screenWidth <= breakpoint) {
         return { width: (screenWidth - paddingX*2)+'px', height: '100%' }
      } else {
         const mapAreaWidth = screenWidth * 0.6 // по grid посеву - зона с картой занимает 60%
         return { width: (mapAreaWidth - paddingX*2)+'px', height: '100%' }
      }
   }, [window.screen.width])
   
   return (
         <>
      <div className={styles.container}>
         <div className={styles['map-wrapper']}>
           <div className={styles.map} id="map" style={mapSizesStyle}></div>
         </div>
         <div className={footerStyles['footer-map-wrapper']}>
            <Footer />
         </div>
      </div>
      </>
   )
}
export default GeoMapArea