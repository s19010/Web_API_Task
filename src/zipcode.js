import React from 'react'
// import axios from 'axios'
// import axiosJsonpAdapter from 'axios-jsonp'
// import app from 'express'
import jsonp from 'jsonp'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      zipcode: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({ zipcode: e.target.value })
  }

  /* handleSubmit (e) {
    const script = document.createElement('script')
    script.src = `https://api.zipaddress.net/?zipcode=${this.state.zipcode}&callback=callbackFunk`
    window.callbackFunk = function (res) {
      return res.json()
    }.then(getJson => {
      this.setState({ address: getJson.data.fullAddress })
    })
    document.body.appendChild(script)
    e.preventDefault()
  } */

  handleSubmit (e) {
    jsonp(
      `https://api.zipaddress.net/?zipcode=${this.state.zipcode}&callback=?`
    )
      .then(response => {
        return response.json()
      })
      .then(myJson => {
        this.setState({ address: myJson.data.fullAddress })
      })
    e.preventDefault()
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p className='p1'>
            郵便番号から住所を表示
            <br />
            <span className='spanA'>
              郵便番号
              <span className='spanB'>
                (ハイフンは付けずに入力してください)：
              </span>
              <input
                type='text'
                value={this.state.zipcode}
                onChange={this.handleChange}
                maxLength='7'
              />
            </span>
            <input type='submit' value='検索' />
          </p>
        </form>
        <p className='p2'>住所：{this.state.address}</p>
      </div>
    )
  }
}

export default App
