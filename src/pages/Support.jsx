export const Support = () => {
  return (
    <div className="content justify-center align-center">
      <img className="background" src="/img/backlogos.svg" alt="background" />
      <div className="chatBox">
        <div className="chatArea">
          <span>Answer will take about 5 hours</span>
        </div>
        <div className="inputArea">
          <div className="message">
            <textarea
              className="tarea"
              placeholder="Enter your message here..."
            ></textarea>
            <img
              height={27.63}
              width={29}
              src="/img/send.svg"
              className="send"
              alt="send"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
