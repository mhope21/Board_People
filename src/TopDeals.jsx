import React, { useState, useEffect } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import {supabase} from './Client';

const TopDeals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data, error } = await supabase.from('topdeals').select('*').order('created_at', { ascending: false }).limit(2);
        if (error) {
          throw error;
        }
        setDeals(data);
        console.log(data.image)
      } catch (error) {
        console.error('Error fetching deals:', error.message);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="top-deals">
      <h2>Top Deals</h2>
      {deals.map((deal) => (
        <Card key={deal.id}>
          <Card.Body>
            <Card.Title>{deal.name}</Card.Title>
            {deal.image && (
            <div className="image-container" style={{maxWidth: '100%'}}>
            <img src={deal.image} alt={deal.name} className='img-fluid' /> 
            </div>
      )}
            <Card.Text>{deal.description}</Card.Text>
            <Card.Text>Price: ${deal.price}</Card.Text>
            <Card.Text>*Prices subject to change</Card.Text>
            {/* <Card.Text>Reasons for buying:</Card.Text>
            <ul>
              {deal.buy.map((criteria) => (
                <li key={criteria}>{criteria}</li>
              ))}
            </ul>
            <Card.Text>Reasons for not buying:</Card.Text>
            <ul>
              {deal.notBuy.map((criteria) => (
                <li key={criteria}>{criteria}</li>
              ))}
            </ul> */}
            { <Button variant="primary" href={deal.shop}>View Deal</Button>}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TopDeals;
