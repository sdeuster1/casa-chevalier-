import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'

const faqs = [
  {
    question: 'Where are Casa Chevalier pieces made?',
    answer:
      'Every garment is designed and handcrafted in Italy, drawing on traditional equestrian tailoring techniques passed down through generations of artisans.',
  },
  {
    question: 'What is your shipping policy?',
    answer:
      'We offer complimentary shipping on all orders within the EU. International orders are delivered within 5-10 business days via our courier partners.',
  },
  {
    question: 'Can I return or exchange an item?',
    answer:
      'Yes. Unworn items may be returned within 30 days of delivery for a full refund or exchange. Please contact our concierge team to arrange a return.',
  },
  {
    question: 'Do you offer made-to-measure services?',
    answer:
      'Select pieces from the Capsule Collection can be tailored to measure. Reach out to our concierge team in Milan to discuss availability and lead times.',
  },
  {
    question: 'How do I care for my Casa Chevalier garments?',
    answer:
      'Each piece is delivered with detailed care instructions. In general, we recommend dry cleaning and storing garments away from direct sunlight.',
  },
  {
    question: 'How do I find my size?',
    answer:
      'A detailed size guide is available on every product page. For personalised advice, our concierge team is happy to assist over email or telephone.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes. We deliver worldwide via our courier partners. Duties and taxes for orders outside the EU are calculated at checkout.',
  },
]

export default function FAQ() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: heading */}
          <div className="md:sticky md:top-32 self-start">
            <p className="font-playfair italic text-lilac text-[11px] tracking-[0.25em] uppercase mb-6">
              Frequently Asked Questions
            </p>
            <h1 className="font-bodoni text-dark text-4xl md:text-6xl leading-tight">
              Some answers<br />to your questions
            </h1>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col border-t border-plum/20">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div key={faq.question} className="border-b border-plum/20">
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 py-6 md:py-7 bg-transparent border-none cursor-pointer text-left"
                  >
                    <span className="font-bodoni text-dark text-lg md:text-xl leading-snug">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-plum shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-plum shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="font-playfair text-dark/75 text-sm md:text-base pb-6 md:pb-7 pr-8 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
