export const dateFormat = (date: Date | null | undefined): string => {
  if (date) {
    const dateParts = date.toISOString().split('T')[0].split('-')
    return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]
  }

  return '';
}