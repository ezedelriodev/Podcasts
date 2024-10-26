import { Podcast } from "../../types/list-types";



const LIST_KEY = "podcastList";

export const savePodcastListStorage = (data: Podcast) => {
  const currentTime = new Date().getTime();
  const dataToStore = { data, timestamp: currentTime };
  localStorage.setItem(LIST_KEY, JSON.stringify(dataToStore));
};

export const getPodcastListStorage = () => {
  const storedData = localStorage.getItem(LIST_KEY);
  if (storedData) {
    const { data, timestamp } = JSON.parse(storedData);
    const currentTime = new Date().getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    if (currentTime - timestamp < oneDay) {
      return data;
    }
  }
  return null;
};


