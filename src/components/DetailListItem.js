import React, { memo } from 'react'
import { ListGroupItem } from 'reactstrap'
import classNames from 'classnames'

const DetailListItem = ({ success, title, children }) => (
  <ListGroupItem>
    <span
      className={classNames({ 'text-success': success, 'text-danger': !success })}
    >
      {title}
      {': '}
    </span>
    {children}
  </ListGroupItem>
)

export default memo(DetailListItem)
