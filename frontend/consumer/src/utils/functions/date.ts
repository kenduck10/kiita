export const toJapaneseFormatDate = (date: string) => {
  const constructedDate = new Date(date);
  const year = constructedDate.getFullYear().toString().padStart(4, '0');
  const month = (constructedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = constructedDate.getDate().toString().padStart(2, '0');
  return year + '年' + month + '月' + day + '日';
};
