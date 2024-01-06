import Card from './Card/Card'
import styles from './Cards.module.scss'
import InfoCard from './InfoCard/InfoCard'

const Cards = () => {
   return (
    // <div className={styles.wrapper}>
      <ul className={styles.cards}>
        <InfoCard />
        <Card rating={5} />
        <Card rating={4} />
        <Card rating={3} />
        <Card rating={2} />
        <Card rating={1} />
        <Card rating={0} />
      </ul>
    // </div>
    // <div className="card">

    // <div className="cardbody">
    
    //     <div className="cardlogo"><img src="img/cardlogo.jpg" alt=""/></div>
    
    //     <div className="cardname">
    //         <div className="cardtitle">
    //             <h2>Наименование компании исполнителя</h2>
            // <div className="cardrating" data-rating="4"></div>
            // </div>
            
            
    //     </div>
    
    //     <div className="cardleft"><h4>Регион производства</h4><p>Россия, Ивановская область</p></div>
    //     <div className="cardright"><h4>Специализация</h4><p>Производство одежды</p></div>
    
    //     <div className="cardbutton">
    //         <div className="cardicons">
    //             <i className="activity"></i>
    //             <i className="discovery"></i>
    //             <i className="graph"></i>
    //             <i className="message"></i>
    //             <i className="scan"></i>
    //             <i className="ticket"></i>
    //         </div>
    //         <button onclick="infoButtons(this)"><span></span></button>
    //     </div>
    
    // </div>
    
    // <div className="cardfooter">
    //     <div className="line"></div>
    //     <div className="footerdata">
    //         <span><h4>ОГРН</h4><p className="fspan">156784523156845</p></span>
    //         <span><h4>ИНН</h4><p className="fspan">6584176489</p></span>
    //         <span><h4>Статус</h4><p className="fspan">Действующий</p></span>
    //         <span><h4>Дата образования</h4><p className="fspan">02.04.2014</p></span>
    //         <div className="checkButton"><button>Проверить контрагента</button></div>
    //     </div>
    
    
    
    //     <div className="card-slider">
    //         <div className="card-slider-wrap">
    //         <div className="slide"><h4>Сайты</h4>
    //             <ul>
    //                 <li>tpktrade.ru</li>
    //                 <li>vk.com</li>
    //             </ul>
    //         </div>
    //         <div className="slide">
    //             <h4>Номера телефонов</h4>
    //             <ul>
    //                 <li>+7 964 654 54 32</li>
    //                 <li>+7 964 654 54 32</li>
    //                 <li>+7 964 654 54 32</li>
    //             </ul>
    //         </div>
    //         <div className="slide">
    //             <h4>Электронная почта</h4>
    //             <ul>
    //                 <li>name@name.com</li>
    //                 <li>pochta@gmail.com</li>
    //                 <li>pochtayan@yandex.ru</li>
    //             </ul>
    //         </div>
    //         <div className="slide">
    //             <h4>Руководитель</h4>
    //             <ul>
    //                 <li>Иванов Алексей Петрович</li>
    //             </ul>
    //         </div>
    //     </div>
    //     </div>
    
    //     <div className="moreInfo">
    //         <ul>
    //             <li><span>Значение</span>По подписке</li>
    //             <li><span>Наименование</span>По подписке</li>
    //             <li><span>Способ</span>По подписке</li>
    //             <li><span>Пункт назначения</span>По подписке</li>
    //         </ul>
    //     </div>
    //     </div>
    
    // </div> 
   )
}
export default Cards