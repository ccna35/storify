import ReactApexChart from "react-apexcharts";

const DemoBarChart = () => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "basic-bar",
      events: {
        click: (e, chart, options) => console.log(options),
        animationEnd(chart, options) {
          console.log(chart);
        },
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  return (
    <ReactApexChart
      options={{ ...options }}
      series={series}
      width={"100%"}
      height={350}
      type="bar"
    />
  );
};

export default DemoBarChart;
