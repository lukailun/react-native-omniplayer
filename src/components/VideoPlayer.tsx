import { forwardRef, useRef } from 'react';
import { StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import Video, {
  ResizeMode,
  type VideoRef,
  type EnumValues,
} from 'react-native-video';
import { VLCPlayer } from 'react-native-vlc-media-player';
import PlayerMode from '../types/PlayerMode';

export interface VideoPlayerRef {
  setUrl?: (url: string) => void;
  videoOnSeek?: () => void;
  videoOnSlidingComplete?: (value: number) => void;
  play?: () => void;
  pause?: () => void;
}

export interface VideoPlayerProps {
  mode?: PlayerMode;
  uri: string;
  resizeMode?: EnumValues<ResizeMode>;
  style?: StyleProp<ViewStyle>;
  controls?: boolean;
  muted?: boolean;
  paused?: boolean;
  playInBackground?: boolean;
  rate?: number;
  repeat?: boolean;
  volume?: number;
  onLoad?: (event: { duration: number }) => void;
  onProgress?: (event: {
    duration: number;
    currentTime: number;
    position: number;
    remainingTime: number;
  }) => void;
  onBuffer?: (event: { isBuffering: boolean }) => void;
  onTogglePlayStatus?: (isPlaying: boolean) => void;
  onToggleShowsMask?: (showsMask: boolean) => void;
  onToggleSubtitles?: (showsSubtitles: boolean) => void;
  onClose?: () => void;
  onPictureInPicture?: () => void;
  onDetails?: () => void;
  onFullscreen?: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({
    mode = PlayerMode.AUTO,
    uri,
    style,
    controls,
    muted,
    paused,
    playInBackground,
    rate,
    repeat,
    resizeMode,
    volume,
    onLoad,
    onProgress,
    onBuffer,
  }) => {
    const videoRef = useRef<VideoRef>(null);

    const isMp3OrMp4 = () => {
      const lowerCasedUri = uri.toLowerCase();
      return lowerCasedUri.endsWith('.mp3') || lowerCasedUri.endsWith('.mp4');
    };

    const shouldUseReactNativeVideoPlayer = () => {
      switch (mode) {
        case PlayerMode.AUTO:
          return isMp3OrMp4();
        case PlayerMode.VLC:
          return false;
        case PlayerMode.REACT_NATIVE_VIDEO:
          return true;
      }
    };

    return (
      <>
        <Text>
          {shouldUseReactNativeVideoPlayer() ? 'ReactNativeVideo' : 'VLCPlayer'}
        </Text>
        {shouldUseReactNativeVideoPlayer() && (
          <Video
            source={{ uri }}
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
            onLoad={(event) => onLoad?.({ duration: event.duration })}
            onProgress={(event) =>
              onProgress?.({
                duration: event.seekableDuration,
                currentTime: event.currentTime,
                position:
                  event.seekableDuration > 0
                    ? event.currentTime / event.seekableDuration
                    : 0,
                remainingTime: event.seekableDuration - event.currentTime,
              })
            }
            onBuffer={(event) => {
              onBuffer?.({ isBuffering: event.isBuffering });
            }}
            // onError={(error) => {
            //   console.log(`Video onError: ${JSON.stringify(error)}`);
            // }}
          />
        )}
        {!shouldUseReactNativeVideoPlayer() && (
          <VLCPlayer
            source={{ uri }}
            style={[styles.container, style]}
            muted={muted}
            paused={paused}
            rate={rate}
            repeat={repeat}
            volume={volume}
            onLoad={(event) => onLoad?.({ duration: event.duration / 1000 })}
            onProgress={(event) =>
              onProgress?.({
                duration: event.duration / 1000,
                currentTime: event.currentTime / 1000,
                position: event.position,
                remainingTime: (event.duration - event.currentTime) / 1000,
              })
            }
            onBuffering={(event) => {
              console.log(JSON.stringify(event));
            }}

            // onError={(props) => {
            //   console.log(`VLCPlayer onError: ${props.target}`);
            // }}
          />
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
  },
});

export default VideoPlayer;
