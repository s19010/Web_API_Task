import React from 'react'

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

  handleSubmit (e) {
    window
      .fetch(`https://api.zipaddress.net/?zipcode=${this.state.zipcode}`, {
        mode: 'cors'
      })
      .then(res => {
        return res.json()
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
                type='tel'
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
