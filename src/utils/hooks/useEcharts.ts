/**
 * hooks--useEcharts
 *   1. 新建和更新 Echarts 实例
 *   2. 销毁 Echarts 实例
 */
import {useRef, useEffect} from 'react';
import echarts, {ECharts, EChartOption} from 'echarts';
import 'echarts/theme/macarons';

export default function useEchartsHooks(
  chartRef: React.RefObject<HTMLDivElement>,
  options: EChartOption
): ECharts | undefined {
  const chartInstance = useRef<ECharts>();

  useEffect(() => {
    const renderChart = (): void => {
      if (!chartRef.current) return;
      const renderedInstance = echarts.getInstanceByDom(chartRef.current);
      if (renderedInstance) {
        chartInstance.current = renderedInstance;
      } else {
        chartInstance.current = echarts.init(chartRef.current, 'macarons');
      }
      chartInstance.current.setOption(options);
    };
    renderChart();
  }, [chartRef, options]);

  useEffect(() => {
    const onResize = (): void => {
      chartInstance.current && chartInstance.current.resize();
    };
    window.addEventListener('resize', onResize);
    return (): void => {
      chartInstance.current && chartInstance.current.dispose();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return chartInstance.current;
}
