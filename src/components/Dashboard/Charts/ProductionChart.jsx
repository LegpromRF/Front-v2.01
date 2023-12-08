import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './ProductionChart.css';
import chartImage from '../img/graph.png';
import '../modal/modal.css';
import axios from 'axios'; 

const ProductionChart = () => {
  const [productionData, setProductionData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axiosProductionData();
  }, []);

  useEffect(() => {
    if (productionData.length > 0 && modalVisible) {
      renderFirstChart('modalChart');
    }
  }, [productionData, modalVisible]);

  const axiosProductionData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get_production_status_by_region'); 
      setProductionData(response.data.production_status_by_region);
    } catch (error) {
      console.error('Ошибка при получении данных по производству:', error);
    }
  };

  const renderFirstChart = () => {
    const labels = productionData.map(item => item[0]);
    const openCounts = productionData.map(item => item[1]);
    const closedCounts = productionData.map(item => item[2]);

    const ctx = document.getElementById('firstChart');
    destroyChart(ctx);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Открыто',
            data: openCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Закрыто',
            data: closedCounts,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Статус производства по регионам',
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
    <div className='con'>
      <div className="first-chart-container" onClick={openModal}>
        <div className='img'>
        <img src={chartImage} alt="Chart Image" />
        <p>Статус производств по регионам</p>
        </div>
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <canvas id="firstChart"></canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionChart;
