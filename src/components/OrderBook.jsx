import React, { useEffect } from "react";

const OrderBook = ({ pair = "ETHUSDT" }) => {
  const [bids, setBids] = React.useState([]);
  const [asks, setAsks] = React.useState([]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@depth10`
    );

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      const bidsUpdate = message.bids;
      const asksUpdate = message.asks;
      setBids(bidsUpdate);
      setAsks(asksUpdate);
    };

    return () => {
      ws.close();
    };
  }, [pair]);

  return (
    <>
      <div className="orderbook d-flex flex-column">
        <div className="bids">
          {bids.map((bid, index) => (
            <div className="bid" key={index}>
              <div className="total">
                <span>{Math.floor(bid[0] * bid[1] * 100) / 100}</span>
              </div>
              <div className="amount">
                <span>{Math.floor(bid[1] * 10000) / 10000}</span>
              </div>
              <div className="price price-bid">
                <span>{Number(bid[0]).toFixed(2)}</span>
              </div>
              <div
                className="color-zone"
                style={{ width: `${(bid[0] * bid[1]) / 1000}%` }}
              ></div>
            </div>
          ))}
        </div>

        <div className="asks">
          {asks.map((ask, index) => (
            <div className="ask" key={index}>
              <div className="total">
                <span>{Math.floor(ask[0] * ask[1] * 100) / 100}</span>
              </div>
              <div className="amount">
                <span>{Math.floor(ask[1] * 10000) / 10000}</span>
              </div>
              <div className="price price-ask">
                <span>{Number(ask[0]).toFixed(2)}</span>
              </div>
              <div
                className="color-zone"
                style={{ width: `${(ask[0] * ask[1]) / 1000}%` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderBook;
