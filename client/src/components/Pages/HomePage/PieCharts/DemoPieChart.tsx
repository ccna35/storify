import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
      events: {
        dataPointSelection(e, chart, options) {
          navigate(
            "/employeeStatus/" + labels[options.dataPointIndex].replace(" ", "")
          );
        },
      },
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
