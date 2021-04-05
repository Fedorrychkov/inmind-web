import { useMemo } from 'react'
import { useTheme } from '~/theming/styled'
import { useWindowBounds } from '~/providers/window-bounds'
import type { InMindTheme } from '~/theming/types'

export function useMediaQuery(creator: (theme: InMindTheme) => string): boolean {
  const theme = useTheme()
  const bounds = useWindowBounds()
  const query = useMemo(() => creator(theme), [creator, theme])

  const matches = useMemo(() => {
    return bounds && window.matchMedia(query).matches
  }, [bounds, query])

  return matches
}