import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  Text,
  TurboModuleRegistry,
} from 'react-native';
import QRGenerator from './src/QRGenerator';

const {width} = Dimensions.get('window');
const App = () => {
  const viewDataBase64 = (e: string) => {
    console.log('e', e);
  };
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        marginTop: 100,
      }}>
      <View style={{}}>
        <QRGenerator
          width={width}
          height={width}
          type={'svg'}
          value="0000001xxx2345123xasxasxxxx87564"
          dotOptions={{
            type: 'classy-rounded',
            color: 'green',
            gradient: {
              type: 'linear',
              rotation: 100,
              colorStops: [
                {offset: 0, color: '#845EC2'},
                {offset: 0.8, color: '#0081CF'},
                {offset: 1, color: '#008F7A'},
              ],
            },
          }}
          cornerDotOptions={{
            type: 'dots',
            gradient: {
              type: 'linear',
              rotation: 100,
              colorStops: [
                {offset: 0, color: '#845EC2'},
                {offset: 0.8, color: '#0081CF'},
                {offset: 1, color: '#008F7A'},
              ],
            },
          }}
          cornerSquareOptions={{
            type: 'extra-rounded',
            gradient: {
              type: 'linear',
              rotation: 100,
              colorStops: [
                {offset: 0, color: '#845EC2'},
                {offset: 0.8, color: '#0081CF'},
                {offset: 1, color: '#008F7A'},
              ],
            },
          }}
          backgroundOptions={{
            color: 'transparent',
          }}
          getBase64DataImage={viewDataBase64}
          image={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1025px-Instagram-Icon.png'
          }
          imageOptions={{hideBackgroundDots: false, imageSize: 0.5, margin: 0}}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
