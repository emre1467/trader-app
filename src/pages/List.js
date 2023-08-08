import React, { useEffect, useState } from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import StockRow from '../components/StockRow';
import { stock } from '../resources/stock';
import { Button } from 'semantic-ui-react';
import { Grid, GridColumn } from 'semantic-ui-react';



export default function
    () {
    var lis = ["pcar", "tsla", "goog", "abnb", "aapl", "abnb",]
    useEffect(() => {

    }, []);

    return (
        <div style={{ paddingTop: "80px", paddingBottom: "500px" }}>
            <div className='container'>
                <Grid>
                    <Grid.Row>
                        <GridColumn width={3}>
                            <Button ><a style={{color:"red"}} href='/portfoy'>Portföyüm</a></Button>

                        </GridColumn>
                        <GridColumn width={12}>

                            <div >
                                <div className='card' style={{ width: "100%", height: "100%" }}>
                                    <div className='card-body'>
                                        <ul className='list-group list-group-flush'>

                                            {lis.map((ticker) => (
                                                <StockRow key={ticker} ticker={ticker} />
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </GridColumn>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}
