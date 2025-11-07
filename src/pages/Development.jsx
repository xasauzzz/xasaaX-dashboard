import { Link } from "react-router-dom";

function Development() {
  return (
    <div className="content">
      <div className="devContent">
        <img
          className="building"
          height={201}
          width={201}
          src="/img/development.svg"
          alt="development"
        />
        <h1>Under Development</h1>
        <Link to="/">
          <button className="violetButton">
            <span>Go to Homepage</span>
            <img className="arrow" src="/img/arrow.svg" alt="arrow" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export { Development };
