import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './ProductionChart.css';
import chartImage from './first-chart-image.jpg';

const ProductionChart = () => {
  const [productionData, setProductionData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchProductionData();
  }, []);

  useEffect(() => {
    if (productionData.length > 0 && modalVisible) {
      renderFirstChart('modalChart'); // При открытии модального окна вызываем функцию рендера графика
    }
  }, [productionData, modalVisible]);

  const fetchProductionData = async () => {
    try {
      const response = await fetch('http://localhost:8000/get_production_status_by_region');
      const result = await response.json();
      setProductionData(result.production_status_by_region);
    } catch (error) {
      console.error('Ошибка при получении данных по производству:', error);
    }
  };
    const renderFirstChart = () => {
        const labels = productionData.map(item => item[0]); // Названия регионов
        const openCounts = productionData.map(item => item[1]); // Количество открытых
        const closedCounts = productionData.map(item => item[2]); // Количество закрытых
    
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
        setModalVisible(true); // Вызываем функцию рендера графика при открытии модального окна
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };
    
      return (
        <div>
          <div className="first-chart-container" onClick={openModal}>
            <img src={chartImage} alt="Chart Image" /> {/* Отображение изображения */}
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