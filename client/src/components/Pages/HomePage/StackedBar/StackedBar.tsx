import ReactApexChart from "react-apexcharts";

type StackedBarProps = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  title: string;
};

const StackedBar = ({ series, title }: StackedBarProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      //   height: 150,
      stacked: true,
      stackType: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
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
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "left",
      formatter: function (seriesName, opts) {
        return seriesName + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="bar" height={150} />
  );
};

export default StackedBar;
