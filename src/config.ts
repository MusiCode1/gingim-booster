import type { Config } from './types';
import { getVideoUrl, videoList } from './lib/google-drive-video';
import { getFileList } from "./lib/fully-kiosk";

const selfUrl = import.meta.url;
const devMode = import.meta.env.DEV;

console.log(import.meta.env);


let videoUrls: string[] = []
let type = 'video/mp4';

// הפיכת רשימת הסרטונים למערך של כתובות URL
const googleDriveVideos = videoList.map(video => getVideoUrl(video.fileId));
if(googleDriveVideos) videoUrls = googleDriveVideos;

const localVideo = new URL('videos/video.webm', new URL(selfUrl).origin).toString(),
    BigBuckBunny = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

videoUrls.push(
    devMode ? localVideo : BigBuckBunny
);

if (window.fully) {
    const fileList = getFileList();
    if (fileList) videoUrls = fileList;
}

export const defaultConfig: Config = {
    videoDisplayTimeInMS: 20 * 1000,
    videoUrls,
    type,
    mode: 'video'
};

export const config: Config = {
    ...defaultConfig,
    ...(typeof window !== 'undefined' && window.config ? window.config : {})
};
