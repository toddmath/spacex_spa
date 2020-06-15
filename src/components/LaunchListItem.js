import React, { memo } from 'react'
import { areEqual } from 'react-window'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import Moment from 'react-moment'
import { Card, CardBody, CardTitle, CardSubtitle, Col } from 'reactstrap'

function LaunchListItem({ launch, style }) {
  const success = launch.launch_success
  return (
    <div style={style}>
      <Card
        className={classNames(
          {
            'border-success': success,
            'border-danger': !success,
          },
          'mb-3',
          'shadow'
        )}
      >
        <CardBody className='row py-3 px-5'>
          <Col md='8 pt-2 pb-0' sm='pt-0'>
            <CardTitle tag='h5'>
              Mission:{' '}
              <span
                className={classNames({
                  'text-success': success,
                  'text-danger': !success,
                })}
              >
                {launch.mission_name}
              </span>
            </CardTitle>
            <CardSubtitle className='pt-2'>
              <Moment format='LLLL'>{launch.launch_date_local}</Moment>
            </CardSubtitle>
          </Col>

          <Col md='4' className='d-flex pt-2'>
            <Link
              to={`/launch/${launch.id}`}
              className={classNames(
                {
                  'btn-outline-success': success,
                  'btn-outline-danger': !success,
                },
                'btn',
                'btn-block',
                'align-self-end',
                'justify-self-end'
              )}
            >
              Launch Details
            </Link>
          </Col>
        </CardBody>
      </Card>
    </div>
  )
}

export default memo(LaunchListItem, areEqual)
