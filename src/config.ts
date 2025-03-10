import type { OldConfig, ConfigOverrides } from './types';
import { extractGoogleDriveFolderId, getFolderVideosUrls } from './lib/google-drive-video';
import { shuffleArray } from './lib/utils/shuffle-array';
import { getFileList } from "./lib/fully-kiosk";

const selfUrl = import.meta.url;
const devMode = import.meta.env.DEV;
const localStorgeItemName = 'gingim-booster-config';

/**
 * מביא את רשימת הסרטונים בהתאם להגדרות
 * @param config הגדרות המערכת
 * @returns מערך של כתובות URL לסרטונים
 */
async function getVideoUrls(config: OldConfig): Promise<string[]> {
    let videoUrls: string[] = [];

    async function getAndSetVideoFolderFromGdrive(folderId: string) {

        const googleDriveFolderId =
            extractGoogleDriveFolderId(folderId);

        const driveUrls = await getFolderVideosUrls(googleDriveFolderId);

        if (driveUrls.length > 0) {
            videoUrls = driveUrls;
        } else {
            throw new Error("אין סרטונים בתיקייה או שהקישור פגום!");
        }
    }

    if (config.videoSource === 'google-drive' && config.googleDriveFolderUrl) {
        try {
            const googleDriveFolderId =
                extractGoogleDriveFolderId(config.googleDriveFolderUrl);

            await getAndSetVideoFolderFromGdrive(googleDriveFolderId);

        } catch (error) {
            console.error('שגיאה בקבלת סרטונים מגוגל דרייב:', error);

            const googleDriveDefaultFolderId =
                extractGoogleDriveFolderId(import.meta.env.VITE_GOOGLE_DRIVE_DEFAULT_FOLDER);

            await getAndSetVideoFolderFromGdrive(googleDriveDefaultFolderId);

        }
    }

    if (config.videoSource === 'local') {

        if (window.fully) {
            const fileList = getFileList();
            if (fileList) videoUrls = fileList;

        } else {

            const baseUrl = (new URL(selfUrl).origin).toString();
            const localVideo = new URL('videos/video.webm', baseUrl).toString(),
                BigBuckBunny = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

            videoUrls.push(
                devMode ? localVideo : BigBuckBunny
            );
        }
    }

    return shuffleArray(videoUrls);
}

/**
 * מביא את ההגדרות מה-Local Storage
 * @returns הגדרות מה-Local Storage או undefined אם אין הגדרות או שהן לא תקינות
 */
function getConfigFromLocalStorage(): OldConfig | undefined {
    try {
        const storedConfig = localStorage.getItem(localStorgeItemName);
        if (!storedConfig) return undefined;

        const parsedConfig = JSON.parse(storedConfig);
        if (typeof parsedConfig !== 'object' || parsedConfig === null) return undefined;

        return parsedConfig;
    } catch (error) {
        console.error('שגיאה בקריאת ההגדרות מה-Local Storage:', error);
        return undefined;
    }
}

/**
 * שומר את ההגדרות ב-Local Storage
 * @param config ההגדרות לשמירה
 */
export function saveConfigToLocalStorage(config: OldConfig): boolean {
    try {
        localStorage.setItem(localStorgeItemName, JSON.stringify(config));
        return true;
    } catch (error) {
        console.error('שגיאה בשמירת ההגדרות ל-Local Storage:', error);
        return false;
    }
}

export async function getConfigs(configOverrides: ConfigOverrides = {}) {

    const defaultConfig: OldConfig = {
        videoDisplayTimeInMS: 20 * 1000,
        videoUrls: [],
        type: 'video/mp4',
        mode: 'video',
        videoSource: 'local',
        googleDriveFolderUrl: undefined,
        hideVideoProgress: false,
        turnsPerVideo: 1,
        appName: 'com.edujoy.fidget.pop.it',

        systemConfig: {
            enableHideModalButton: true,
            disableGameCodeInjection: false
        }
    };

    let config = {
        ...defaultConfig
    };

    const savedConfig = getConfigFromLocalStorage();

    if (savedConfig) {
        config = {
            ...config,
            ...savedConfig
        }
    }

    if (typeof window !== 'undefined' && window.config && typeof window.config === 'object') {
        config = {
            ...config,
            ...window.config
        }
    }

    if (configOverrides) {
        config = {
            ...config,
            ...configOverrides as Partial<OldConfig>
        }
    }

    if (config.mode === 'video') {

        try {
            config.videoUrls = await getVideoUrls(config);
        } catch (error) {
            console.error('שגיאה בקבלת כתובות הסרטונים:', error);
        }
    }

    return {
        defaultConfig,
        config
    }
}
