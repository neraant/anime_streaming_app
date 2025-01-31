
const HomeContent = ({ animeInput, setAnimeInput }) => {
	return (
		<main className='pb-11 w-full'>
			<div className="screen-max-width">
				<h2 className='text-white text-base mb-3'>
					Search for a content
				</h2>

				<div className="relative gradient-border rounded-3xl p-[2px] h-[64px]">
					<div className="absolute top-[0px] left-[-20px] bg-[#19A1BE] h-[86px] w-[60%] rounded-full opacity-40 blur-2xl pointer-events-none" />
					
					<input 
						onChange={e => setAnimeInput(e.target.value)}
						value={animeInput}
						type="text" 
						placeholder='Search for a content.' 
						className='absolute top-[2px] left-[2px] py-5 px-4 pr-12 rounded-3xl bg-gray-900 z-10 w-[calc(100%-4px)] h-[60px] border-none outline-none placeholder:text-gray-700 text-white'
					/>

					<button className='absolute right-4 top-[50%] z-10 translate-y-[-50%] cursor-pointer'>
						<img src="./images/search_icon.svg" alt="search" />
					</button>
					
					<div className="absolute top-[0px] right-[-20px] bg-[#7D4192] h-[60px] w-[60%] rounded-full opacity-40 blur-2xl pointer-events-none" />
				</div>
			</div>
		</main>
	)
}

export default HomeContent