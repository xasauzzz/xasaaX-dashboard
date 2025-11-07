import React from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Chart from "../components/Chart";
import OrderBook from "../components/OrderBook";
import MarketTrades from "../components/MarketTrades";
import { PopUp } from "../components/PopUp";
import { AppContext } from "../context";

export const Trade = () => {
  const { onConnect, isConnection } = React.useContext(AppContext);
  const [currentPrice, setCurrentPrice] = React.useState("");
  const [currentPair, setCurrentPair] = React.useState(["ETH", "USDT"]);
  const [isVisibleFirst, setIsVisibleFirst] = React.useState(false);
  const [isVisibleSecond, setIsVisibleSecond] = React.useState(false);
  const navigate = useNavigate();

  const itemsFirst = ["BTC", "ETH", "UNI", "SHIB", "MATIC", "WBTC"];
  const itemsSecond = ["USDT", "BUSD", "USDC"];

  React.useEffect(() => {
    navigate("/trade/5m");
  }, [navigate]);

  const handleHoverFirst = () => {
    setIsVisibleFirst(!isVisibleFirst);
    setIsVisibleSecond(false);
  };

  const handleHoverSecond = () => {
    setIsVisibleSecond(!isVisibleSecond);
    setIsVisibleFirst(false);
  };

  const changeCurFirst = (cur) => {
    const newPair = [cur, currentPair[1]];
    setCurrentPair(newPair);
    handleHoverFirst();
  };

  const changeCurSecond = (cur) => {
    const newPair = [currentPair[0], cur];
    setCurrentPair(newPair);
    handleHoverSecond();
  };

  return (
    <div className="trade-content">
      <div className="grid-container">
        <div className="pair top zone">
          <div className="pair-price">
            <div className="pair-cur d-flex align-center">
              <p onMouseOver={handleHoverFirst} onMouseDown={handleHoverFirst}>
                {currentPair[0]}
              </p>
              /<p onMouseOver={handleHoverSecond}>{currentPair[1]}</p>
            </div>
            {isVisibleFirst && (
              <PopUp
                items={itemsFirst}
                onChange={changeCurFirst}
                handleHover={setIsVisibleFirst}
                isVisible={isVisibleFirst}
              />
            )}
            {isVisibleSecond && (
              <PopUp
                items={itemsSecond}
                onChange={changeCurSecond}
                handleHover={setIsVisibleSecond}
                isVisible={isVisibleSecond}
              />
            )}
            <span>{`$${Number(currentPrice).toFixed(2)}`}</span>
          </div>
        </div>
        <div className="order-title zone top justify-center">
          <p>Order Book</p>
        </div>
        <div className="spot-title top justify-center">
          <p>Spot</p>
        </div>
        <div className="time zone">
          <div className="times">
            <NavLink to="1s">
              {({ isActive, isPending }) => (
                <span className={isActive ? "activetime" : " "}>1s</span>
              )}
            </NavLink>
            <NavLink to="5m">
              {({ isActive, isPending }) => (
                <span className={isActive ? "activetime" : " "}>5m</span>
              )}
            </NavLink>
            <NavLink to="/trade/1h">
              {({ isActive, isPending }) => (
                <span className={isActive ? "activetime" : " "}>1H</span>
              )}
            </NavLink>
            <NavLink to="/trade/4h">
              {({ isActive, isPending }) => (
                <span className={isActive ? "activetime" : " "}>4H</span>
              )}
            </NavLink>
            <NavLink to="/trade/1d">
              {({ isActive, isPending }) => (
                <span className={isActive ? "activetime" : " "}>1D</span>
              )}
            </NavLink>
          </div>
        </div>
        <div className="order-specs">
          <p>Price({currentPair[1]})</p>
          <p>Amount({currentPair[0]})</p>
          <p>Total</p>
        </div>
        <div className="chart zone">
          <Routes>
            <Route
              path="1s"
              element={
                <Chart
                  pair={`${currentPair[0]}${currentPair[1]}`}
                  interval="1s"
                />
              }
            />
            <Route
              path="5m"
              element={
                <Chart
                  pair={`${currentPair[0]}${currentPair[1]}`}
                  interval="5m"
                />
              }
            />
            <Route
              path="1h"
              element={
                <Chart
                  pair={`${currentPair[0]}${currentPair[1]}`}
                  interval="1h"
                />
              }
            />
            <Route
              path="4h"
              element={
                <Chart
                  pair={`${currentPair[0]}${currentPair[1]}`}
                  interval="4h"
                />
              }
            />
            <Route
              path="1d"
              element={
                <Chart
                  pair={`${currentPair[0]}${currentPair[1]}`}
                  interval="1d"
                />
              }
            />
          </Routes>
        </div>
        <div className="orders-list zone">
          <OrderBook pair={`${currentPair[0]}${currentPair[1]}`} />
        </div>
        <div className="open-orders zone">
          <div className="open-orders--">
            <span>Open Orders</span>
            <span>Order History</span>
            <span>Trade History</span>
            <span>Funds</span>
          </div>
        </div>
        <div className="market-title zone">
          <p>Market Trades</p>
        </div>
        <div className="trades-list">
          <div className="specs d-flex">
            <p>Price({currentPair[1]})</p>
            <p>Amount({currentPair[0]})</p>
            <p>Time</p>
          </div>
          <div className="trades">
            <MarketTrades
              pair={`${currentPair[0]}${currentPair[1]}`}
              setCurrentPrice={setCurrentPrice}
            />
          </div>
        </div>
        <div className="open-orders-list">
          <span>You have no open orders</span>
        </div>
        <div className="spot-buy">
          <div className="trade-zone">
            <div className="buy-sell">
              <button className="buy">Buy</button>
              <button className="sell">Sell</button>
            </div>
            <div className="price-zone input-cont">
              <input className="text-input" type="text" placeholder="Price"  defaultValue="" />
              <span>{currentPair[1]}</span>
            </div>
            <div className="amount-zone input-cont">
              <input className="text-input" type="text" placeholder="Amount"  defaultValue="" />
              <span>{currentPair[0]}</span>
            </div>
            <input className="range" type="range" value={0} />
            <div className="total-zone input-cont">
              <input className="text-input" type="text" placeholder="Total"  defaultValue="" />
              <span>{currentPair[1]}</span>
            </div>
            <button className="buy-final">{`Buy ${currentPair[0]}`}</button>
          </div>
          <div className="meta-connect">
            <button disabled={isConnection} onClick={onConnect}>
              <p>Connect with</p>
              <img height={34} width={34} src="/img/fox.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
