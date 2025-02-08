import React from 'react'

const AnimeInfoRow = ({ label, value }) => {
	return (
		<div className="flex items-start gap-3">
			<span className='text-gray-300 text-sm'>
				{label}
			</span>

			<span className='text-white font-semibold text-sm text-pretty'>
				{value}
			</span>
		</div>
	)
}

export default AnimeInfoRow