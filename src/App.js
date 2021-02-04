import React, { useEffect, useState } from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import SimpleSelect from './SimpleSelect';

function App() {
  const [dataCoriosity, setCoriosity] = useState([]);
  const [dataOportunity, setOpportunity] = useState([]);
  const [dataSpirit, setSpirit] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=DQNlQlc2PQmVH3ZMULq945tvpICd0TCDLLMdMrp4'
    )
      .then((response) => response.json())
      .then((coriosity) => {
        setCoriosity(coriosity.photo_manifest);
      })
      .catch((err) => console.log(err.message));

    fetch(
      'https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=DQNlQlc2PQmVH3ZMULq945tvpICd0TCDLLMdMrp4'
    )
      .then((response) => response.json())
      .then((opportunity) => {
        setOpportunity(opportunity.photo_manifest);
      })
      .catch((err) => console.log(err.message));

    fetch(
      'https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=DQNlQlc2PQmVH3ZMULq945tvpICd0TCDLLMdMrp4'
    )
      .then((response) => response.json())
      .then((spirit) => {
        setSpirit(spirit.photo_manifest);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Container maxWidth='md'>
      <h2>Do you want to know more about Mars?</h2>
      <SimpleSelect data={[dataCoriosity, dataOportunity, dataSpirit]} />
    </Container>
  );
}

export default App;
