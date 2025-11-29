import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const PROD_UNIT_ID = 'ca-app-pub-6368412009992703/7347184157';
const DEV_UNIT_ID = TestIds.BANNER;
const UNIT_ID = __DEV__ ? DEV_UNIT_ID : PROD_UNIT_ID;

export function AdBanner({ style }: { style?: ViewStyle }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const initOnce = useRef(false);

  useEffect(() => {
    if (!initOnce.current) {
      initOnce.current = true;
      mobileAds()
        .initialize()
        .catch(() => {});
    }
  }, []);

  return (
    <View style={[{ alignItems: 'center', paddingBottom: 4 }, style]}> 
      <BannerAd
        unitId={UNIT_ID}
        size={BannerAdSize.BANNER}
        onAdLoaded={() => {
          setLoaded(true);
          setFailed(null);
        }}
        onAdFailedToLoad={(e) => {
          setFailed(e?.message ?? 'failed');
        }}
      />
      {!loaded && __DEV__ && (
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Loading ad… {failed ? `(error: ${failed})` : ''}</Text>
      )}
    </View>
  );
}
