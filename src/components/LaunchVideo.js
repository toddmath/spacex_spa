import React, { memo } from 'react'
import ReactPlayer from 'react-player'
import { Card, CardHeader, CardFooter, Media } from 'reactstrap'
import classNames from 'classnames'

const LaunchVideo = ({ success, video_link }) => (
  <Card
    className={classNames(
      { 'border-success': success, 'border-danger': !success },
      'shadow',
      'mb-4'
    )}
  >
    <CardHeader>
      <h3 className='h4'>Launch Video</h3>
    </CardHeader>
    <Media className='mx-auto w-100'>
      <ReactPlayer
        className='embed-responsive-item mw-100 mh-100 mx-auto'
        url={video_link}
        controls
        config={{
          youtube: {
            preload: true,
            playerVars: { showInfo: 1 },
          },
        }}
      />
    </Media>
    <CardFooter className='py-4' />
  </Card>
)

export default memo(LaunchVideo)

/*
<CardBody className='py-5'>
  <Media className='mx-auto w-100'>
    <ReactPlayer
      className='embed-responsive-item mw-100 mh-100 mx-auto'
      url={video_link}
      controls
      config={{
        youtube: {
          preload: true,
          playerVars: { showInfo: 1 },
        },
      }}
    />
  </Media>
</CardBody>
*/
