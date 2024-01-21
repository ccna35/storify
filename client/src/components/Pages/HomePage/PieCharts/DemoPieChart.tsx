import ReactApexChart from "react-apexcharts";

type DemoPieChartProps = {
  title: string;
  type?: "donut" | "pie";
  labels: string[];
  series: number[];
  colors?: any[];
};

const DemoPieChart = ({
  title,
  type = "donut",
  labels,
  series,
  colors,
}: DemoPieChartProps) => {
  //   const series = [44, 55, 41, 17, 15];
  const options: ApexCharts.ApexOptions = {
    labels,
    colors,
    title: {
      text: title,
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    },
    chart: {
      type,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return <ReactApexChart options={options} series={series} type={type} />;
};

export default DemoPieChart;
