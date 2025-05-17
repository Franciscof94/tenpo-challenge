export const formatNumber = (
  number: number,
  locale: string = "es-ES"
): string => {
  return new Intl.NumberFormat(locale).format(number);
};
