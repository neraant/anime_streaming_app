import { FaSpinner } from 'react-icons/fa'

const LoadingSkeleton = ({ isSearching, isLoading }) => {
	return (
		<div className="screen-max-width w-full">
			<h3 className='flex items-center gap-2 text-3xl text-white font-semibold mb-4'>
				{!isSearching ? 'Аниме' : "Найдено"}
				{isLoading && (
					<FaSpinner className='animate-spin' fontSize={24} />
				)}
			</h3>

			<div className="pb-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-3">
					{Array.from({ length: 20 }).map((_, index) => (
						<div key={index} className="rounded-lg overflow-hidden w-full">
							<div className="bg-gray-700 w-full h-[380px] rounded-lg animate-pulse" />

							<div className="w-[80%] mt-2 bg-gray-700 h-4 rounded-md animate-pulse" />

							<div className="w-[30%] mt-2 bg-gray-700 h-4 rounded-md animate-pulse" />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default LoadingSkeleton