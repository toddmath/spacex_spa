/* eslint-disable react/no-array-index-key */
import React, { useEffect, memo } from 'react'
import classNames from 'classnames'
import {
  Card,
  CardHeader,
  CardLink,
  CardFooter,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'

import { FaWikipediaW as Wikipedia, FaFilePdf as PdfFileIcon } from 'react-icons/fa'
import DetailListItem from './DetailListItem'
import { useBackground } from '../context/background.context'

const showTwo = pics => pics.filter((p, i) => i >= 2 && i <= 3)

const RocketDetails = ({
  success,
  id,
  name,
  type,
  wikipedia,
  article,
  pressKit,
  flickr,
}) => {
  const [bg, setBg] = useBackground()

  useEffect(() => {
    setBg(flickr[0])
  }, [setBg, flickr])

  useEffect(() => {
    document.body.style.background = bg ? `url(${bg})` : '#060606'
    document.body.style.backgroundSize = 'cover'

    return () => {
      document.body.style.background = '#060606'
    }
  }, [bg])

  return (
    <Card
      className={classNames(
        { 'border-success': success, 'border-danger': !success },
        'shadow',
        'mb-4'
      )}
    >
      <CardHeader>
        <h3 className='h4'>Rocket Details</h3>
      </CardHeader>

      <ListGroup className='p-0 card-body'>
        <DetailListItem success={success} title='ID'>
          {id}
        </DetailListItem>
        <DetailListItem success={success} title='Name'>
          {name}
        </DetailListItem>
        <DetailListItem success={success} title='Type'>
          {type}
        </DetailListItem>
        {flickr.length > 0 && (
          <ListGroupItem>
            {flickr.length > 1 ? (
              showTwo(flickr).map((link, i) => (
                <img
                  key={i}
                  alt={`flickr img ${i + 1}`}
                  src={link}
                  className='img img-thumbnail w-50'
                />
              ))
            ) : (
              <img
                src={flickr}
                alt='flick img'
                className='img img-thumbnaill w-auto'
              />
            )}
          </ListGroupItem>
        )}
      </ListGroup>

      <CardFooter className='d-flex flex-row justify-content-around align-items-center'>
        <CardLink
          href={wikipedia}
          referrerPolicy='no-referrer'
          rel='noreferrer noopener'
          target='_blank'
          className={classNames({
            'text-success': success,
            'text-danger': !success,
          })}
        >
          <Wikipedia size='1.8em' />
        </CardLink>
        {pressKit && (
          <CardLink
            href={pressKit}
            referrerPolicy='no-referrer'
            rel='noreferrer noopener'
            target='_blank'
            className={classNames({
              'text-success': success,
              'text-danger': !success,
            })}
          >
            Press-kit <PdfFileIcon size='1.8em' />
          </CardLink>
        )}
        {wikipedia !== article && (
          <CardLink
            href={article}
            referrerPolicy='no-referrer'
            rel='noreferrer noopener'
            target='_blank'
            className={classNames({
              'text-success': success,
              'text-danger': !success,
            })}
          >
            Article on {name}
          </CardLink>
        )}
      </CardFooter>
    </Card>
  )
}

export default memo(RocketDetails)
