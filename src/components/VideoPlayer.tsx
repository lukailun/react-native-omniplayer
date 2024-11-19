import { forwardRef, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Video, { type ResizeMode, type VideoRef } from 'react-native-video';

export interface VideoPlayerRef {
  setUrl?: (url: string) => void;
  videoOnSeek?: () => void;
  videoOnSlidingComplete?: (value: number) => void;
  play?: () => void;
  pause?: () => void;
}

export interface VideoPlayerProps {
  // mode: GlobalPlayerMode
  style?: StyleProp<ViewStyle>;
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
  (props, ref) => {
    const videoRef = useRef<VideoRef>(null);
    const sampleVideoUrl =
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    return (
      <Video
        source={{ uri: sampleVideoUrl }}
        ref={videoRef}
        style={styles.backgroundVideo}
      />
    );
  }
);

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoPlayer;
