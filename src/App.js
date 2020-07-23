import React, { Component } from 'react';
import List from './List'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [
        {
          id: '1',
          header: 'First list',
          cardIds: [ 'a', 'b']
        },
        {
          id: '2',
          header: 'Second list',
          cardIds: ['b', 'c'],
        },
      ],
      allCards: {
        'a': { id: 'a', title: 'First card', content: 'lorem ipsum' },
        'b': { id: 'b', title: 'Second card', content: 'lorem ipsum' },
        'c': { id: 'c', title: 'Third card', content: 'lorem ipsum' }
      }
    }
  }
  // static defaultProps = {
  //   store: {
  //     lists: [],
  //     allCards: {},
  //   }
  // };

  function omit(obj, keyToOmit) {
    let {[keyToOmit]: _, ...rest} = obj;
    return rest;
  }
  
  //Example
  const objectWithKVPs = {
    key: 'value',
    foo: 'foo value',
    bar: 'bar value',
    abc: { nested: 'object' }
  }
  
  //To remove the foo key value pair
  const newObjectWithKVPs = omit(objectWithKVPs, 'foo');
  
  handleDeleteCard = (card) => {
    // console.log('handle delete card called')
    const newCards = this.state.allCards.filter(id => id !== card.id)
    this.setState({
      allCards: newCards
    })
    
    const newList = this.state.lists.filter(list => list.cardIds !== card.id)
  }

  // const newRandomCard = () => {
  //   const id = Math.random().toString(36).substring(2, 4)
  //     + Math.random().toString(36).substring(2, 4);
  //   return {
  //     id,
  //     title: `Random Card ${id}`,
  //     content: 'lorem ipsum',
  //   }
  // }

  handleAddRandomCard = () => {
    console.log('handle add random card called')
  }

  render() {
    // const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
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
