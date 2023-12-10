import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import './FabricChart.css';
import '../modal/modal.css';
const FabricChart = () => {
  const [productionData, setProductionData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const thumbnailCanvasRef = useRef(null);
  useEffect(() => {
    axiosProductionData();
  }, []);

  useEffect(() => {
    if (productionData.length > 0) {
      const topThreeRegions = productionData
        .slice()
        .sort((a, b) => b.avg_lifespan - a.avg_lifespan)
        .slice(0, 3);
      const topThreeLabels = topThreeRegions.map(item => item.region_name);
  
      renderThumbnailChart(productionData, topThreeLabels);
      if (modalVisible) {
        renderSecondChart('modalChart', topThreeLabels);
      }
    }
  }, [productionData, modalVisible]);
  

  const axiosProductionData = async () => {
    try {
      const response = await axios.get('https://api.legpromrf.ru/dashboard/get_production_status_by_region'); 
      setProductionData(response.data.production_status_by_region);
      renderThumbnailChart(response.data.production_status_by_region);
    } catch (error) {
      console.error('Ошибка при получении данных по производству:', error);
    }
  };
  const renderSecondChart = (chartId, topLabels) => {
    const filteredData = productionData.filter(
      item => !topLabels.includes(item.region_name)
    );

    const labels = filteredData.map(item => item.region_name);
    const avgLifespan = filteredData.map(item => {
      return item.avg_lifespan != 0 ? Math.abs(item.avg_lifespan) : item.avg_lifespan;
    });
  
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
            backgroundColor: 
            'rgba(244, 164, 96, 0.7)',
            borderColor:
              'rgba(244, 164, 96, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: 'Средний срок жизни производств по регионам',
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
              display: true,
            },
          },
        },
      },
    });
    const topThreeRegions = productionData
    .slice() // Создаем копию массива данных
    .sort((a, b) => b.avg_lifespan - a.avg_lifespan) // Сортируем по столбцу с временем жизни в месяцах
    .slice(0, 3); // Выбираем топ-3 регионов
  
    const topThreeLabels = topThreeRegions.map(item => item.region_name); // Названия регионов
    const topThreeAvgLifespan = topThreeRegions.map(item => item.avg_lifespan);

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
            'rgba(244, 164, 96, 0.7)',

          ],
          borderColor: [
            'rgba(244, 164, 96, 1)',

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
          text: 'Топ-3 регионов по среднему сроку жизни производств',
        },
      },
    },
  });

  };
  const renderThumbnailChart = (data, topLabels) => {
    const filteredData = data.filter(
      item => !topLabels.includes(item.region_name)
    );
    const labels = filteredData.map(item => item.region_name); // Названия регионов
    const avgLifespan = filteredData.map(item => {
      return item.avg_lifespan != 0 ? Math.abs(item.avg_lifespan) : item.avg_lifespan;
    });
  
    const ctx = thumbnailCanvasRef.current.getContext('2d');
    destroyChart(ctx);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Средний срок жизни (мес.)',
            data: avgLifespan,
            backgroundColor: 
              'rgba(244, 164, 96, 0.7)',
            borderColor:
              'rgba(244, 164, 96, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: 'Средний срок жизни производств по регионам',
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
        },
        scales: {
          x: {
            ticks: {
              callback: function(value, index, values) {
                return null;
              }
            }
          },
          y: {
            ticks: {
              display: true,
            },
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
            <div className="canvas-container">
              <canvas ref={thumbnailCanvasRef}></canvas>
            </div>
          </div>
        </div>
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <canvas id="secondChart"></canvas>
              <div class="topChart">
                <canvas id="topThreeChart"></canvas>
              </div>
            </div>
          </div>
        )}
      </div>

    );
    };
    
    export default FabricChart;