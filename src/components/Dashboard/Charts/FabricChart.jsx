import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import './FabricChart.css';
import chartImage from '../img/graph.png';
import '../modal/modal.css';
const FabricChart = () => {
  const [productionData, setProductionData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axiosProductionData();
  }, []);

  useEffect(() => {
    if (productionData.length > 0 && modalVisible) {
      renderSecondChart('modalChart'); 
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
  const renderSecondChart = () => {
    const labels = productionData.map(item => item[0]); // Названия регионов
    const avgLifespan = productionData.map(item => item[3]); // Средний срок жизни
  
    const ctx = document.getElementById('secondChart');
    destroyChart(ctx);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Средний срок жизни (мес.)',
            data: avgLifespan,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Средний срок жизни компании по регионам',
          },
          datalabels: {
            anchor: 'center',
            align: 'center',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                },
              },
            },
          },
        },
        layout: {
          padding: {
            left: 50,
          },
        },
        scales: {
          y: {
            ticks: {
              display: false,
            },
          },
        },
      },
    });
    const topThreeRegions = productionData
    .slice() // Создаем копию массива данных
    .sort((a, b) => b[3] - a[3]) // Сортируем по столбцу с временем жизни в месяцах
    .slice(0, 3); // Выбираем топ-3 регионов
  
  const topThreeLabels = topThreeRegions.map(item => item[0]); // Названия регионов
  const topThreeAvgLifespan = topThreeRegions.map(item => item[3]); // Время жизни в месяцах

  const topThreeCtx = document.getElementById('topThreeChart');
  destroyChart(topThreeCtx);
  new Chart(topThreeCtx, {
    type: 'bar',
    data: {
      labels: topThreeLabels,
      datasets: [
        {
          data: topThreeAvgLifespan,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',

          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Топ-3 регионов по среднему сроку жизни компаний',
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
          <div className="second-chart-container" onClick={openModal}>
          <div className='img'>
            <img src={chartImage} alt="Chart Image" /> 
            <p>Статус производств по регионам</p>
          </div>
          </div>
          {modalVisible && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <div class ='secondChartContainer'>
                <canvas id="secondChart"></canvas>
                <div class = "topChart">
                <canvas id="topThreeChart"></canvas>
                </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };
    
    export default FabricChart;