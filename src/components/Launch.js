/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
// import ReactPlayer from "react-player"
import classNames from 'classnames'
import { Container, Media, Col } from 'reactstrap'

import LaunchDetails from './LaunchDetails'
import RocketDetails from './RocketDetails'
import LaunchVideo from './LaunchVideo'

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      details
      rocket {
        rocket_id
        rocket_name
        rocket_type
        cost_per_launch
        description
      }
      links {
        mission_patch_small
        presskit
        article_link
        wikipedia
        video_link
        flickr_images
      }
      launch_site {
        site_id
        site_name
        site_name_long
      }
    }
  }
`

function Launch(props) {
  let { flight_number } = props.match.params
  flight_number = Number(flight_number)

  const { error, loading, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  })

  if (loading) return <h4>Loading...</h4>
  if (error) return console.log(`Error ${error.message}`)

  const {
    mission_name,
    launch_year,
    launch_date_local,
    launch_success,
    details,
    rocket: { rocket_id, rocket_name, rocket_type, cost_per_launch, description },
    links: {
      mission_patch_small,
      presskit,
      article_link,
      wikipedia,
      video_link,
      flickr_images,
    },
    launch_site: { site_id, site_name, site_name_long },
  } = data.launch

  return (
    <div>
      <Container fluid>
        <Media className='row mt-5'>
          <Col sm='8' md='8'>
            <Media heading tag='h2' className='display-4'>
              <span className='text-dark'>Mission: </span>
              {mission_name}
            </Media>
          </Col>
          <Col className='text-right'>
            <Media right>
              <Media
                object
                src={mission_patch_small}
                alt={`${mission_name} mission patch`}
                aria-label={`${mission_name} mission patch`}
                style={{ width: 125 }}
                className='img-thumbnail rounded'
              />
            </Media>
          </Col>
        </Media>
      </Container>

      <LaunchDetails
        success={launch_success}
        flight_number={data.launch.flight_number}
        launch_year={launch_year}
        details={details}
        site_name={site_name_long}
        launch_date_local={launch_date_local}
      />
      <LaunchVideo success={launch_success} video_link={video_link} />
      <RocketDetails
        success={launch_success}
        id={rocket_id}
        name={rocket_name}
        type={rocket_type}
        wikipedia={wikipedia}
        article={article_link}
        pressKit={presskit}
        flickr={flickr_images}
      />

      <hr />
      <Link
        to='/'
        className={classNames(
          {
            'btn-success': launch_success,
            'btn-danger': !launch_success,
          },
          'btn',
          'btn-lg',
          'mb-3'
        )}
      >
        Back
      </Link>
    </div>
  )
}

export default memo(Launch)
