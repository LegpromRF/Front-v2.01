import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './ThirdChart.css';
import axios from 'axios';
import chartImage from '../img/graph.png';
import '../modal/modal.css';
const ThirdChart = () => {
    const [fabricData, setFabricData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
      axiosFabricData();
    }, []);
    
    useEffect(() => {
        if (fabricData.length > 0 && modalVisible) {
          renderThirdChart();
          renderTopFabricsChart();
        }
      }, [fabricData, modalVisible]);

    const axiosFabricData = async () => {
        try {
          const response = await axios.get('https://api.legpromrf.ru/dashboard/fabric_companies_by_fabric'); // Используем axios для GET-запроса
          setFabricData(response.data.fabric_companies_data);
        } catch (error) {
          console.error('Ошибка при получении данных о компаниях по тканям:', error);
        }
      };
    const renderThirdChart = () => {
        // Находим топ-3 ткани по количеству компаний
        const sortedFabrics = fabricData.slice().sort((a, b) => b[1] - a[1] );
        const topThreeFabrics = sortedFabrics.slice(0, 3); // Топ-3 ткани
        
        const remainingFabrics = fabricData.filter(item => !topThreeFabrics.includes(item)); // Исключаем топ-3 ткани из данных
        
        const labels = remainingFabrics.map(item => item[0] );
        const companyCounts = remainingFabrics.map(item => item[1] );
        
        const ctx = document.getElementById('thirdChart');
        destroyChart(ctx);
        new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
            {
                label: 'Количество компаний',
                data: companyCounts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
                text: 'Количество компаний по видам тканей (за исключением топ-3)',
            },
            },
            scales: {
            x: {
                title: {
                display: true,
                text: 'Виды тканей',
                },
            },
            y: {
                title: {
                display: true,
                text: 'Количество компаний',
                },
            },
            },
        },
        });
    };
    const renderTopFabricsChart = () => {
        // Сортировка данных о тканях и выбор топ-3
        const sortedFabricData = fabricData.slice().sort((a, b) => b[1] - a[1]);
        const topThreeFabrics = sortedFabricData.slice(0, 3);

        const topThreeLabels = topThreeFabrics.map(item => item[0]); // Названия тканей
        const topThreeCompanyCounts = topThreeFabrics.map(item => item[1]); // Количество компаний

        const ctx = document.getElementById('topThreeFabricsChart');
        destroyChart(ctx);
        new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topThreeLabels,
            datasets: [
            {
                label: 'Количество компаний',
                data: topThreeCompanyCounts,
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
                text: 'Топ-3 ткани по количеству компаний',
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
        <div className = 'con'>
          <div className='third-chart-wrapper' onClick={openModal}>
          <div class= 'img'>
            <img src={chartImage} alt="Chart Image" />
            <p>Количество компаний по видам тканей</p>
            </div>
          </div>
          {modalVisible && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <div className='modal-chart-container'>
                  <div className="third-chart-container">
                    <canvas id="thirdChart"></canvas>
                  </div>
                  <div className="third-chart-top">
                    <canvas id="topThreeFabricsChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };
    
    export default ThirdChart;