import propTypes from 'prop-types'
import { useEffect } from 'react';

function PlaylistName({ playlist, vidId }) {

	async function addOrRemoveVideoFromPlaylist(checkedStatus) {
		if(checkedStatus) {
			try {
				await fetch(`http://localhost:8000/api/v1/playlist/add/${vidId}/${playlist._id}`,
					{
						method: 'PATCH',
						credentials: 'include'
					}
				)
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				await fetch(`http://localhost:8000/api/v1/playlist/remove/${vidId}/${playlist._id}`,
					{
						method: 'PATCH',
						credentials: 'include'
					}
				)
			} catch (error) {
				console.log(error);
			}
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