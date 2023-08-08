import React, { Component } from "react";
import { iex } from "../config/iex";
import { stock } from "../resources/stock";
import { Table } from "semantic-ui-react";


class StockPageData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: null,
      date: null,
      time: null,
      percent_change: null,
      dollar_change: null,
    };
  }
  changeStyle() {
    var color;
    if (this.state.dollar_change > 0) {
      color = "blue"
    }
    else { color = "red" }
    return {
      color: (this.state.dollar_change > 0) ? "green" : "red",
      marginLeft: 5,
    }

  }
  getData() {
    return new Promise((resolve, reject) => {
      stock.latestPrice(this.props.ticker, (data) => {
        this.applyData(data);
        resolve(data);
      });
    });
  }
  applyData(data) {
    console.log(data)
    this.setState({
      price: data.price,
      date: data.date,
      time: data.time,

    });
    stock.getYesterDayClose(this.props.ticker, data.date, (yesterday) => {
      //console.log(this.props.ticker,yesterday)

      // Check if data.price or yesterday.price is empty (undefined or null)
      const currentPrice = data.price || 200;
      const previousPrice = yesterday.price || 100;

      this.setState({
        dollar_change: (currentPrice - previousPrice).toFixed(2),
        percent_change: (((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2),
      });
    })
    return this.state
  }

  componentDidMount() {
    // const url = `${iex.base_url}/stock/${this.props.ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`
    ////fetch(url)
    //.then((response) => response.json())
    stock.latestPrice(this.props.ticker, this.applyData.bind(this))

  }

  render() {
    return (
      <div>
        <Table>
          <Table.Header style={{ backgroundColor: "#f5f5dc" }}>
            <Table.Row>
              <Table.HeaderCell>Hisse Kodu</Table.HeaderCell>
              <Table.HeaderCell>Hisse Fiyatı</Table.HeaderCell>
              <Table.HeaderCell>Değişim</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <a href={`/${this.props.ticker}`}>{this.props.ticker}</a>
              </Table.Cell>
              <Table.Cell>${this.state.price}</Table.Cell>
              <Table.Cell style={this.changeStyle()}>
                {this.state.dollar_change ? this.state.dollar_change : "yükleniyor"}&nbsp;({this.state.percent_change}%)
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>


    );
  }
}

export default StockPageData;
