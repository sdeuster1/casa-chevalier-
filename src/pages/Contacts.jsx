import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import DropdownMenu from '../components/DropdownMenu'
import Footer from '../components/Footer'

const details = [
  { icon: Mail, label: 'Email', value: 'concierge@casachevalier.com' },
  { icon: Phone, label: 'Telephone', value: '+39 02 1234 5678' },
  { icon: MapPin, label: 'Atelier', value: 'Via della Spiga, Milano, Italia' },
]

export default function Contacts() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const setField = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} variant="dark" />
      <DropdownMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-bodoni uppercase text-plum text-2xl md:text-3xl tracking-[0.2em] text-center mb-4">
            Contacts
          </h1>
          <p className="font-playfair italic text-lilac text-center text-sm mb-16 md:mb-20">
            We are at your service
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Left: contact details */}
            <div className="flex flex-col gap-8">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <Icon className="w-5 h-5 text-plum mt-1 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="font-playfair italic text-lilac text-[10px] tracking-[0.15em] uppercase">
                      {label}
                    </span>
                    <span className="font-playfair text-dark text-sm mt-1">{value}</span>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <h3 className="font-bodoni uppercase text-dark text-sm tracking-[0.15em] mb-3">
                  Concierge Hours
                </h3>
                <p className="font-playfair text-dark/70 text-sm">
                  Monday to Friday, 10:00 — 19:00 CET
                </p>
                <p className="font-playfair text-dark/70 text-sm">
                  Saturday, by appointment
                </p>
              </div>
            </div>

            {/* Right: contact form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field label="Name" value={form.name} onChange={setField('name')} required />
              <Field label="Email" type="email" value={form.email} onChange={setField('email')} required />
              <Field label="Subject" value={form.subject} onChange={setField('subject')} required />
              <label className="flex flex-col gap-1">
                <span className="font-playfair italic text-dark/60 text-xs">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={setField('message')}
                  className="bg-transparent text-dark font-playfair text-sm py-2 w-full outline-none border-0 border-b border-dark/30 focus:border-plum transition-colors resize-none"
                />
              </label>
              <button
                type="submit"
                className="mt-4 self-start font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-8 cursor-pointer hover:opacity-90 transition-opacity duration-300"
              >
                {sent ? 'Message Sent' : 'Send Message'}
              </button>
              {sent && (
                <p className="font-playfair italic text-plum text-sm">
                  Thank you — our concierge team will be in touch shortly.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Field({ label, className = '', ...rest }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="font-playfair italic text-dark/60 text-xs">{label}</span>
      <input
        {...rest}
        className="bg-transparent text-dark font-playfair text-sm py-2 w-full outline-none border-0 border-b border-dark/30 focus:border-plum transition-colors"
      />
    </label>
  )
}
