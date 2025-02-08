const LoadingSkeleton = () => {
	return (
		<div className="screen-max-width relative">
			<div className='flex flex-col items-center md:flex-row md:items-start gap-4 w-full mb-6'>
				<div className='flex flex-col'>
					<div className='w-[350px] h-[400px] rounded-md bg-gray-700 animate-pulse' />

					<div className='w-full h-[28px] mt-1 rounded-md bg-gray-700 animate-pulse' />
				</div>

				<div className="flex flex-col w-full h-full">
					<div className="bg-gray-700 animate-pulse w-[70%] h-8 mb-2 rounded-md" />

					<div className="bg-gray-700 animate-pulse w-[50%] h-7 mb-6 rounded-md" />

					<div className="grid grid-cols-6 w-full">
						<div className="grid grid-cols-1 col-span-3 md:col-span-2 gap-y-4">
							<span className="bg-gray-700 animate-pulse w-[40%] h-5 rounded-md" />
							<span className="bg-gray-700 animate-pulse w-[40%] h-5 rounded-md" />
							<span className="bg-gray-700 animate-pulse w-[40%] h-5 rounded-md" />
							<span className="bg-gray-700 animate-pulse w-[40%] h-5 rounded-md" />
							<span className="bg-gray-700 animate-pulse w-[40%] h-5 rounded-md" />
						</div>

						<div className="grid grid-cols-1 col-span-3 md:col-span-4 gap-y-4">
							<span className="bg-gray-700 animate-pulse w-[60%] h-5 rounded-md" />
							<span className="bg-gray-700 animate-pulse w-[60%] h-5 rounded-md" />
							<span className="bg-gray-700 animate-pulse w-[60%] h-5 rounded-md" />
							<span className="bg-gray-700 animate-pulse w-[60%] h-5 rounded-md" />
							<span className="bg-gray-700 animate-pulse w-[60%] h-5 rounded-md" />
						</div>
					</div>

					<div className="flex flex-col gap-2 mt-6">
						<span className="bg-gray-700 animate-pulse w-[30%] h-6 rounded-md" />
						<span className="bg-gray-700 animate-pulse w-[100%] h-48 rounded-md" />
					</div>
				</div>
			</div>

			<div className='w-full h-[200px] bg-gradient-to-b from-transparent to-gray-800 absolute bottom-[0px] left-0 ' />
		</div>
	)
}

export default LoadingSkeleton