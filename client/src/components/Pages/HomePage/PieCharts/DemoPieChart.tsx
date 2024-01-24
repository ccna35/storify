import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import BasicModal from "../../../Modals/Modal";

type DemoPieChartProps = {
  title: string;
  type?: "donut" | "pie" | "radialBar";
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
  // Handle status state
  const [status, setStatus] = useState("");

  // Handle modal logic
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setStatus("");
    setOpen(false);
  };

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
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      offsetX: 0,
      offsetY: 0,
      background: {
        enabled: false,
        foreColor: "#fff",
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#fff",
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.45,
      },
    },
    chart: {
      type,
      events: {
        dataPointSelection(e, chart, options) {
          setStatus(labels[options.dataPointIndex].replace(" ", ""));
          handleOpen();
        },
      },
    },
    plotOptions: {
      pie: {
        customScale: 0.85,
        donut: {
          size: "65%",
          labels: {
            show: true,
          },
        },
      },
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
          },
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
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

  return (
    <>
      <ReactApexChart options={options} series={series} type={type} />
      <BasicModal open={open} handleClose={handleClose} status={status} />
    </>
  );
};

export default DemoPieChart;
