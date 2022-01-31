import { AppTabProps } from "../components/app-tab/app-tab";

const createArrayWithOneValue = (value: any, length: number): any[] => {
  const arr = [];
  for (let i: number = 0; i < length; i++) arr.push(value);
  return arr;
};

const shuffleArray = (arr: any[]): any[] => {
  for (let i: number = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const sortArrayOfObjectsByProperty = (
  arr: AppTabProps[],
  property: string,
  descending: boolean
): any[] => {
  return descending
    ? arr.sort((a: AppTabProps, b: AppTabProps) => {
        const aValue: string | number = a.fields.filter(
          (field) => field.name === property
        )[0].value;
        const bValue: string | number = b.fields.filter(
          (field) => field.name === property
        )[0].value;
        return aValue > bValue ? -1 : 1;
      })
    : arr.sort((a: AppTabProps, b: AppTabProps) => {
        const aValue: string | number = a.fields.filter(
          (field) => field.name === property
        )[0].value;
        const bValue: string | number = b.fields.filter(
          (field) => field.name === property
        )[0].value;
        return aValue > bValue ? 1 : -1;
      });
};

const getTimestampStringFromDate = (date: Date): string => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  return `${year}-${(month) < 10 ? `0${month}` : month}-${day} ${(hours < 10) ? `0${hours}` : hours}:${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`
}

export { createArrayWithOneValue, shuffleArray, sortArrayOfObjectsByProperty, getTimestampStringFromDate };
