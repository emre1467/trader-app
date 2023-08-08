import React from 'react'
import { useParams } from 'react-router-dom';
import StockPageData from '../components/StockPageData';

export default function StockPage() {
    let { id } = useParams();
  return (
    <div>
                  <StockPageData key={id} ticker={id} />
   
      
    </div>
  )
}
