import React from "react";
import Chart from "chart.js";

// ----------------------------------------------------------------------
import { useDispatch , useSelector} from "react-redux";
import { useEffect } from 'react';
import { selectProducts } from '../../../redux/slices/productsSlice';

export default function CardLineChart() {
    const dispatch = useDispatch()
    const [products, err] = useSelector(selectProducts);
  var save_name=[];
  var save_price=[];
  console.log(products.products)
  for (var i in products.products) {
    save_name.push(products.products[i]['name']);
    save_price.push(products.products[i]['price'])


  }

//   const data = {'Profils':  ['Mohamed Youssef', 'Mohamed Yassine','Amr Bellalouna','Hamza Razgallah','Nour Zemni','Anis Kraiem','Akram Thabet','Ela Debichi','Selim ben Aich','Bassem Jadoui','Karim mannai', 'Mohamed Amara','Slim Jemai','Mehdi Hantous','Skander Bachta','Ala ben Ali','Bilel Moussa','Iheb Guezguez','Mounir Maalej','Zied Maalej'],
//         'Products': ['Short','T-Shirt','Shirt','Pants','Glasses','Watch','Shoes','Sneakers','Jeans','Sweats','Coats','Socks','Jacket','Veste','Robes','Jeans Armani','Shirt zara','Sneakers Nike','Sweat Adidas','Jeans Lee Cooper'],
//         'Appreciation':[4,1,3,4,3,5,2,3,3,1,2,5,5,3,1,4,3,1,2,2]
//         }
//         console.log(data.Profils.length)
//         console.log(data.Courses.length)
//         console.log(data.Appreciation.length)

 useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: save_name,
        datasets: [
          {
            label: "Price Dt",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: save_price,
            fill: false,
          }
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Name",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Price",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [products]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Sales value</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
