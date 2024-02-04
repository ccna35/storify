import ReactApexChart from "react-apexcharts";

type DemoBarChartProps = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  xaxis: ApexXAxis | undefined;
  title: string;
  horizontal?: boolean;
};

const DemoBarChart = ({
  series,
  xaxis,
  title,
  horizontal = false,
}: DemoBarChartProps) => {
  const options: ApexCharts.ApexOptions = {
    title: {
      text: title,
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#263238",
      },
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    chart: {
      type: "bar",
      height: 430,
      width: "100%",
    },
    plotOptions: {
      bar: {
        horizontal,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: !horizontal,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <ReactApexChart
      options={{
        ...options,
        xaxis,
      }}
      series={series}
      width={"100%"}
      height={430}
      type="bar"
    />
  );
};

export default DemoBarChart;
