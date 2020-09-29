import React from 'react'
// import Alert from 'react-bootstrap/Alert'
import ReactModal from 'react-modal'

import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: true
    }

    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({ showModal: false })
    }, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  handleClose = () => this.setState({ show: false })

  render () {
    const { variant, heading, message } = this.props

    const alertJsx = (
      <div onClick={this.handleClose}>
        <div className="alert-heading">
          {heading}
        </div>
        <div className="alert-message">
          {message}
        </div>
      </div>
    )

    return (
      <ReactModal
        isOpen={this.state.showModal}
        onRequestClose={this.handleClose}
        shouldCloseOnOverlayClick={true}
        className={['alert', variant].join(' ')}
      >
        {alertJsx}
      </ReactModal>
    )
  }
}

export default AutoDismissAlert
