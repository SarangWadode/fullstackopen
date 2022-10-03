import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Stat = ({ text, count }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{count}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const avg = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <Header text={"Statistics"} />

      {all === 0 ? (
        <h4>No feedbacks given</h4>
      ) : (
        <table>
          <tbody>
            <Stat text="Good" count={good} />
            <Stat text="Neutral" count={neutral} />
            <Stat text="Bad" count={bad} />
            <Stat text="All" count={all} />
            <Stat text="Average" count={avg} />
            <Stat text="Positive" count={positive} />
          </tbody>
        </table>
      )}
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [ feedbacks, setFeedbacks ] = useState({
    good: 0,
    bad: 0,
    neutral: 0
  })

  return (
    <div className="App">
      <Header text={"Give Feedback"} />

      <Button text={"good"} handleClick={() => setFeedbacks({...feedbacks, good: feedbacks.good+1})} />
      <Button text={"bad"} handleClick={() => setFeedbacks({...feedbacks, bad: feedbacks.bad+1})} />
      <Button text={"neutral"} handleClick={() => setFeedbacks({...feedbacks, neutral: feedbacks.neutral+1})} />

      <Statistics good={feedbacks.good} bad={feedbacks.bad} neutral={feedbacks.neutral} />
    </div>
  );
};

export default App;
