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
      width: "100%",
    },
    stroke: {
      curve: "smooth",
    },
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
