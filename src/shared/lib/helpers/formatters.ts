export const formatDate = (
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options || defaultOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  return `${hours}h ${mins}m`;
};
