import { type } from "@testing-library/user-event/dist/type";
import { iex } from "../config/iex";

export const stockk = {
  latestPrice: (ticker, callback) => {
    return fetch(stockk.latestPriceURL(ticker))
      .then((response) => response.json())
      .then((data) => {
        callback(stockk.formatPriceData(data));
      });
  },
  formatDate: (date) => {
    return new Date(date).toISOString().slice(0, 10).replace(/-/g, '');
  },
  yesterdayCloseURL: (ticker, date) => {
    //console.log(today)
    //const formattedDate = date.replace(/-/g, ''); // Remove all hyphens from the date
    
    //const url= `${iex.base_url}/ref-data/us/dates/trade/last/1/${today}?token=${iex.api_token}`;
    //console.log(url)
    //fetch(url).then((res)=>res.json()).then(console.log)
    var LastTradingDate=stockk.formatDate(date)
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=0&exactDate=${LastTradingDate}&token=${iex.api_token}`;
},

  latestPriceURL: (ticker) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=0&token=${iex.api_token}`;
  },
 
  formatPriceData: (data) => {
    
    const formattedData = findLatestValidData(data);
    return data;
  },
  getYesterDayClose: (ticker, date,callback) => {
    stockk.getLastTradingDate(date).then((data)=>{
      return fetch(stockk.yesterdayCloseURL(ticker,data[0].date))
      .then((response) => response.json())
      .then((data) => {
        callback( data)
      });
    })
  },
  getLastTradingDate:(date)=>{
    var today=stockk.formatDate(date)
    const url= `${iex.base_url}/ref-data/us/dates/trade/last/1/${today}?token=${iex.api_token}`;
    console.log(today)
    return fetch(url).then((res)=>res.json())
 
  },
  getAllStockSymbols: () => {
    return fetch(`${iex.base_url}/ref-data/symbols?token=${iex.api_token}`)
      .then((response) => response.json())
      .then((data) => {
        // Filter the symbols to include only those from the NASDAQ exchange
        const nasdaqSymbols = data.filter(
          (stockData) =>
            stockData.exchangeName === "Nasdaq All Markets" &&
            stockData.type === "cs" 
        );
  
        // Extract the first 100 stock symbols from NASDAQ
        const symbols = nasdaqSymbols.slice(0, 30).map((stockData) => stockData.symbol);
        console.log(symbols);
        return symbols;
      });
  },

};
function findLatestValidData(data) {
  let index = data.length - 1;
  while (index >= 0) {
    const stockData = data[index];
    if (stockData.close !== null && stockData.close !== undefined &&stockData.date !== null && stockData.date !== undefined && stockData.label !== null && stockData.label !== undefined) {
      const formattedData = {
        price: stockData.close,
        date: stockData.date,
        time: stockData.label,
      };

      return formattedData;
    }
    index--;
  }

  // If no valid data is found, return the default values or handle the case as desired.
  const formattedData = {
    price: 100,
    date: "2023-08-04",
    time: "03:59 PM",
  };
  return formattedData;
}
function yesterdayFindLatestValidData(data) {
  let index = data.length - 1;
  while (index >= 0) {
    const stockData = data[index];
    if (stockData.close !== null && stockData.close !== undefined &&stockData.date !== null && stockData.date !== undefined && stockData.label !== null && stockData.label !== undefined) {
      const formattedData = {
        price: stockData.close,
        date: stockData.date,
        time: stockData.label,
      };
      return formattedData;
    }
    index--;
  }

  // If no valid data is found, return the default values or handle the case as desired.
  const formattedData = {
    price: 100,
    date: "2023-08-04",
    time: "03:59 PM",
  };
  return formattedData;
}
