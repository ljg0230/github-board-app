export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = koreanDate.getUTCFullYear();
  const month = String(koreanDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(koreanDate.getUTCDate()).padStart(2, '0');
  const hours = String(koreanDate.getUTCHours()).padStart(2, '0');
  const minutes = String(koreanDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(koreanDate.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 오늘 날짜일 경우 시간만 노출
export const formatDateOrTimeIfToday = (dateString: string): string => {
  const date = new Date(dateString);
  const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = koreanDate.getUTCFullYear();
  const month = String(koreanDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(koreanDate.getUTCDate()).padStart(2, '0');
  const hours = String(koreanDate.getUTCHours()).padStart(2, '0');
  const minutes = String(koreanDate.getUTCMinutes()).padStart(2, '0');

  // 현재 한국 시간 구하기
  const now = new Date();
  const koreanNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  const isToday =
    koreanDate.getUTCFullYear() === koreanNow.getUTCFullYear() &&
    koreanDate.getUTCMonth() === koreanNow.getUTCMonth() &&
    koreanDate.getUTCDate() === koreanNow.getUTCDate();

  return isToday
    ? `${hours}:${minutes}`
    : `${year}-${month}-${day} ${hours}:${minutes}`;
};
