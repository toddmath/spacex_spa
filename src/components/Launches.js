import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

import { Button, ButtonGroup } from 'reactstrap'
import { FaRocket as RocketIcon, FaRedo as RefreshIcon } from 'react-icons/fa'
// import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'
import LaunchesList from './LaunchesList'
import logo from '../logo.png'

const LAUNCHES = gql`
  query Launches {
    launches {
      id
      mission_name
      mission_id
      launch_date_local
      launch_success
    }
  }
`

const Launches = () => {
  const { error, loading, data, refetch } = useQuery(LAUNCHES)

  // const sanitize = str => String(str).replace(/(\s+)?/g, '')

  if (loading) return <h4>Loading...</h4>
  if (error) return <div>Error: {error.message}</div>

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
