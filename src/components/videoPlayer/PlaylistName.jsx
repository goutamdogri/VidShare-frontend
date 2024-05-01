import propTypes from 'prop-types'
import { useEffect } from 'react';
import apiRequest from '../../hooks/apiRequest.js'

function PlaylistName({ playlist, vidId }) {

	async function addOrRemoveVideoFromPlaylist(checkedStatus) {
		if(checkedStatus) {
				await apiRequest(`/playlist/add/${vidId}/${playlist._id}`, "PATCH")
		} else {
				await apiRequest(`/playlist/remove/${vidId}/${playlist._id}`, 'PATCH')
		}
	}

	useEffect(() => {
		checkPresenceOfVideo()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function checkPresenceOfVideo() {
		const videos = playlist.videos;
		for(let i = 0; i < videos.length; i++) {
			if(videos[i] === vidId) {
				document.getElementById(`${playlist.name}-checkbox`).checked = true;
      }
		}
	}

	return (
		<li className="mb-2 last:mb-0">
			<label
				className="group/label inline-flex cursor-pointer items-center gap-x-3"
				htmlFor={`${playlist.name}-checkbox`}
			>
				<input
					type="checkbox"
					className="peer hidden"
					id={`${playlist.name}-checkbox`}
					onChange={(e) => addOrRemoveVideoFromPlaylist(e.target.checked)}
				/>
				<span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="3"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.5 12.75l6 6 9-13.5"
						></path>
					</svg>
				</span>
				{playlist.name}
			</label>
		</li>
	)
}

PlaylistName.propTypes = {
	playlist: propTypes.object,
	vidId: propTypes.string,
}

export default PlaylistName