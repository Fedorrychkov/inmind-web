const interpolationRegexp = /\{\{([^}]+)\}\}/g

export const hasInterpolationTemplate = (content: string): boolean => content.match(interpolationRegexp) ? true : false

export const getInterpolatedString = (content: string, data: any) => {
  return content.replace(interpolationRegexp, (_, group: string) => {
    return data[group.trim()] || ''
  })
}
