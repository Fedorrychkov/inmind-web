export const mapTestId = (props: any) => {
  if (props.testId) {
    return {
      'data-marker': props.testId,
    }
  }

  return {}
}
