export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const convertMillisecondsToTime = (milliseconds: number): string => {
  let seconds = Math.floor(milliseconds / 1000);
  const hoursStr = Math.floor(seconds / 3600)
    .toString()
    .padStart(1, "0");
  seconds %= 3600;
  const minutesStr = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secondsStr = (seconds %= 60).toString().padStart(2, "0");

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
};
