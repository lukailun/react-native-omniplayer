import { forwardRef, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Video, {
  ResizeMode,
  type VideoRef,
  type EnumValues,
  type ReactVideoSource,
} from 'react-native-video';
import { VLCPlayer } from 'react-native-vlc-media-player';

export interface VideoPlayerRef {
  setUrl?: (url: string) => void;
  videoOnSeek?: () => void;
  videoOnSlidingComplete?: (value: number) => void;
  play?: () => void;
  pause?: () => void;
}

export const { width, height, scale, fontScale } = Dimensions.get('window');
const VIDEO_DEFAULT_HEIGHT = width * (9 / 16);

export interface VideoPlayerProps {
  // mode: GlobalPlayerMode
  source?: ReactVideoSource;
  resizeMode?: EnumValues<ResizeMode>;
  style?: StyleProp<ViewStyle>;
  controls?: boolean;
  muted?: boolean;
  paused?: boolean;
  playInBackground?: boolean;
  rate?: number;
  repeat?: boolean;
  volume?: number;
  onLoad?: (duration: number) => void;
  onProgress?: (info: {
    currentTime: number;
    position: number;
    remainingTime: number;
    ended: boolean;
  }) => void;
  onTogglePlayStatus?: (isPlaying: boolean) => void;
  onToggleShowsMask?: (showsMask: boolean) => void;
  onToggleSubtitles?: (showsSubtitles: boolean) => void;
  onClose?: () => void;
  onPictureInPicture?: () => void;
  onDetails?: () => void;
  onFullscreen?: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  (
    {
      source,
      style,
      controls,
      muted,
      paused,
      playInBackground,
      rate,
      repeat,
      resizeMode,
      volume,
    },
    ref
  ) => {
    const videoRef = useRef<VideoRef>(null);

    return (
      <>
        {/* <Video
          source={source}
          style={[styles.container, style]}
          controls={controls}
          muted={muted}
          paused={paused}
          playInBackground={playInBackground}
          rate={rate}
          repeat={repeat}
          resizeMode={resizeMode}
          volume={volume}
          ref={videoRef}
          // onLoad={() => {
          //   console.log('onLoad');
          //   videoRef.current?.play();
          // }}
          onError={(error: any) => {
            console.log('onError: ', error);
          }}
        /> */}
        <VLCPlayer
          source={source}
          style={[styles.container, style]}
          paused={paused}
          rate={rate}
          repeat={repeat}
          // controls={controls}
        />
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default VideoPlayer;
