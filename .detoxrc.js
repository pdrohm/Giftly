/** @type {Detox.DetoxConfig} */
module.exports = {
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/Giftly.app',
      build: 'xcodebuild -workspace ios/Giftly.xcworkspace -scheme Giftly -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/Giftly.app',
      build: 'xcodebuild -workspace ios/Giftly.xcworkspace -scheme Giftly -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release',
    },
  },
  devices: {
    'ios.simulator': {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15',
      },
    },
    'android.emulator': {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_4_API_30',
      },
    },
  },
  configurations: {
    'ios.debug': {
      device: 'ios.simulator',
      app: 'ios.debug',
    },
    'ios.release': {
      device: 'ios.simulator',
      app: 'ios.release',
    },
    'android.debug': {
      device: 'android.emulator',
      app: 'android.debug',
    },
    'android.release': {
      device: 'android.emulator',
      app: 'android.release',
    },
  },
}; 