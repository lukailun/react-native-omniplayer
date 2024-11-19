import { StyleSheet, View } from 'react-native';
import { VideoPlayer, PlayerMode, ResizeMode } from 'react-native-omniplayer';

export default function App() {
  const sampleVideoUri =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  return (
    <View style={styles.container}>
      <VideoPlayer
        mode={PlayerMode.VLC}
        resizeMode={ResizeMode.CONTAIN}
        uri={sampleVideoUri}
        onLoad={(event) => {
          console.log('onLoad: ', event);
        }}
        // onProgress={(event) => {
        //   console.log('onProgress: ', event);
        // }}
        onBuffer={(event) => {
          console.log('onBuffer: ', event);
        }}
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
});
