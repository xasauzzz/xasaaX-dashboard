
import { AppContext } from "../context";
import { useContext } from "react";

const Finance = () => {
  const { onConnect, isConnection } = useContext(AppContext);

  return (
    <div className="meta-font d-flex align-center justify-center">
      <button onClick={onConnect} disabled={isConnection}>
        <p>Connect with</p>
        <img height={45} width={45} src="/img/fox.svg" />
      </button>
    </div>
  );
};

export { Finance };
