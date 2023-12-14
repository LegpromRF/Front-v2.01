import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import './ProductionChart.css';
import '../modal/modal.css';
import axios from 'axios'; 
const ProductionChart = () => {
  const [productionData, setProductionData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const thumbnailCanvasRef = useRef(null);

  useEffect(() => {
    axiosProductionData();
  }, []);

  useEffect(() => {
    if (productionData.length > 0 && modalVisible) {
      renderFirstChart('modalChart');
      const selectedRegionsData = productionData.filter(item =>
        ['Москва', 'Московская область', 'Санкт-Петербург', 'Ивановская область','Республика Башкортостан','Республика Татарстан (Татарстан)'].includes(item.region_name)
      );
      renderRegionChart(selectedRegionsData, 'regionChart', 'Статус производства для отдельных регионов');
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

  const renderFirstChart = () => {
    const filteredData = productionData.filter(item =>
      !['Москва', 'Московская область', 'Санкт-Петербург', 'Ивановская область','Республика Башкортостан','Республика Татарстан (Татарстан)'].includes(item.region_name)
    );

    const labels = filteredData.map(item => item.region_name);
    const closedCounts = filteredData.map(item => item.open_count);
    const openCounts = filteredData.map(item => item.closed_count);

    const ctx = document.getElementById('firstChart');
    destroyChart(ctx);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            
            label: 'Закрыто',
            data: closedCounts,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Открыто',
            data: openCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
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
  const renderRegionChart = (regionData, canvasId, chartTitle) => {
    const labels = regionData.map(item => item.region_name);
    const openCounts = regionData.map(item => item.open_count);
    const closedCounts = regionData.map(item => item.closed_count);

    const ctx = document.getElementById(canvasId);
    destroyChart(ctx);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            
            label: 'Закрыто',
            data: openCounts,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Открыто',
            data: closedCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
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
            text: chartTitle,
          },
        },
      },
    });
  };
  const renderThumbnailChart = (data) => {
    const filteredData = data.filter(item =>
      !['Москва', 'Московская область', 'Санкт-Петербург', 'Ивановская область','Республика Башкортостан','Республика Татарстан (Татарстан)'].includes(item.region_name)
    );

    const labels = filteredData.map(item => item.region_name);
    const openCounts= filteredData.map(item => item.open_count);
    const closedCounts = filteredData.map(item => item.closed_count);
  
    const ctx = thumbnailCanvasRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            
            label: 'Открыто',
            data: closedCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Закрыто',
            data: openCounts,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        scales: {
          x: {
            ticks: {
              callback: function(value, index, values) {
                return ''; 
              }
            }
          }
        },
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
      <div className="canvas-container">
        <canvas ref={thumbnailCanvasRef}></canvas>
      </div>
    </div>
  </div>
  {modalVisible && (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <canvas id="firstChart"></canvas>
        <div class="topChart_p">
          <canvas id="regionChart"></canvas>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default ProductionChart;
