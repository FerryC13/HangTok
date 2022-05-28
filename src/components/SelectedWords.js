import React from "react";

// const SelectedWords = () => {
//   return (
//     <div>SelectedWords</div>
//   )
// }

export default class SelectedWords extends React.Component {
  state = {
    word: null,
  };

  async componentDidMount() {
    const url = "https://random-word-api.herokuapp.com/word";
    const resp = await fetch(url);
    const data = await resp.json();
    this.setState({ word: data });
  }

  render() {
    return <>{this.state.word}</>;
  }
}
