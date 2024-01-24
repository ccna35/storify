import ReactApexChart from "react-apexcharts";

type DemoLineChartProps = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  xaxis: ApexXAxis | undefined;
  title: string;
};

const DemoLineChart = ({ series, xaxis, title }: DemoLineChartProps) => {
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
    chart: {
      type: "area",
      height: 350,
    },
    stroke: {
      curve: "smooth",
    },
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shadeIntensity: 1,
    //     opacityFrom: 0.7,
    //     opacityTo: 0.9,
    //     stops: [0, 90, 100],
    //   },
    // },
    dataLabels: {
      enabled: false,
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
      type="area"
    />
  );
};

export default DemoLineChart;
