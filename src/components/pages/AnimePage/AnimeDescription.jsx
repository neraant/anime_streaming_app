const AnimeDescription = ({ description }) => {
	return (
		<div className="flex flex-col gap-1 mt-6">
			<h5 className='text-purple-500 font-semibold'>
				Описание
			</h5>

			<p className='text-gray-200 font-light text-sm'>
				{description || "Нет информации"}
			</p>
		</div>
	)
}

export default AnimeDescription