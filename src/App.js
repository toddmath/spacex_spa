import React from 'react'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import Launches from './components/Launches'
import Launch from './components/Launch'
import LatestLaunch from './components/LatestLaunch'
import { BackgroundProvider } from './context/background.context'

import './bootstrap_cyborg.css'
// import "./App.css"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.spacex.land/graphql/',
  }),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BackgroundProvider>
        <Router>
          <Container fluid='md'>
            <Switch>
              <Route exact path='/' component={Launches} />
              <Route exact path='/launch/latest' component={LatestLaunch} />
              <Route exact path='/launch/:id' component={Launch} />
            </Switch>
          </Container>
        </Router>
      </BackgroundProvider>
    </ApolloProvider>
  )
}

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
