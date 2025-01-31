const Footer = () => {
	return (
		<footer className='w-full pb-4 pt-5 bg-gray-900 mt-auto'>
			<div className='flex justify-between w-full px-5'>
				<span className='text-white'>
					Local project
				</span>

				<span className='text-white'>
					aniant.org 
					<span className='text-purple-500'>
						{` ${new Date().getFullYear()}`}
					</span>
				</span>
			</div>
		</footer>
	)
}

export default Footer