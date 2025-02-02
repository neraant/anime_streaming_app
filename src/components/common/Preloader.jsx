import { RingLoader } from 'react-spinners'

const Preloader = () => {
	return (
		<div className='w-full h-[100dvh] flex-center flex-col gap-4'>
			<RingLoader color='#7d2fd0' size={92} />

			<span className='text-gray-700'>Loading...</span>
		</div>
	)
}

export default Preloader