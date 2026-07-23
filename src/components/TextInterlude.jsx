import { useNavigate } from 'react-router-dom'
import Monogram from './Monogram'

export default function TextInterlude({ text }) {
  const navigate = useNavigate()

  return (
    <section className="w-full bg-plum py-20 md:py-32">
      <div className="flex flex-col items-center px-6">
        <Monogram color="#c49fae" size={36} className="mb-8" />
        <p className="font-playfair italic text-lilac text-xl text-center max-w-xl mx-auto">
          {text}
        </p>
        <button
          onClick={() => navigate('/products')}
          className="mt-12 font-playfair text-lilac text-sm tracking-[0.15em] underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none"
        >
          Discover
        </button>
      </div>
    </section>
  )
}
