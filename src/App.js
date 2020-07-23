import React, { Component } from "react";
import List from "./List";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [
        {
          id: "1",
          header: "First list",
          cardIds: [],
        },
        {
          id: "2",
          header: "Second list",
          cardIds: [],
        },
      ],
      allCards: {},
    };
  }
  // static defaultProps = {
  //   store: {
  //     lists: [],
  //     allCards: {},
  //   }
  // };

  omit = (obj, keyToOmit) => {
    let { [keyToOmit]: _, ...rest } = obj;
    return rest;
  };

  handleDeleteCard = (cardId) => {
    // console.log('handle delete card called')
    const newCards = this.omit(this.state.allCards, cardId);
    console.log(this.state.allCards)
    const newList = this.state.lists.map((list) => {
      return {
        cardIds: list.cardIds.filter((cardIds) => cardIds !== cardId),
        id: list.id,
        header: list.header,
      };
    });

    console.log(newList);

    this.setState({
      lists: newList,
      allCards: newCards,
    });
  };

  newRandomCard = () => {
    const id =
      Math.random()
        .toString(36)
        .substring(2, 4) +
      Math.random()
        .toString(36)
        .substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: "lorem ipsum",
    };
  };

  handleAddRandomCard = (listId) => {
    let newCard = this.newRandomCard();
    const newList = this.state.lists.map((list) => {
      let cardIds = [...list.cardIds];
      if (list.id === listId){
        cardIds.push(newCard.id)
      }
      return {
        cardIds: cardIds,
        id: list.id,
        header: list.header,
      };
    })

    this.setState({
      allCards: {...this.state.allCards, [newCard.id]: newCard},
      lists: newList
    })
  };

  render() {
    // const { store } = this.props
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {this.state.lists.map((list) => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map((id) => this.state.allCards[id])}
              onDeleteCard={this.handleDeleteCard}
              onAddRandomCard={this.handleAddRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
