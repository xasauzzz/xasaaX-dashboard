const PopUp = ({ items, onChange, handleHover, isVisible }) => {
  return (
    <div
      onMouseOver={() => handleHover(true)}
      onMouseOut={() => handleHover(false)}
      className={`${
        isVisible
          ? "pop-up d-flex flex-column pop-up-visible"
          : "pop-up d-flex flex-column"
      }`}
    >
      {items.map((item, index) => (
        <div onClick={() => onChange(item)} className="crypt" key={index}>
          <p className="crypt-t">{item}</p>
          <img
            height={22}
            width={22}
            src={`/img/${item}.svg`}
            alt={`${item}`}
          />
        </div>
      ))}
    </div>
  );
};

export { PopUp };
