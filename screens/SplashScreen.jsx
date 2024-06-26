import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import splashbg from "../assets/splashbg.png";
import colors from "../colors";
import Button from "../components/Button";
const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={splashbg}
        resizeMode="cover"
        style={styles.imageBg}
      >
        {/* <Image
          source={require("../assets/topSplash.png")}
          style={styles.topSplash}
        /> */}
        <Image source={require("../assets/umrah.png")} style={styles.umrah} />
        <View style={styles.mainContainer}>
          <Image
            source={require("../assets/brand.png")}
            style={styles.brandMangrove}
          />
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoMangrove}
          />
          <Button isLarge={true} onClick={() => navigation.navigate("home")}>
            Tap Here to Continue
          </Button>
        </View>
        {/* <Image
          source={require("../assets/bottomSplash.png")}
          style={styles.bottomSplash}
        /> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  topSplash: {
    flex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: 200,
    zIndex: 2,
  },
  bottomSplash: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 200,
    zIndex: 2,
  },
  brandMangrove: {
    resizeMode: "cover",
  },
  logoMangrove: {
    marginTop: 0,
    marginBottom: 150,
    width: 200,
    height: 200,
  },
  umrah: {
    position: "absolute",
    zIndex: 3,
    top: 35,
    right: 10,
    // backgroundColor : 'red',
    width: 60, // Adjust the size as needed
    height: 60, // Adjust the size as needed
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 50,
    textAlign: "center", // Align text to center
  },
  btn: {
    marginTop: 50,
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 20,
    alignItems: "center", // Center text inside the button
  },
  btnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "800",
  },
});

export default SplashScreen;
