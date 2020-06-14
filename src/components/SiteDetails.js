import React, { memo } from 'react'
import classNames from 'classnames'
import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap'

const SiteDetails = ({ success, siteId, name }) => (
  <Card
    className={classNames(
      { 'border-success': success, 'border-danger': !success },
      'shadow',
      'my-4'
    )}
  >
    <CardHeader>
      <h3 className='h4'>Launch Site</h3>
    </CardHeader>

    <ListGroup className='p-0 card-body'>
      <ListGroupItem>Site ID: {siteId}</ListGroupItem>
      <ListGroupItem>Site Name: {name}</ListGroupItem>
    </ListGroup>
  </Card>
)

export default memo(SiteDetails)
