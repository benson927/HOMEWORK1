import { Composition, registerRoot } from "remotion";
import { MarketSummary } from "./MarketSummary";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MarketSummary"
        component={MarketSummary}
        durationInFrames={450} // 30fps * 15 seconds = 450 frames
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

// 這是 Remotion 必備的註冊函數，它會告訴系統哪個大元件是影片的起點
registerRoot(RemotionRoot);
