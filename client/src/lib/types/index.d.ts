interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

interface TimeSeriesDailyData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

interface TimeSeriesDaily {
  [date: string]: TimeSeriesDailyData;
}

interface TimeSeries {
  "Meta Data": MetaData;
  "Time Series (Daily)": TimeSeriesDaily;
}

interface UserTimeSeries {
  id: string,
  tickerSymbol: string,
  function: string
}