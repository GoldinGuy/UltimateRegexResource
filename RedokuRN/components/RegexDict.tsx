import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
// import { ModalizeWebView } from "react-native-modalize-webview";
const Dictionary = () => {
    return (
    //       <ModalizeWebView
    //     ref={modalizeRef}
    //     handlePosition="inside"
    //     webViewProps={{
    //       source: {
    //         uri: 'https://facebook.github.io/react-native/',
    //       },
    //     }}
    //   />
			<View style={{ flex: 1 }}>
				<WebView
					source={{ uri: "https://github.com/GoldinGuy/UltimateRegexResource" }}
					style={{ height: "100%", width: "100%" }}
					startInLoadingState={true}
				/>
			</View>
		);
}
export default Dictionary