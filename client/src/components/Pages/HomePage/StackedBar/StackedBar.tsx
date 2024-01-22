import ReactApexChart from "react-apexcharts";

type StackedBarProps = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  title: string;
  colors: any[];
};

const StackedBar = ({ series, title, colors }: StackedBarProps) => {
  const options: ApexCharts.ApexOptions = {
    colors,
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    title: {
      text: title,
    },
    xaxis: {
      categories: [""],
      axisBorder: {
        show: false,
      },
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="bar" height={120} />
  );
};

export default StackedBar;
