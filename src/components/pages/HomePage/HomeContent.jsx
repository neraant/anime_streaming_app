import { useNavigate } from 'react-router-dom';

const HomeContent = ({ animeInput, setAnimeInput }) => {
	const navigate = useNavigate()

	const handleSearch = (e) => {
		e.preventDefault()

		if(animeInput.trim()) {
			navigate(`/anime/search?query=${encodeURIComponent(animeInput)}`, {
				replace: true
			})
		}
	}
	
	return (
		<div className='pb-11 w-full'>
			<div className="screen-max-width">
				<h5 className='text-white text-base mb-3'>
					Поиск
				</h5>

				<form onSubmit={handleSearch} className="relative gradient-border rounded-3xl p-[2px] h-[64px]">
					<div className="absolute top-[0px] left-[-20px] bg-[#19A1BE] h-[86px] w-[60%] rounded-full opacity-40 blur-2xl pointer-events-none" />
					
					<input 
						onChange={e => setAnimeInput(e.target.value)}
						value={animeInput}
						type="text" 
						placeholder='Поиск аниме..' 
						className='absolute top-[2px] left-[2px] py-5 px-4 pr-12 rounded-3xl bg-gray-900 z-10 w-[calc(100%-4px)] h-[60px] border-none outline-none placeholder:text-gray-700 text-white'
					/>

					<button 
						className='absolute right-4 top-[50%] z-10 translate-y-[-50%] cursor-pointer'
						onClick={handleSearch}
						type='submit'
					>
						<img src="/images/search_icon.svg" alt="search" />
					</button>
					
					<div className="absolute top-[0px] right-[-20px] bg-[#7D4192] h-[60px] w-[60%] rounded-full opacity-40 blur-2xl pointer-events-none" />
				</form>
			</div>
		</div>
	)
}

export default HomeContent