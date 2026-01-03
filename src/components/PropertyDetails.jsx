import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function PropertyDetails({ property, onBack, onAddFavourite }) {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <h3>Description</h3>
          <p>{property.longDescription}</p>
        </TabPanel>
        
        <TabPanel>
          <h3>Floor Plan</h3>
          <img src="https://via.placeholder.com/600x400" alt="Floor plan" />
        </TabPanel>
        
        <TabPanel>
          <h3>Map</h3>
          <iframe
            width="100%"
            height="400"
            src={`https://maps.google.com/maps?q=${property.location}&output=embed`}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}