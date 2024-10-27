export interface DetailPodcast {
  resultCount: number;
  results: Result[];
}

export interface Result {
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  artistName?: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30?: string;
  artworkUrl60: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  collectionHdPrice?: number;
  releaseDate: string;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  trackCount?: number;
  trackTimeMillis: number;
  country: string;
  currency?: string;
  primaryGenreName?: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds?: string[];
  genres: Array<string>;
  artworkUrl160?: string;
  episodeFileExtension?: string;
  episodeContentType?: string;
  string?: string;
  description?: string;
  artistIds?: any[];
  shortDescription?: string;
  previewUrl?: string;
  episodeUrl?: string;
  episodeGuid?: string;
}

export interface Episode {
  country?: string;
  collectionViewUrl?: string;
  trackTimeMillis?: number;
  feedUrl?: string;
  closedCaptioning?: string;
  collectionId?: number;
  collectionName?: string;
  episodeUrl?: string;
  artworkUrl60?: string;
  artistViewUrl?: string;
  contentAdvisoryRating?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  genres?: any[];
  episodeGuid?: string;
  releaseDate?: string;
  description?: string;
  artistIds?: number[];
  shortDescription?: string;
  trackId: number;
  trackName?: string;
  artworkUrl160?: string;
  episodeContentType?: string;
  episodeFileExtension?: string;
  artworkUrl600?: string;
  kind?: string;
  wrapperType?: string;
}

export interface Genre {
  name: string;
  id: string;
}
