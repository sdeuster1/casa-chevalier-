import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Every new page opens at the top. Back/forward (POP) is left alone so the
// browser can return you to where you were. 'instant' overrides the site-wide
// smooth scrolling, which would otherwise glide up and stop short.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (navigationType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, navigationType])

  return null
}
