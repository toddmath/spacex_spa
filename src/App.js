import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import Launches from './components/Launches'
import Launch from './components/Launch'
import LatestLaunch from './components/LatestLaunch'
import { BackgroundProvider } from './context/background.context'

// import logo from './logo.png'
import './bootstrap_cyborg.css'
// import "./App.css"

const client = new ApolloClient({
  uri: '/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    <BackgroundProvider>
      <Router>
        <Container fluid='md'>
          <Route exact path='/launch/latest' component={LatestLaunch} />
          <Route exact path='/' component={Launches} />
          <Route exact path='/launch/:flight_number' component={Launch} />
        </Container>
      </Router>
    </BackgroundProvider>
  </ApolloProvider>
)

export default App

/*
const App = () => (
  <ApolloProvider client={client}>
    <BackgroundProvider>
      <Router>
        <Container fluid='md'>
          <img
            src={logo}
            alt='SpaceX'
            className='img-fluid w-50 w-sm-75 mx-auto d-block mb-3'
          />
          <Route exact path='/launch/latest' component={LatestLaunch} />
          <Route exact path='/' component={Launches} />
          <Route exact path='/launch/:flight_number' component={Launch} />
        </Container>
      </Router>
    </BackgroundProvider>
  </ApolloProvider>
)
*/
