import React, { useEffect, useRef } from 'react';
import { 
  RiCalendarLine, 
  RiTaskLine, 
  RiToolsLine, 
  RiUserLine
} from 'react-icons/ri';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as echarts from 'echarts';

const HouseKeepingDashboard = () => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    // Initialize Bar Chart
    const barChart = echarts.init(barChartRef.current);
    const barOption = {
      animation: false,
      grid: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 40
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisTick: { show: false },
        axisLabel: { color: '#6b7280' }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#6b7280' },
        splitLine: { lineStyle: { color: '#f3f4f6' } }
      },
      series: [{
        data: [12, 15, 18, 14, 16, 13, 11],
        type: 'bar',
        itemStyle: {
          color: '#2f6a87',
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: '#6eb2cc'
          }
        }
      }],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' }
      }
    };
    barChart.setOption(barOption);
    
    // Initialize Pie Chart
    const pieChart = echarts.init(pieChartRef.current);
    const pieOption = {
      animation: false,
      grid: { top: 0, right: 0, bottom: 0, left: 0 },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        data: [
          { value: 70, name: 'Completed', itemStyle: { color: '#10b981' } },
          { value: 30, name: 'Pending', itemStyle: { color: '#f59e0b' } }
        ],
        itemStyle: {
          borderRadius: 4
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {c}%',
          color: '#1f2937'
        }
      }],
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' }
      }
    };
    pieChart.setOption(pieOption);
    
    // Handle window resize
    const handleResize = () => {
      barChart.resize();
      pieChart.resize();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      barChart.dispose();
      pieChart.dispose();
    };
  }, []);

  return (
    <div className="w-100 min-vh-100 bg-light p-0">
      <div className="p-2 p-md-4">
        
        {/* Header */}
        <div className="mb-4">
          <h1 className="h3 mb-1">Welcome, Priya!</h1>
          <p className="text-muted">Your schedule, tasks, and alerts for today</p>
        </div>
        
        {/* Summary Widgets */}
        <div className="row g-3 mb-4">
          
          <div className="col-6 col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 p-2 rounded me-2">
                      <RiCalendarLine className="text-primary fs-4 fs-md-5" />
                    </div>
                    <span className="h2 fw-bold" style={{color: '#111827'}}>6</span>
                  </div>
                  <h3 className="h6 fw-semibold mb-1">Shifts This Week</h3>
                  <p className="text-muted small mb-0">Next: Today, 8:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success bg-opacity-10 p-2 rounded me-2">
                      <RiTaskLine className="text-success fs-4 fs-md-5" />
                    </div>
                    <span className="h2 fw-bold" style={{color: '#111827'}}>18/25</span>
                  </div>
                  <h3 className="h6 fw-semibold mb-1">Tasks Completed</h3>
                  <div className="d-flex align-items-center">
                    <div className="w-100 bg-gray-200 rounded-full h-2 me-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="text-success small fw-medium">72%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-warning bg-opacity-10 p-2 rounded me-2">
                      <RiToolsLine className="text-warning fs-4 fs-md-5" />
                    </div>
                    <span className="h2 fw-bold" style={{color: '#111827'}}>2</span>
                  </div>
                  <h3 className="h6 fw-semibold mb-1">Pending Maintenance</h3>
                  <p className="text-muted small mb-0">Requires attention</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-info bg-opacity-10 p-2 rounded me-2">
                      <RiUserLine className="text-info fs-4 fs-md-5" />
                    </div>
                    <span className="h2 fw-bold" style={{color: '#111827'}}>6/7</span>
                  </div>
                  <h3 className="h6 fw-semibold mb-1">Attendance This Week</h3>
                  <div className="d-flex align-items-center">
                    <span className="text-success me-1">✅</span>
                    <span className="text-muted small">Excellent record</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Charts Section */}
        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="h5 fw-semibold mb-4">Tasks Completed (Last 7 Days)</h3>
                <div ref={barChartRef} style={{ height: '300px' }}></div>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="h5 fw-semibold mb-4">Maintenance Status</h3>
                <div ref={pieChartRef} style={{ height: '300px' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HouseKeepingDashboard;