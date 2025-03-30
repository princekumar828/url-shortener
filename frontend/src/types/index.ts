export interface UrlData {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  lastClicked: string;
}

export interface ApiResponse {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
}

export interface UrlStats {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  lastClicked: string;
  shortUrl: string;
} 