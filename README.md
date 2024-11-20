# react-native-omniplayer

A React Native universal video player that automatically switches between react-native-video and VLC player based on format compatibility.

## Installation

```sh
npm install react-native-omniplayer
```

## Usage


```tsx
import { VideoPlayer, ResizeMode } from 'react-native-omniplayer';

export default function App() {
  const mp4VideoUri =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  return (
    <VideoPlayer
      resizeMode={ResizeMode.CONTAIN}
      uri={mp4VideoUri}
      onLoad={(event) => console.log('onLoad: ', event)}
      onProgress={(event) => console.log('onProgress: ', event)}
      onBuffer={(event) => console.log('onBuffer: ', event)}
      onEnd={() => console.log('onEnd')}
      onError={(event) => console.log('onError: ', event)}
    />
  );
}
```

### Props

- `mode` (optional): PlayerMode - Choose video player mode ('auto', 'vlc', or 'react-native-video')
- `uri` (required): string - URL of the video to play
- `resizeMode` (optional): ResizeMode - How to resize the video ('none', 'contain', 'cover', 'stretch')
- `style` (optional): ViewStyle - Custom styles for the video container
- `controls` (optional): boolean - Show/hide player controls
- `muted` (optional): boolean - Mute/unmute video
- `paused` (optional): boolean - Pause/play video
- `playInBackground` (optional): boolean - Continue playing when app is in background (Only for react-native-video)
- `rate` (optional): number - Playback rate
- `repeat` (optional): boolean - Loop video playback
- `volume` (optional): number - Video volume (0.0 to 1.0)

### Events

- `onLoad`: Called when video is loaded with duration information
- `onProgress`: Called with playback progress information
- `onBuffer`: Called when video is buffering (Only for react-native-video)
- `onEnd`: Called when playback finishes
- `onError`: Called when an error occurs during playback

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
