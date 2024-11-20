import { useRef } from 'react';
import {
  StyleSheet,
  Platform,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Video, {
  ResizeMode,
  type VideoRef,
  type EnumValues,
} from 'react-native-video';
import { VLCPlayer } from 'react-native-vlc-media-player';
import PlayerMode from '../types/PlayerMode';

export interface VideoPlayerRef {
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
  onEnd?: () => void;
  onError?: (event: { error: string | undefined }) => void;
}

const VideoPlayer = ({
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
  onError,
  onEnd,
}: VideoPlayerProps) => {
  const videoRef = useRef<VideoRef>(null);
  const reactNativeVideoHasError = useRef(false);
  const supportedVideoFormats: Record<typeof Platform.OS, string[]> = {
    ios: ['mp4', 'mp3', 'm3u8'],
    android: ['mp4', 'mp3', 'm3u8'],
    windows: [], // unsupported
    macos: [], // unsupported
    web: [], // unsupported
  };

  const isSupportedFormat = () => {
    const lowerCasedUri = uri.toLowerCase();
    const platform = Platform.OS;
    const formats = supportedVideoFormats[platform];
    return formats.some((format) => lowerCasedUri.endsWith(`.${format}`));
  };

  const shouldUseReactNativeVideoPlayer = () => {
    switch (mode) {
      case PlayerMode.AUTO:
        return isSupportedFormat() && !reactNativeVideoHasError.current;
      case PlayerMode.VLC:
        return false;
      case PlayerMode.REACT_NATIVE_VIDEO:
        return true;
    }
  };

  return (
    <>
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
          onEnd={onEnd}
          onError={(event) => {
            switch (mode) {
              case PlayerMode.AUTO:
                reactNativeVideoHasError.current = true;
                break;
              case PlayerMode.REACT_NATIVE_VIDEO:
                onError?.({ error: event.error.errorString });
                break;
              case PlayerMode.VLC:
                break;
            }
          }}
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
          onEnd={onEnd}
          onError={() => {
            onError?.({ error: undefined });
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default VideoPlayer;
