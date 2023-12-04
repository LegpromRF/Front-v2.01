import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './App.css';
import RegionCharts from './RegionCharts';
import ProductionChart from './ProductionChart';
import FabricChart from './FabricChart'
import ThirdChart from './ThirdChart';
import FabricLifespanChart from './FabricLifespanChart'
import './ChartComponent.css'
import axios from 'axios';
function ChartComponent() {
  const [productionData, setProductionData] = useState([]);
  const [fabricData, setFabricData] = useState([]);
  useEffect(() => {
    axiosProductionData();
    axiosFabricData();
  }, []);

  const axiosProductionData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get_production_status_by_region'); 
      setProductionData(response.data.production_status_by_region);
    } catch (error) {
      console.error('Ошибка при получении данных по производству:', error);
    }
  };
  const axiosFabricData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/fabric_companies_by_fabric');
      setFabricData(response.data.fabric_companies_data);
    } catch (error) {
      console.error('Ошибка при получении данных о компаниях по тканям:', error);
    }
  };

  const destroyChart = (ctx) => {
    const chartInstance = Chart.getChart(ctx);
    if (chartInstance) {
      chartInstance.destroy();
    }
  };

  return (
    <div>
      <div className="firstline">
        <ProductionChart />
        <FabricChart />
      </div>
      <div className="secondline">
        <ThirdChart />
        <FabricLifespanChart />
      </div>
      <RegionCharts />
    </div>
  );
}

export default ChartComponent;
