import React, { memo } from 'react'
import { areEqual } from 'react-window'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import Moment from 'react-moment'
import { Card, CardBody, CardTitle, CardSubtitle, Col } from 'reactstrap'

const LaunchListItem = memo(
  ({
    launch: { flight_number, mission_name, launch_date_local, launch_success },
    style,
  }) => {
    return (
      <div style={style}>
        <Card
          className={classNames(
            { 'border-success': launch_success, 'border-danger': !launch_success },
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
                    'text-success': launch_success,
                    'text-danger': !launch_success,
                  })}
                >
                  {mission_name}
                </span>
              </CardTitle>
              <CardSubtitle className='pt-2'>
                <Moment format='LLLL'>{launch_date_local}</Moment>
              </CardSubtitle>
            </Col>

            <Col md='4' className='d-flex pt-2'>
              <Link
                to={`/launch/${flight_number}`}
                className={classNames(
                  {
                    'btn-outline-success': launch_success,
                    'btn-outline-danger': !launch_success,
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
  },
  areEqual
)

export default LaunchListItem
