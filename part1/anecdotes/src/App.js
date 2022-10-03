import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
];

const Anecdote = ({ text, anecdote, votes }) => {
  return (
    <>
      <Header text={text} />
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const len = anecdotes.length;
  const rd = Math.floor(Math.random() * len);
  const [selected, setSelected] = useState(anecdotes[rd]);
  const [votes, setVotes] = useState(new Array(len).fill(0));

  return (
    <div className="App">
      <div>
        <Anecdote text="Anecdote of the day"  anecdote={selected} votes={votes[anecdotes.indexOf(selected)]} />
        <Button
          handleClick={() =>
            setVotes(
              votes.map((vote, index) =>
                index === anecdotes.indexOf(selected) ? vote + 1 : vote
              )
            )
          }
          text="vote"
        />
        <Button
          handleClick={() => setSelected(anecdotes[rd])}
          text="next anecdote"
        />
      </div>

      <div>
        <Anecdote text="Anecdote with most votes" anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} />
      </div>
    </div>
  );
};

export default App;
