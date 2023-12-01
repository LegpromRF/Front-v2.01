import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './App.css';
import RegionCharts from './RegionCharts';
import ProductionChart from './ProductionChart';
import FabricChart from './FabricChart'
import ThirdChart from './ThirdChart';
function ChartComponent() {
  const [productionData, setProductionData] = useState([]);
  const [fabricData, setFabricData] = useState([]);
  useEffect(() => {
    fetchProductionData();
    fetchFabricData();
  }, []);

  const fetchProductionData = async () => {
    try {
      const response = await fetch('http://localhost:8000/get_production_status_by_region');
      const result = await response.json();
      setProductionData(result.production_status_by_region);
    } catch (error) {
      console.error('Ошибка при получении данных по производству:', error);
    }
  };
  const fetchFabricData = async () => {
    try {
      const response = await fetch('http://localhost:8000/fabric_companies_by_fabric');
      const result = await response.json();
      setFabricData(result.fabric_companies_data);
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
      <ProductionChart />
      <FabricChart/>
      <ThirdChart/>
      <RegionCharts />
    </div>
  );
}

export default ChartComponent;
