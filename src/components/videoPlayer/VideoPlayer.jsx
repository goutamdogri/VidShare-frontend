import propTypes from 'prop-types'

function VideoPlayer({ videoFile }) {
	return (
		<div className="relative mb-4 w-full pt-[56%]">
			<div className="absolute inset-0">
				<video className="h-full w-full" controls autoPlay muted>
					<source
						src={videoFile}
						type="video/mp4"
					/>
				</video>
			</div>
		</div>
	)
}

VideoPlayer.propTypes = {
  videoFile: propTypes.string.isRequired,
}

export default VideoPlayer