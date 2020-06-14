import React, { memo } from 'react'
import classNames from 'classnames'
import { Card, CardHeader, ListGroup } from 'reactstrap'
import Moment from 'react-moment'

import DetailListItem from './DetailListItem'

const LaunchDetails = ({
  success,
  flight_number,
  launch_year,
  details,
  site_name,
  launch_date_local,
}) => (
  <Card
    className={classNames(
      { 'border-success': success, 'border-danger': !success },
      'shadow',
      'my-4'
    )}
  >
    <CardHeader>
      <h3 className='h4'>Launch Details</h3>
    </CardHeader>

    <ListGroup className='p-0 card-body'>
      <DetailListItem success={success} title='Flight Number'>
        {flight_number}
      </DetailListItem>
      <DetailListItem success={success} title='Year'>
        {launch_year}
      </DetailListItem>
      <DetailListItem success={success} title='Launched'>
        <Moment fromNow>{launch_date_local}</Moment>
      </DetailListItem>
      <DetailListItem success={success} title='Success'>
        {success ? 'Yes' : 'No'}
      </DetailListItem>
      <DetailListItem success={success} title='Site'>
        {site_name}
      </DetailListItem>
      {details && (
        <DetailListItem success={success} title='Details'>
          {details}
        </DetailListItem>
      )}
    </ListGroup>
  </Card>
)

export default memo(LaunchDetails)
