export interface Slide {
  id: string;
  content: string;
  order: number;
}

export interface Song {
  id: string;
  title: string;
  author: string;
  slides: Slide[];
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

export interface Display {
  id: number;
  name: string;
  width: number;
  height: number;
  primary: boolean;
}

export interface Alert {
  id: string;
  content: string;
  duration: number;
  repetitions: number;
  animation: 'left-right' | 'right-left' | 'fade' | 'top-bottom';
  style: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    fontStyle: string;
    backgroundColor: string;
    textColor: string;
  };
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  name: string;
  url: string;
  thumbnail?: string;
  duration?: number;
}

export interface MediaCategory {
  id: string;
  name: string;
  items: MediaItem[];
}