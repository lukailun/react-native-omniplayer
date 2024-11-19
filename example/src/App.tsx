import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { VideoPlayer } from 'react-native-omniplayer';

export default function App() {
  const sampleVideoUrl =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  return (
    <View style={styles.container}>
      <VideoPlayer
        resizeMode="contain"
        source={{ uri: sampleVideoUrl }}
        repeat
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
