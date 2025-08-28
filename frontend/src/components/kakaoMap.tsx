import Script from 'next/script';
import { useState, useEffect } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';


const KAKAO_KEY = "";
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`;



const KakaoMap = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        console.log("window.kakao", window.kakao);
    }, []);
    return (
    <div>
      <Script 
        src={KAKAO_SDK_URL} 
        strategy='afterInteractive'
        onLoad={() => {
            console.log("kakao SDK loaded");
            console.log("✅ window.kakao", (window as any).kakao);
            setLoaded(true);
        }}
      />

      {loaded && (
        <Map 
          center={{ lat: 37.497930, lng: 127.027596 }}
          style={{ width: '500px', height: '400px' }}
        >
          <MapMarker position={{ lat: 37.497930, lng: 127.027596 }} />
          <MapTypeControl />
          <ZoomControl />
        </Map>
      )}
    </div>
  );
};

export default KakaoMap;