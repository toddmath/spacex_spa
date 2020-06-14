import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup } from 'reactstrap'

import { FaRocket as RocketIcon, FaRedo as RefreshIcon } from 'react-icons/fa'
// import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'
import LaunchesList from './LaunchesList'
import logo from '../logo.png'

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`

const Launches = () => {
  const { error, loading, data, refetch } = useQuery(LAUNCHES_QUERY)

  // const sanitize = str => String(str).replace(/(\s+)?/g, '')

  if (loading) return <h4>Loading...</h4>
  if (error) return console.log(`Error: ${error.message}`)

  return (
    <div style={{ overflowY: 'hidden', height: '100vh', maxHeight: '100vh' }}>
      <img
        src={logo}
        alt='SpaceX'
        className='img-fluid w-50 w-sm-75 mx-auto d-block mb-3'
      />
      <h1 className='display-4 my-3'>Launches</h1>
      <MissionKey />
      <ButtonGroup className='float-right my-3'>
        <Button
          color='success'
          outline
          type='button'
          aria-label='refetch launches'
          onClick={() => refetch()}
        >
          Refetch Launches <RefreshIcon />
        </Button>
        <Link className='btn btn-outline-success' to='/launch/latest'>
          Latest Launch <RocketIcon />
        </Link>
      </ButtonGroup>
      <LaunchesList launches={data.launches} width='100%' />
    </div>
  )
}

export default Launches

/*
<>
  <img
    src={logo}
    alt='SpaceX'
    className='img-fluid w-50 w-sm-75 mx-auto d-block mb-3'
  />
  <h1 className='display-4 my-3'>Launches</h1>
  <MissionKey />
  <ButtonGroup className='float-right my-3'>
    <Button
      color='success'
      outline
      type='button'
      aria-label='refetch launches'
      onClick={() => refetch()}
    >
      Refetch Launches <RefreshIcon />
    </Button>
    <Link className='btn btn-outline-success' to='/launch/latest'>
      Latest Launch <RocketIcon />
    </Link>
  </ButtonGroup>
  {data.launches.map(launch => (
    <LaunchItem key={sanitize(launch.mission_name)} launch={launch} />
  ))}
</>


import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

import LaunchItem from "./LaunchItem"
import MissionKey from "./MissionKey"
// import graphqlLogo from "../GraphQL_Logo_opt.svg"

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`

const Launches = () => {
  const { error, loading, data, refetch } = useQuery(LAUNCHES_QUERY)

  const sanitize = str => String(str).replace(/(\s+)?/g, "")

  if (loading) return <h4>Loading...</h4>
  if (error) return console.log(`Error: ${error.message}`)

  return (
    <>
      <h1 className='display-4 my-3'>Launches</h1>
      <MissionKey />
      <button
        onClick={() => refetch()}
        type='button'
        className='btn btn-outline-success btn-md float-right my-3'
      >
        Refetch Launches
      </button>
      {data.launches.map(launch => (
        <LaunchItem key={sanitize(launch.mission_name)} launch={launch} />
      ))}
    </>
  )
}

export default Launches
*/
