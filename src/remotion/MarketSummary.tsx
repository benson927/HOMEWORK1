import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence, Img, Audio } from 'remotion';

// 豐富的動態背景 (網格與漸層)
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const bgX = interpolate(frame, [0, 450], [0, -100]);
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#0a0a1a', 
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: bgX, right: -100, bottom: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '1000px', height: '1000px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(0,80,255,0.2) 0%, rgba(0,0,0,0) 70%)',
      }} />
    </AbsoluteFill>
  );
};

// 第一幕：開場標題
const IntroTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 10, fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: '#ffffff' }}>
      <p style={{
        fontSize: '30px', 
        letterSpacing: '10px', 
        color: '#4fc3f7',
        opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        textTransform: 'uppercase',
        fontFamily: 'sans-serif'
      }}>
        Your Daily Financial Insights
      </p>
      <h1 style={{
        fontSize: '150px',
        fontWeight: '900',
        transform: `scale(${titleSpring})`,
        margin: '20px 0',
        fontFamily: 'sans-serif',
        background: 'linear-gradient(to right, #ffffff, #88ccff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        The Ledger
      </h1>
      <h2 style={{
        fontSize: '40px',
        color: '#b6c4ff',
        opacity: subtitleOpacity,
        fontFamily: 'sans-serif',
      }}>
        市場報告 ─ {new Date().toLocaleDateString('zh-TW')}
      </h2>
    </AbsoluteFill>
  );
};

// 第二幕：投資組合總覽與動態圖表
const PortfolioOverview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const enterSpring = spring({ frame, fps, config: { damping: 14 } });
  
  // 動態增加的餘額數字
  const balance = interpolate(frame, [15, 60], [100000, 124590], { extrapolateRight: 'clamp' });
  const chartWidth = interpolate(frame, [30, 90], [0, 800], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{
        transform: `translateY(${100 - enterSpring * 100}px)`,
        opacity: enterSpring,
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <h3 style={{ fontSize: '40px', color: '#8db4f8', margin: 0 }}>總投資組合價值</h3>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '20px' }}>
          <span style={{ fontSize: '130px', fontWeight: 'bold' }}>
            ${Math.floor(balance).toLocaleString()}
          </span>
          <span style={{ fontSize: '50px', color: '#00e676', marginLeft: '30px' }}>
            +5.2% 🚀
          </span>
        </div>
        
        {/* 簡單的假動態折線圖 SVG */}
        <div style={{ marginTop: '60px', width: '800px', height: '200px', borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 200">
            <path 
              d="M 0 180 Q 100 150 200 160 T 400 100 T 600 50 T 800 20" 
              fill="none" 
              stroke="#00e676" 
              strokeWidth="8"
              strokeDasharray="1000"
              strokeDashoffset={1000 - (chartWidth / 800) * 1000}
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 第三幕：焦點個股多重數據看板
const TopMovers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stocks = [
    { ticker: 'NVDA', name: 'Nvidia Corp.', price: 924.12, diff: '+1.7%', up: true },
    { ticker: 'AAPL', name: 'Apple Inc.', price: 175.04, diff: '-0.5%', up: false },
    { ticker: 'TSLA', name: 'Tesla Inc.', price: 180.20, diff: '+2.1%', up: true },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '60px', color: '#4fc3f7', marginBottom: '50px' }}>🔥 今日熱門焦點</h2>
      <div style={{ display: 'flex', gap: '40px' }}>
        {stocks.map((stock, i) => {
          const cardSpring = spring({ frame: frame - i * 15, fps });
          return (
            <div key={stock.ticker} style={{
              width: '400px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '40px',
              transform: `scale(${cardSpring})`,
              opacity: cardSpring
            }}>
              <h3 style={{ fontSize: '60px', margin: 0, fontWeight: '900' }}>{stock.ticker}</h3>
              <p style={{ fontSize: '24px', color: '#aaa', margin: '5px 0 30px' }}>{stock.name}</p>
              <div style={{ fontSize: '50px', fontWeight: 'bold' }}>${stock.price}</div>
              <div style={{ fontSize: '30px', color: stock.up ? '#00e676' : '#ff5252', marginTop: '10px' }}>
                {stock.up ? '▲' : '▼'} {stock.diff}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 第四幕：結尾
const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: '#ffffff', fontFamily: 'sans-serif', opacity }}>
      <h1 style={{ fontSize: '100px', fontWeight: '900', marginBottom: '20px' }}>Take Control of Your Wealth</h1>
      <p style={{ fontSize: '40px', color: '#4fc3f7', marginBottom: '80px' }}>即刻登入 The Ledger 管理您的投資組合</p>
      
      {/* 搜尋框特效 */}
      <div style={{
        width: '600px', height: '80px', 
        backgroundColor: 'rgba(255,255,255,0.2)', 
        borderRadius: '40px',
        display: 'flex', alignItems: 'center', padding: '0 30px'
      }}>
        <div style={{ fontSize: '30px', fontWeight: 'bold' }}>https://the-ledger.app</div>
      </div>
    </AbsoluteFill>
  );
};

export const MarketSummary: React.FC = () => {
  // 將時長改為 15 秒 (450 frames)
  return (
    <AbsoluteFill>
      <Audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" volume={0.5} />
      <Background />
      
      {/* 0 - 3.5秒 */}
      <Sequence from={0} durationInFrames={105}>
        <IntroTitle />
      </Sequence>
      
      {/* 3.5 - 7秒 */}
      <Sequence from={105} durationInFrames={105}>
        <PortfolioOverview />
      </Sequence>

      {/* 7 - 11.5秒 */}
      <Sequence from={210} durationInFrames={135}>
        <TopMovers />
      </Sequence>
      
      {/* 11.5 - 15秒 */}
      <Sequence from={345} durationInFrames={105}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
