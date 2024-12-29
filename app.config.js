import * as dotenv from 'dotenv';

dotenv.config();

module.exports = {
  "expo": {
    "name": "ignite-fleet",
    "slug": "ignite-fleet",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#202024",
      "enableFullScreenImage_legacy": true
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.cristianofeitosa.ignitefleet",
      "infoPlist": {
      "CFBundleURLTypes": [
        {
          "CFBundleURLSchemes": ["com.googleusercontent.apps.1024345003584-euvlgooh4qn7hfgb07mk2btro64sb6i9"]
        }
      ]
    }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#202024"
      },
      "package": "com.cristianofeitosa.ignitefleet"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-font",
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "com.googleusercontent.apps.1024345003584-euvlgooh4qn7hfgb07mk2btro64sb6i9"
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ]
  }
}
