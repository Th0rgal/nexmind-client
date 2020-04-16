import React, { Component } from 'react'

class Progress extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="w-full h-8 bg-indigo-200 rounded-sm">
        <div
          className="h-full m-0 bg-indigo-700 rounded-sm"
          style={{ width: this.props.progress + '%' }}
        />
      </div>
    )
  }
}

export default Progress