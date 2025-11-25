- To create React Native with Expo

```js
npx create-expo-app --template
blank
cd app name
npm run ios
// to start the development server
npx expo start
```

<!--React Native Vector Icons  -->

```js
npm install react-native-vector-icons
```

<!-- Navigation & Safe Area View  -->

```js
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

<!-- Camera & Pictures access-->

```js
npx expo install expo-image-picker
npm install --save expo-image-picker

```

<!-- Navigation tabs  -->

    -> Native Stack

```js
npm install @react-navigation/native-stack
```

    -> Stack

```js
npm install @react-navigation/stack
// if expo managed - run this in project directory
npx expo install react-native-gesture-handler
// Optionally - install if u want to use UIKit animations for a header - expo managed project
npx expo install @react-native-masked-view/masked-view
// if on Mac or for IOS development - install pods to complete the linking
npx pod-install ios
```

    -> Bottoms Tab

```js
npm install @react-navigation/bottom-tabs
```

    -> Drawer

```js
npm install @react-navigation/drawer
// if expo managed - run this in project directory
npx expo install react-native-gesture-handler react-native-reanimated
// if on Mac or for IOS development - install pods to complete the linking
npx pod-install ios
```

    -> Material Top Tabs

```js
npm install @react-navigation/material-top-tabs
// if expo managed - run this in project directory
npx expo install react-native-pager-view
// if on Mac or for IOS development - install pods to complete the linking
npx pod-install ios
```

    -> Create ios folder  -> for project initialized with expo

```js
npx expo prebuild
```

<!-- Navigation Tabs end  -->
