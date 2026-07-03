import { useNavigate } from 'react-router-dom'

export default function SplashPage() {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#1a1a1a] flex items-center justify-center">
        <span className="text-gray-500 font-playfair text-sm tracking-widest">[Campaign Image]</span>
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#2a2a2a] flex items-center justify-center">
        <span className="text-gray-500 font-playfair text-sm tracking-widest">[Campaign Video]</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="font-bodoni uppercase text-white text-2xl md:text-4xl tracking-[0.25em] mb-8 px-4 text-center">
          Casa Chevalier
        </h1>
        <button
          onClick={() => navigate('/home')}
          className="font-playfair italic text-white text-sm tracking-[0.15em] underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
        >
          Discover
        </button>
      </div>
    </div>
  )
}
