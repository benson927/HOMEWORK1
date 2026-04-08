import { Config } from '@remotion/cli/config';

// 針對我們 1920x1080 靜態影像轉出優化
Config.setVideoImageFormat('jpeg');

// 可以自訂要輸出的路徑與其他設定
Config.setOutputLocation('out/video.mp4');
