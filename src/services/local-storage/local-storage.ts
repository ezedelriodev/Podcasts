import { Episode, Result } from "../../types/detailTypes";
import { Podcast } from "../../types/list-types";



const LIST_KEY = "podcastList";
const DETAIL_KEY = "podcastDetail";

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

export const savePodcastDetailStorage = (podcastId: string, details: Result, episodes: Episode[]) => {
  const storedDataJson = localStorage.getItem(DETAIL_KEY);
  const storedData = storedDataJson ? JSON.parse(storedDataJson) : {};

  const currentTime = new Date().getTime();
  const dataToStore = {
    podcastDetails: details,
    episodes: episodes,
    timestamp: currentTime,
  };

  storedData[podcastId] = dataToStore;

  localStorage.setItem(DETAIL_KEY, JSON.stringify(storedData));
};

export const getPodcastDetailStorage = (podcastId: string) => {
  const storedDataJson = localStorage.getItem(DETAIL_KEY);

  if (storedDataJson) {
    const storedData = JSON.parse(storedDataJson);

    if (!storedData[podcastId]) {
      return null;
    }

    const podcastDetail = storedData[podcastId];
    const { timestamp } = podcastDetail;

    const currentTime = new Date().getTime();
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

    if (currentTime - timestamp < oneDayInMilliseconds) {
      return podcastDetail;
    }
  }

  return null;
};


