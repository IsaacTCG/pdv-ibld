import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const fallback = 'com.ibld.app';
  const ANDROID_PACKAGE = config.android?.package ?? fallback;
  const IOS_BUNDLE_IDENTIFIER = config.ios?.bundleIdentifier ?? fallback;

  return {
    ...config,
    name: config.name ?? 'Isabelle Barreto Lash Designer',
    slug: config.slug ?? 'isabelle-barreto-lash-designer',
    android: { ...config.android, package: ANDROID_PACKAGE },
    ios: { ...config.ios, bundleIdentifier: IOS_BUNDLE_IDENTIFIER },
    extra: {
      ...config.extra,
      APP_ENV: process.env.APP_ENV,
    },
  };
};
