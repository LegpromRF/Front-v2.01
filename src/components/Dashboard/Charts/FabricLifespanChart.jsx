import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

import chartImage from '../img/graph.png';
import '../modal/modal.css';
import './FabricLifespanChart.css';
const FabricLifespanChart = () => {
  const [fabricData, setFabricData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    axiosFabricData();
  }, []);

  useEffect(() => {
    if (fabricData.length > 0 && modalVisible) {
      renderFabricChart();
    }
  }, [fabricData, modalVisible]);

  const axiosFabricData = async () => {
    try {
      const response = await axios.get('https://api.legpromrf.ru/dashboard/fabric_companies_by_fabric');
      setFabricData(response.data.fabric_companies_data);
    } catch (error) {
      console.error('Ошибка при получении данных по типам тканей:', error);
    }
  };

  const renderFabricChart = () => {
    const fabricNames = fabricData.map(item => item.fabric_name); 
    const avgLifespans = fabricData.map(item => item.avg_lifespan); 
  
    const ctx = document.getElementById('fabricLifespan');
    destroyChart(ctx);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: fabricNames,
        datasets: [
          {
            label: 'Средний срок жизни (месяцы)',
            data: avgLifespans,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Средний срок жизни предприятия по типу ткани',
          },
        },
      },
    });
  };
  
  

  const destroyChart = (ctx) => {
    const chartInstance = Chart.getChart(ctx);
    if (chartInstance) {
      chartInstance.destroy();
    }
  };
  const openModal = () => {
    setModalVisible(true); 
    };

  const closeModal = () => {
  setModalVisible(false);
  };

  return (
    <div className ='con'>
      <div className="fabriclifespan-chart-container" onClick={openModal}>
        <div class= 'img'>
        <img src={chartImage} alt="Chart Image" />
        <p>Средний срок жизни компаний по видам тканей</p>
        </div>
      </div>
    {modalVisible && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <canvas id="fabricLifespan"></canvas>
        </div>
      </div>
    )}
  </div>
);
};

export default FabricLifespanChart;
