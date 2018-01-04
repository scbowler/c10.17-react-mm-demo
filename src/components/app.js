import React, { Component } from 'react';
import '../assets/css/app.css';
import cardData from '../assets/helpers/card_data';

import Card from './card';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstCardIndex: null,
            cards: cardData,
            matches: 0,
            attempts: 0,
            gameState: 'ready'
        }

        this.flipCard = this.flipCard.bind(this);
        this.blockClick = false;
    }

    handleCardClick(index){

        if(this.blockClick) return;

        const { firstCardIndex, cards } = this.state;
        let matches = this.state.matches;
        let attempts = this.state.attempts;
        let cardIndex = null;
        let gameState = this.state.gameState;

        if(firstCardIndex === null){
            console.log('First Card Clicked');

            cardIndex = index;

            this.flipCard(index);
        } else {
            this.blockClick = true;
            console.log('Second Card Clicked');
            attempts++;
            const card1 = cards[firstCardIndex].front;
            const card2 = cards[index].front;
            this.flipCard(index);

            if(card1 === card2){
                console.log('MATCH!!');
                matches++;

                if(matches === cards.length/2){
                    console.log('Game Won');

                    gameState = 'won';
                }

                this.blockClick = false;

            } else {
                console.log('NOT A MATCH');

                setTimeout(() => {
                    this.flipCard(firstCardIndex);
                    this.flipCard(index);
                    this.blockClick = false;
                }, 1000);
            }
        }

        this.setState({
            firstCardIndex: cardIndex,
            matches: matches,
            attempts: attempts,
            gameState: gameState
        });

    }

    flipCard(index){

        const newCards = this.state.cards.slice();

        newCards[index].flipped = !newCards[index].flipped;

        this.setState({
            cards: newCards
        });
    }


    render(){

        const { cards, matches, attempts, gameState } = this.state;

        const cardElements = cards.map( (card, index ) => {
            return <Card flip={() => this.handleCardClick(index)} key={index} card={card}/>
        });

        return (
            <div className="app">
                <h1>Memory Match</h1>
                <h3>Accuracy: { attempts ? ((matches/attempts) * 100).toFixed(0) : 0 }%</h3>
                <div className="game-board">
                    {cardElements}
                </div>
                <h1>{gameState === 'won' ? 'You Won!' : ''}</h1>
            </div>
        );
    }
}

export default App;
