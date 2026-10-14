import { Component } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

// Safety net: if any page throws while rendering (for example one malformed
// product from Shopify), show a short message with a reload button instead
// of a blank white page. resetKey (the current path) clears the error when
// the visitor navigates elsewhere.
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    console.error('Page crashed:', error, info?.componentStack)
  }

  componentDidUpdate(prev) {
    if (this.state.failed && prev.resetKey !== this.props.resetKey) {
      this.setState({ failed: false })
    }
  }

  render() {
    return this.state.failed ? <CrashMessage /> : this.props.children
  }
}

// Kept free of the navbar and footer, which could be what failed.
function CrashMessage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-6">
      <a href="/home" className="font-bodoni text-plum text-2xl tracking-[0.1em] no-underline mb-12">
        CASA CHEVALIER
      </a>
      <h1 className="font-bodoni uppercase text-plum text-xl md:text-2xl tracking-[0.2em] mb-4">
        {t('pageErrors.crashTitle')}
      </h1>
      <p className="font-playfair italic text-dark/70 text-sm max-w-md mb-10">
        {t('pageErrors.crashBody')}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="font-bodoni uppercase text-cream bg-plum text-xs tracking-[0.2em] py-3 px-8 border-none cursor-pointer hover:opacity-90 transition-opacity"
      >
        {t('pageErrors.reload')}
      </button>
    </div>
  )
}
