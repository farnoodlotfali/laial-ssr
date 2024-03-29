import {
  MUTE_MUSIC,
  PLAY_MUSIC,
  PAUSE_MUSIC,
  UNMUTE_MUSIC,
  CHANGE_VOLUME,
  SET_PALYLIST,
  NEXT_MUSIC,
  PREVIOUS_MUSIC,
  SET_CURRENT_URL,
  SET_IDS,
  SET_PROGRESS,
  CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO,
  CHANGE_SHUFFLE,
  CHANGE_LOOP_STATE,
  FORCE_STOP,
  BAR_TO_ZERO,
  CHANGE_SEEK,
} from "./types";
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case PLAY_MUSIC:
      return {
        ...state,
        playing: true,
        loading: false,
      };
    case PAUSE_MUSIC:
      return {
        ...state,
        playing: false,
      };
    case FORCE_STOP:
      return {
        ...state,
        playing: false,
        loading: false,
        forceStop: true,
      };
    case MUTE_MUSIC:
      return {
        ...state,
        mute: true,
      };
    case UNMUTE_MUSIC:
      return {
        ...state,
        mute: false,
      };
    case CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };

    case SET_PALYLIST:
      return {
        ...state,
        playList: action.payload.playList,
        canDeleteSong: action.payload.canDeleteSong,
      };
    case CHANGE_SHUFFLE:
      return {
        ...state,
        shuffle: !state.shuffle,
      };

    case NEXT_MUSIC:
      return {
        ...state,
        currentUrl: action.payload,
      };
    case PREVIOUS_MUSIC:
      return {
        ...state,
        currentUrl: action.payload,
      };

    case SET_CURRENT_URL:
      return {
        ...state,
        currentUrl: action.payload,
        progressToZero: false,
      };
    case SET_PROGRESS:
      return {
        ...state,
        currentProgress: action.payload,
      };
    case BAR_TO_ZERO:
      return {
        ...state,
        progressToZero: true,
      };
    case CHANGE_SEEK:
      return {
        ...state,
        seek: action.payload,
      };

    case CHANGE_LOOP_STATE:
      return {
        ...state,
        loop: action.payload,
      };

    case CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO:
      return {
        ...state,
        showMusicBarOnMoblieRatio: !state.showMusicBarOnMoblieRatio,
      };
    case SET_IDS:
      return {
        ...state,
        playing: false,
        isThisSongAddedToRecentlyViewdPlaylist: false,
        loading: true,
        totalDuration: action.payload.totalDuration,
        telegramId: action.payload.telegramId,
        songId: action.payload.songId,
        songSinger: action.payload.songSinger,
        songName: action.payload.songName,
        songPhoto: action.payload.songPhoto,
        postId: action.payload.postId,
        songSlug: action.payload.songSlug,
        song_meta_description: action.payload.newDesc,
        song_meta_title: action.payload.newTitle,
        progressToZero: true,
      };

    default:
      return { ...state };
  }
};
