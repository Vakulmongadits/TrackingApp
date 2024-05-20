import React, { useEffect } from "react";
import { SafeAreaView, Switch, Text, } from 'react-native';

import BackgroundGeolocation, { 
} from "react-native-background-geolocation";


const App = () => {

  const [enabled, setEnabled] = React.useState(false);
  const [location, setLocation] = React.useState('');

  useEffect(() => {

    const onLocation = BackgroundGeolocation.onLocation((location) => {
      console.log('[onLocation]', location);
      setLocation(JSON.stringify(location, null, 2));
    })

    const onMotionChange = BackgroundGeolocation.onMotionChange((event) => {
      console.log('[onMotionChange]', event);
    });

    const onActivityChange = BackgroundGeolocation.onActivityChange((event) => {
      console.log('[onActivityChange]', event);
    })

    const onProviderChange = BackgroundGeolocation.onProviderChange((event) => {
      console.log('[onProviderChange]', event);
    })

    useEffect(() => {
      if (enabled) {
        BackgroundGeolocation.start();
      } else {
        BackgroundGeolocation.stop();
        setLocation('');
      }
    }, [enabled]);

    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 50
    }).then(state => {
      console.log('- BackgroundGeolocation is ready: ', state);
    }).catch(error => {
      console.warn('- BackgroundGeolocation error: ', error);
    });

    return () => {
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>TrackingApp</Text>
      <Switch value={enabled} onValueChange={setEnabled} />
      <Text style={{ color: 'black',fontSize:16 }}>{JSON.stringify(location)}</Text>
    </SafeAreaView>
  )
}

export default App;