export const getVideoRef = (element: any) => {
  if (!element) {
    return {
      play: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
    }
  }

  return element
}

export const getElRef = (element: any) => {
  if (!element) {
    return {
      classList: {},
      focus: () => {},
    }
  }

  return element
}
