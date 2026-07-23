import { useState } from 'react'
import { ChevronDown, Mail, Phone, MapPin } from 'lucide-react'
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
      'Yes. Unworn items may be returned within 30 days of delivery for a full refund or exchange. Please contact us to arrange a return.',
  },
  {
    question: 'Do you offer made-to-measure services?',
    answer:
      'Select pieces from the Capsule Collection can be tailored to measure. Reach out to our concierge team to discuss availability.',
  },
  {
    question: 'How do I care for my Casa Chevalier garments?',
    answer:
      'Each piece is delivered with detailed care instructions. In general, we recommend dry cleaning and storing garments away from direct sunlight.',
  },
]

const contactDetails = [
  { icon: Mail, label: 'concierge@casachevalier.com' },
  { icon: Phone, label: '+39 02 1234 5678' },
  { icon: MapPin, label: 'Via della Spiga, Milano, Italia' },
]

export default function Contacts() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-bodoni uppercase text-dark text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            Contacts
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-16">
            We are at your service
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-20 md:mb-28">
            {contactDetails.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-3">
                <Icon className="w-5 h-5 text-plum" />
                <p className="font-playfair text-dark text-sm">{label}</p>
              </div>
            ))}
          </div>

          <h2 className="font-bodoni uppercase text-dark text-xl md:text-2xl tracking-[0.15em] text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col divide-y divide-plum/20 border-t border-b border-plum/20">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div key={faq.question}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 py-5 md:py-6 bg-transparent border-none cursor-pointer text-left"
                  >
                    <span className="font-bodoni uppercase text-dark text-sm md:text-base tracking-[0.1em]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-plum shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="font-playfair text-dark/70 text-sm pb-5 md:pb-6 pr-8 -mt-2">
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
