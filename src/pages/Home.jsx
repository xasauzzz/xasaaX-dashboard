function Home() {
  return (
    <div className="content flex-column">
      <img className="background" src="/img/backlogos.svg" alt="background" />
      <div className="title">
        <h1>Buy, trade, and hold 350+ cryptocurrencies on Bitneko</h1>
        <img src="/img/chart.svg" alt="chart" />
      </div>

      <div className="advantages d-flex justify-between">
        <div className="advantage">
          $1 billion+
          <span>24h trading volume</span>
        </div>
        <div className="advantage">
          1 million<span>Registered users</span>
        </div>
        <div className="advantage">
          2 chains<span>ETH and BSC</span>
        </div>
      </div>
    </div>
  );
}

export { Home };
