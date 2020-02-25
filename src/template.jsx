import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      item: {
        zipcode: '',
        addres: ''
      }
    }
  }

  async getData () {
    const getJSON = (uri, options) =>
      (window.sample = function (obj, err) {
        if (err) {
          return alert(obj.message)
        }
      })

    const options = { method: 'get' }
    const uri = 'https://api.zipaddress.net/?zipcode=4530809&callback=sample'
    const params = "&?zipcode=$(/[^0-9], '')=sample"
    const data = await getJSON(uri + params, options)
    this.setState({ data: data })
  }

  handleUpdate (event) {
    const index = event.target.dataset.optionIndex
    const item = this.state.data[index]
    this.setState({ item: item })
  }

  async componentDidMount () {
    this.getData()
  }

  render () {
    return (
      <Card>
        <CardHeader title='郵便番号-住所検索API' />
        <CardActions>
          {
            <SelectorView
              data={this.state.data}
              handleUpdate={this.handleUpdate.bind(this)}
            />
          }
        </CardActions>
        <CardContent>
          <ListView item={this.state.item} />
        </CardContent>
      </Card>
    )
  }
}

const SelectorView = props => (
  <Autocomplete
    options={props.data}
    getOptionLabel={option => option.XXXXX}
    renderInput={params => (
      <TextField
        {...params}
        label='ここに郵便番号を入力'
        variant='outlined'
        style={{ width: 400 }}
        fullWidth
      />
    )}
    onChange={props.handleUpdate}
  />
)

const ListView = props => {
  const text = props.item.XXX

  return (
    <List>
      <ListItem>
        <ListItemText primary={text} />
      </ListItem>
    </List>
  )
}

export default App
