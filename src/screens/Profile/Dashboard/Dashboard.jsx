import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import RegionCharts from '../../../components/Dashboard/Charts/RegionCharts.jsx';
import ProductionChart from '../../../components/Dashboard/Charts/ProductionChart.jsx';
import FabricChart from '../../../components/Dashboard/Charts/FabricChart.jsx';
import ThirdChart from '../../../components/Dashboard/Charts/ThirdChart.jsx';
import FabricLifespanChart from '../../../components/Dashboard/Charts/FabricLifespanChart.jsx';
import Layout from "@layout/Layout";
import './Dashboard.css'
import axios from 'axios';
function Dashboard() {
  const [productionData, setProductionData] = useState([]);
  const [fabricData, setFabricData] = useState([]);
  useEffect(() => {
    axiosProductionData();
    axiosFabricData();
  }, []);

  const axiosProductionData = async () => {
    try {
      const response = await axios.get('https://api.legpromrf.ru/dashboard/get_production_status_by_region'); 
      setProductionData(response.data.production_status_by_region);
    } catch (error) {
      console.error('Ошибка при получении данных по производству:', error);
    }
  };
  const axiosFabricData = async () => {
    try {
      const response = await axios.get('https://api.legpromrf.ru/dashboard/fabric_companies_by_fabric');
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
<Layout>
  <div className="charts-container">
    <div className='chart-item'>
      <ProductionChart />
    </div>
    <div className='chart-item'>
      <FabricChart />
    </div>
    <div className='chart-item'>
      <RegionCharts />
    </div>
  </div>
</Layout>


  );
}

export default Dashboard;
