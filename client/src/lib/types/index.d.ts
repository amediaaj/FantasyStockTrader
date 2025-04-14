interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Output Size': string;
  '5. Time Zone': string;
}

interface TimeSeriesDailyData {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

interface TimeSeriesDaily {
  [date: string]: TimeSeriesDailyData;
}

interface TimeSeries {
  id: string;
  'Meta Data': MetaData;
  'Time Series (Daily)': TimeSeriesDaily;
}

interface UserTimeSeries {
  id: string;
  userId: string;
  tickerSymbol: string;
  function: string;
}

/******************************************* */

export interface TickerBestMatches {
  bestMatches: BestMatch[];
}

export interface BestMatch {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
}

/******************************************* */

type User = {
  id: string;
  email: string;
  displayName: string;
};
