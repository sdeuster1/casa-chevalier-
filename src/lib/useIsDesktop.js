import { useSyncExternalStore } from 'react'

// True from the md breakpoint (768px) up, kept in sync as the window resizes.
const DESKTOP = '(min-width: 768px)'
const subscribe = (cb) => {
  const mq = window.matchMedia(DESKTOP)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export const useIsDesktop = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false)
