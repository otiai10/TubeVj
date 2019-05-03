
export declare interface YouTubeThumbnail {
  width: number;
  height: number;
  url: string;
}

export declare interface YouTubeVideoSnippet {
  title: string;
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishedAt: Date;
  thumbnails: {
    default: YouTubeThumbnail;
    high: YouTubeThumbnail;
    medium: YouTubeThumbnail;
  };
}

export declare interface YouTubeSearchItem {
  etag: string;
  kind: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: YouTubeVideoSnippet;
}

export declare interface YouTubeSearchResponse {
  etag: string;
  kind: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  regionCode: string;
  items: YouTubeSearchItem[];
}

