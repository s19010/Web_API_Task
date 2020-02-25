import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import AssetExample from './components/AssetExample'
import { Card } from 'react-native-elements'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  componentWillMount () {
    return window
      .fetch('https://facebook.github.io/react-native/movies.json')
      .then(response => response.json())
      .then(responseJson =>
        this.setState({
          movies: responseJson.movies,
          title: responseJson.title
        })
      )
      .catch(error => {
        console.error(error)
      })
  }

  renderMusics () {
    return this.state.movies.map(movie => (
      <AssetExample key={movie.title} movie={movie} />
    ))
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{this.state.title}</Text>
        <ScrollView>
          <Card title='Local Modules'>{this.renderMusics()}</Card>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  }
})

export default App
