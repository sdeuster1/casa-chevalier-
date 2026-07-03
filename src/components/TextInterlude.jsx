export default function TextInterlude({ text }) {
  return (
    <section className="w-full bg-plum py-20 md:py-32">
      <div className="flex flex-col items-center px-6">
        <div className="w-10 h-[1px] bg-lilac mb-8"></div>
        <p className="font-playfair italic text-lilac text-xl text-center max-w-xl mx-auto">
          {text}
        </p>
        <button className="mt-12 font-playfair text-lilac text-sm tracking-[0.15em] underline hover:no-underline transition-all duration-300 cursor-pointer bg-transparent border-none">
          Discover
        </button>
      </div>
    </section>
  )
}
