import React, { Component } from 'react'
// import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import { gameCreate } from '../../api/game'
import messages from '../AutoDismissAlert/messages'
import mancala from 'mancala'
// import Game from './GameBoard/Game'

class GameCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: new mancala.Game({}),
      id: null,
      created: false,
    }
  }

  componentDidMount() {
    const { msgAlert, user } = this.props

    gameCreate(user, this.state.game.toJSON())
      .then(res => {
        // take the ID that was created and set it to the game
        this.setState({
          game: mancala.Game.fromJSON(res.data.game),
          id: res.data.game.id,
          created: true
        })
      })
      .then(() => {
        msgAlert({
          heading: 'New Game Success',
          variant: 'success',
          message: messages.gameCreateSuccess
        })
      })
      .catch(() => {
        msgAlert({
          heading: 'New Game Failure',
          variant: 'danger',
          message: messages.gameCreateFailure
        })
      })
  }

  render () {
    if (!this.state.created) {
      return <p>Oops! Something went wrong.</p>
    }
    return <Redirect to={`/games/${this.state.id}`} />
  }
}

export default GameCreate
