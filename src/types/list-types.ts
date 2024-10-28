export interface Podcast {
    feed: Feed;
  }
  
export interface Feed {
  author: Author;
  entry: Entry[];
  updated: Icon;
  rights: Icon;
  title: Icon;
  icon: Icon;
  link: Link[];
  id: Icon;
}

export interface Author {
  name: Icon;
  uri: Icon;
}

export interface Icon {
  label: string;
}

export interface Entry {
  "im:name": Icon;
  "im:image": IMImage[];
  summary: Icon;
  "im:price": IMPrice;
  "im:contentType": IMContentType;
  rights?: Icon;
  title: Icon;
  link: Link;
  id: ID;
  "im:artist": IMArtist;
  category: Category;
  "im:releaseDate": IMReleaseDate;
}

export interface Category {
  attributes: CategoryAttributes;
}

export interface CategoryAttributes {
  "im:id": string;
  term: string;
  scheme: string;
  label: string;
}

export interface ID {
  label: string;
  attributes: IDAttributes;
}

export interface IDAttributes {
  "im:id": string;
}

export interface IMArtist {
  label: string;
  attributes?: IMArtistAttributes;
}

export interface IMArtistAttributes {
  href: string;
}

export interface IMContentType {
  attributes: IMContentTypeAttributes;
}

export interface IMContentTypeAttributes {
  term: string;
  label: string;
}

export interface IMImage {
  label: string;
  attributes: IMImageAttributes;
}

export interface IMImageAttributes {
  height: string;
}

export interface IMPrice {
  label: string;
  attributes: IMPriceAttributes;
}

export interface IMPriceAttributes {
  amount: string;
  currency: string;
}

export interface IMReleaseDate {
  label: string;
  attributes: Icon;
}

export interface Link {
  attributes: LinkAttributes;
}

export interface LinkAttributes {
  rel: string;
  type?: string;
  href: string;
}
  