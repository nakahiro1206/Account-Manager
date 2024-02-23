import { memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineController,
  BarController
} from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController
);
  
export const ChartComponent = memo((props: {date: Date, recordList: Array<record>, categoryList:Array<string>}) => {
  const { date, recordList, categoryList} = props;
  const yearMonth = (date.getFullYear()*100 + date.getMonth()+1)*100;
  const yearMonthNext = (date.getFullYear()*100 + date.getMonth()+2)*100;
  const chartData = {
    // labels: date list
    labels: [...Array(31)].map((_, i) => yearMonth + i+1),
    datasets: [...categoryList].map((elem, i) => {
      let color = '#';
      for(let j=0;j<6;j++){
        color += Math.floor(Math.random()*16).toString(16);
      }
      return {
        // label: category
        type: 'bar' as const,
        label: elem,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 0,
        fill: false,
        data: Array<number>(31).fill(0)
      }
    })
  };

  // add line at the first element of the datasets
  chartData.datasets.unshift({
    type: 'line' as any,
    label: "LINE",
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 2,
    fill: false,
    data: Array<number>(31).fill(0)
  });

  recordList.forEach((elem)=>{
    // find the range
    if(elem.date < yearMonth || elem.date >= yearMonthNext){return;}

    // labels: date list
    // datasets[i].label: category
    const idx = categoryList.indexOf(elem.category);
    if(idx==-1){return;}
    const d = elem.date%100;
    chartData.datasets[idx+1].data[Number(d)-1]+=Number(elem.amount);
    // set the amount of balance;
    // updated to the newest balance in the records in the same date.
    chartData.datasets[0].data[Number(d)-1] = elem.balance;
  });

  // padding balance
  for(let idx=0;idx<chartData.datasets[0].data.length;idx++){
    if(chartData.datasets[0].data[idx]==0 && idx>0){
      // console.log(chartData.datasets[0].data[idx-1])
      chartData.datasets[0].data[idx] = chartData.datasets[0].data[idx-1];
    }
  }
  for(let idx=chartData.datasets[0].data.length-1;idx>=0;idx--){
    if(chartData.datasets[0].data[idx]==0 && idx<chartData.datasets[0].data.length-1){
      // console.log(chartData.datasets[0].data[idx-1])
      chartData.datasets[0].data[idx] = chartData.datasets[0].data[idx+1];
    }
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit: 4,
        },
      },
      y: {
        stacked: true,
      },
      // y1: { display: true, position: "right" },
    },
  };

  // regression
  // if(regressionData != undefined){
  //   chartData.datasets[0].data = chartData.datasets[0].data.map((elem, idx)=>{
  //     const balance = elem;
  //     // if(balance == 0){return 0;}
  //     const d = idx+1;
  //     return regressionData.result[0] + regressionData.result[1]*d + regressionData.result[2]*balance;
  //   });
  // }

  return <Chart type='bar' options={options} data={chartData} />;
});