/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import ReactPlayer from "react-player"
import classNames from 'classnames'
import { Container, Media, Col } from 'reactstrap'

import LaunchDetails from './LaunchDetails'
import RocketDetails from './RocketDetails'
import LaunchVideo from './LaunchVideo'

const LAUNCH_QUERY = gql`
  query Launch($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_year
      launch_date_local
      launch_success
      details
      rocket {
        rocket {
          id
          cost_per_launch
          description
        }
        rocket_name
        rocket_type
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
  let { id } = props.match.params
  const { error, loading, data } = useQuery(LAUNCH_QUERY, {
    variables: { id: Number(id) },
  })

  if (loading) return <h4>Loading...</h4>
  if (error) return <div>Error {error.message}</div>

  const { launch } = data
  const success = launch.launch_success

  return (
    <div>
      <Container fluid>
        <Media className='row mt-5'>
          <Col sm='8' md='8'>
            <Media heading tag='h2' className='display-4'>
              <span className='text-dark'>Mission: </span>
              {launch.mission_name}
            </Media>
          </Col>
          <Col className='text-right'>
            <Media right>
              <Media
                object
                src={launch.links.mission_patch_small}
                alt={`${launch.mission_name} mission patch`}
                aria-label={`${launch.mission_name} mission patch`}
                style={{ width: 125 }}
                className='img-thumbnail rounded'
              />
            </Media>
          </Col>
        </Media>
      </Container>

      <LaunchDetails
        success={success}
        flight_number={data.launch.flight_number}
        launch_year={launch.launch_year}
        details={launch.details}
        site_name={launch.site_name_long}
        launch_date_local={launch.launch_date_local}
      />
      <LaunchVideo success={success} video_link={launch.links.video_link} />
      <RocketDetails
        success={success}
        id={launch.rocket.rocket.id}
        name={launch.rocket.rocket_name}
        type={launch.rocket.rocket_type}
        wikipedia={launch.links.wikipedia}
        article={launch.links.article_link}
        pressKit={launch.links.presskit}
        flickr={launch.links.flickr_images}
      />

      <hr />
      <Link
        to='/'
        className={classNames(
          {
            'btn-success': success,
            'btn-danger': !success,
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
