import { StyleSheet, View } from 'react-native';
import { VideoPlayer, ResizeMode } from 'react-native-omniplayer';

export default function App() {
  const mp4VideoUri =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  return (
    <View style={styles.container}>
      <VideoPlayer
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        uri={mp4VideoUri}
        onLoad={(event) => console.log('onLoad: ', event)}
        onProgress={(event) => console.log('onProgress: ', event)}
        onBuffer={(event) => console.log('onBuffer: ', event)}
        onEnd={() => console.log('onEnd')}
        onError={(event) => console.log('onError: ', event)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    height: '50%',
  },
});
