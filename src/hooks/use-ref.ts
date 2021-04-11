import { useRef } from 'react'

const wrapper = (ref: React.RefObject<any>) => {
  if (ref) {
    return ref
  }

  return {
    current: {
      scrollToEnd: () => {},
    },
  }
}

export const useWrappedRef = (defaultArg?: React.RefObject<any>) => {
  const ref = useRef(defaultArg)

  return wrapper(ref)
}
