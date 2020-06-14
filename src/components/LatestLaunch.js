/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Container, Media, Col } from 'reactstrap'
import classNames from 'classnames'

import LaunchDetails from './LaunchDetails'
import RocketDetails from './RocketDetails'
import LaunchVideo from './LaunchVideo'

const LATEST_LAUNCH_QUERY = gql`
  query LatestLaunch {
    latestLaunch {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      tentative_max_precision
      tbd
      details
      links {
        mission_patch_small
        presskit
        article_link
        wikipedia
        video_link
        flickr_images
      }
      rocket {
        rocket_id
        rocket_name
        rocket_type
        cost_per_launch
        description
      }
      launch_site {
        site_id
        site_name
        site_name_long
      }
    }
  }
`

function LatestLaunch() {
  const { error, loading, data } = useQuery(LATEST_LAUNCH_QUERY)

  if (loading) return <h4>Loading...</h4>
  if (error) return console.log(`Error loading launch: ${error.message}`)

  const {
    flight_number,
    mission_name,
    launch_year,
    launch_success,
    details,
    links: {
      mission_patch_small,
      presskit,
      article_link,
      wikipedia,
      video_link,
      flickr_images,
    },
    rocket: { rocket_id, rocket_name, rocket_type, cost_per_launch, description },
    launch_site: { site_id, site_name, site_name_long },
  } = data.latestLaunch

  return (
    <div>
      <Container fluid>
        <Media className='row  mt-5'>
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
                alt={`${mission_name} patch`}
                style={{ width: 125 }}
                className='img-thumbnail rounded'
              />
            </Media>
          </Col>
        </Media>
      </Container>

      <LaunchDetails
        success={launch_success}
        flight_number={flight_number}
        launch_year={launch_year}
        details={details}
        site_name={site_name_long}
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

export default LatestLaunch
