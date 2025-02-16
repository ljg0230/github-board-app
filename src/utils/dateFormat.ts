export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  
  // UTC 시간을 한국 시간으로 변환
  const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9
  
  const year = koreanDate.getUTCFullYear();
  const month = String(koreanDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(koreanDate.getUTCDate()).padStart(2, '0');
  const hours = String(koreanDate.getUTCHours()).padStart(2, '0');
  const minutes = String(koreanDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(koreanDate.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}; 