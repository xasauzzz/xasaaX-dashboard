import React, { useEffect } from "react";
import axios from "axios";
import { ColorType, createChart } from "lightweight-charts";

const Chart = ({ pair = "ETHUSDT", interval = "1m" }) => {
  const chartContainerRef = React.useRef();
  const chart = React.useRef();
  const candlestickSeries = React.useRef();
  const [candlesData, setCandlesData] = React.useState([]);
  const [updatedData, setUpdatedData] = React.useState(null);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@kline_${interval}`
    );
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      const parseMessage = (message) => {
        const {
          k: { T, o, c, h, l, v, V },
        } = message;
        return {
          open: parseFloat(o),
          high: parseFloat(h),
          low: parseFloat(l),
          close: parseFloat(c),
          time: T / 1000,
          value: (parseFloat(v) + parseFloat(V)) / 2,
          color: o < c ? "#0ecb81" : "#f6465d",
        };
      };
      const parsedMessage = parseMessage(message);

      setUpdatedData(parsedMessage);
    };

    return () => {
      ws.close();
    };
  }, [pair, interval]);

  React.useEffect(() => {
    if (updatedData != null) {
      candlestickSeries.current.update(updatedData);
    }
  }, [updatedData]);

  React.useEffect(() => {
    async function update() {
      const url = `https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${interval}&limit=1500`;
      const binanceResponse = await axios.get(url);
      const binanceResponseReady = binanceResponse.data.map((candle) => [
        candle[1],
        candle[2],
        candle[3],
        candle[4],
        candle[0],
        candle[5],
      ]);
      setCandlesData(
        binanceResponseReady.map((candle) => {
          return {
            open: Number(candle[0]),
            high: Number(candle[1]),
            low: Number(candle[2]),
            close: Number(candle[3]),
            time: candle[4] / 1000,
            value: Number(candle[5]),
            color:
              Number(candle[0]) < Number(candle[3]) ? "#0ecb81" : "#f6465d",
          };
        })
      );
    }
    update();
  }, [pair, interval]);

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      layout: {
        textColor: "#CBCBCB",
        fontFamily: "Poppins",
        fontSize: 10,
        background: {
          type: ColorType.Solid,
          color: "#FFFFFF",
        },
      },
      grid: {
        vertLines: { color: "#f2f2f2" },
        horzLines: { color: "#f2f2f2" },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          width: 2,
          color: "#7C91FF",
          style: 2,
          labelBackgroundColor: "#7C91FF",
        },
        horzLine: {
          color: "#7C91FF",
          labelBackgroundColor: "#7C91FF",
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });
    candlestickSeries.current = chart.current.addCandlestickSeries({
      upColor: "#0ecb81",
      downColor: "#f6465d",
      borderVisible: false,
      wickUpColor: "#0ecb81",
      wickDownColor: "#f6465d",
    });

    candlestickSeries.current.setData(candlesData);

    chart.current.priceScale("right").applyOptions({
      borderVisible: false,
      textColor: "#CBCBCB",
    });

    chart.current.timeScale().applyOptions({
      borderVisible: false,
    });

    const handleResize = () => {
      chart.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      chart.current.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [candlesData]);

  return (
    <>
      {candlesData ? (
        <div ref={chartContainerRef} className="chart_"></div>
      ) : (
        <div className="loading"></div>
      )}
    </>
  );
};

export default Chart;
