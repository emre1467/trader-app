import React, { useEffect, useState } from 'react'
import { db } from "./firebase-config"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { Button, Header, Table } from 'semantic-ui-react'
import StockPageData from '../components/StockPageData'
import '../App.css';
export default function Portfoy() {

  const portfoyCollectionRef = collection(db, "portfoy");
  const [portfoys, setPortfoy] = useState([]);
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const getPortfoy = async () => {
      let data = await getDocs(portfoyCollectionRef);
      setPortfoy(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPortfoy();
  }, []);
  function tutarHesapla(fiyat, maliyet, lot) {
    console.log(fiyat * lot)
    return (fiyat * lot).toFixed(2)
  }
  function KarHesapla(fiyat, maliyet, lot) {
    let topmal = maliyet * lot
    let sonuç = (fiyat * lot) - topmal
    let yüzde=(sonuç/topmal)*100
    return [sonuç.toFixed(2),yüzde.toFixed(2)]
  }
  useEffect(() => {
    const desiredStockTickers = portfoys.map((portfoy) => portfoy.nick);
    const promises = desiredStockTickers.map((ticker) =>
      new StockPageData({ ticker }).getData()
    );

    Promise.all(promises).then((results) => {
      const stockDataMap = {};
      results.forEach((data, index) => {
        stockDataMap[desiredStockTickers[index]] = data;
      });
      setStockData(stockDataMap);
    });
  }, [portfoys]);
  
  const deleteCost = async (id) => {
    if (window.confirm("Maliyet silinecek onaylıyor musunuz?")) {
        await deleteDoc(doc(db, "portfoy", id))
        alert("portfoy silindi")
    }

}

  return (
    <div style={{ width: "85%", marginLeft: "100px", marginRight: "100px",paddingBottom:"500px" }}>
      <Header style={{ paddingTop:"50px",marginBottom: "50px" }} as="h1">
        <Header.Content>Portfoyüm</Header.Content>
      </Header>
      <Table style={{}} color={'green'} inverted >
        <Table.Header >
          <Table.Row>
            <Table.HeaderCell>Hisse Adı</Table.HeaderCell>
            <Table.HeaderCell>Hisse Fiyatı</Table.HeaderCell>
            <Table.HeaderCell>Hisse Maliyeti</Table.HeaderCell>
            <Table.HeaderCell>Hisse Adeti</Table.HeaderCell>
            <Table.HeaderCell>Toplam Tutar</Table.HeaderCell>
            <Table.HeaderCell>Toplam Kar-Zarar</Table.HeaderCell>
            <Table.HeaderCell>Kar-Zarar Oranı</Table.HeaderCell>
            <Table.HeaderCell>Sil</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body color='green' inverted >
          {portfoys.map((p) => (
            <Table.Row color='green' inverted key={p.id}>
              <Table.Cell>{p.name}</Table.Cell>
              <Table.Cell>
                {stockData[p.nick] ? (
                  <div>
                    <p>{stockData[p.nick].price}</p>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </Table.Cell>
              <Table.Cell>
                {p.cost}
              </Table.Cell>
              <Table.Cell>
                {p.lot}
              </Table.Cell>
              <Table.Cell>
                {stockData[p.nick] && stockData[p.nick].price
                  ? tutarHesapla(stockData[p.nick].price, p.cost, p.lot)
                  : "N/A"}
              </Table.Cell>
              <Table.Cell style={{ color: KarHesapla(stockData[p.nick]?.price, p.cost, p.lot)[0] > 0 ? 'green' : 'red' }}>
                {stockData[p.nick] && stockData[p.nick].price
                  ? KarHesapla(stockData[p.nick].price, p.cost, p.lot)[0]
                  : "N/A"}
              </Table.Cell>
              <Table.Cell style={{ color: KarHesapla(stockData[p.nick]?.price, p.cost, p.lot)[1] > 0 ? 'green' : 'red' }}>
                {stockData[p.nick] && stockData[p.nick].price
                  ? KarHesapla(stockData[p.nick].price, p.cost, p.lot)[1] 
                  : (
                  <p>Loading...</p>
                )}%
              </Table.Cell>
             <Table.Cell>
             <Button style={{marginTop:"-10px",marginBottom:"-10px"}} onClick={() => deleteCost(p.id)}>sil</Button>
              
             </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button><a href='/addstock' >Hisse ekle</a></Button>

    </div>
  )
}
