import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import splashbg from "../assets/splashbg.png";
import colors from "../colors";
import { klasifikasiGambar } from "../api/services/mangrove";

const KlasifikasiFileScreen = () => {
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [result, setResult] = useState("");

  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // This allows any type of file to be selected
        copyToCacheDirectory: true,
      });

      if (result.type === "cancel") {
        console.log("File selection canceled");
        return;
      }

      console.log("Document Picker Result:", result);

      const { mimeType, uri } = result.assets[0];

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/JPG",
        "image/PNG",
        "image/JPEG",
      ];

      if (!allowedTypes.includes(mimeType)) {
        Alert.alert(
          "File Tidak Disupport",
          "Harap pilih file dengan extensi jpg, jpeg, atau png."
        );
        return;
      }

      setFile(result.assets[0]);
      handleUploadFile(result.assets[0]);
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleUploadFile = async (selectedFile) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(selectedFile.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await klasifikasiGambar(base64);
      setData(response.data_tanaman);
      setResult("Mangrove Jenis Avicennia alba");
    } catch (error) {
      console.log("Upload error", error);
    }
  };

  return (
    <>
      {!file && (
        <ImageBackground
          resizeMode="cover"
          source={splashbg}
          style={styles.container}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("home")}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
            <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.chooseBtn]}
            onPress={handleChooseFile}
          >
            <Text style={styles.btnText}>Pilih File</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
      {file && (
        <SafeAreaView style={styles.containerKlasifikasi}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("home")}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
            <Text style={styles.backButtonText}>Kembali Ke Menu Utama</Text>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 16 }}>
            <Image source={{ uri: file.uri }} style={styles.image} />
          </View>
          {data && (
            <ScrollView>
              <View style={styles.groupInfo}>
                <Text style={styles.infoTitle}>Hasil Klasifikasi :</Text>
                <Text style={styles.infoDesc}>{data.nama}</Text>
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.infoTitle}>Deskripsi :</Text>
                <Text style={styles.infoDesc}>{data.dekripsi}</Text>
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.infoTitle}>Ekologi :</Text>
                <Text style={styles.infoDesc}>{data.ekologi}</Text>
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.infoTitle}>Manfaat :</Text>
                <Text style={styles.infoDesc}>{data.manfaat}</Text>
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.infoTitle}>Penyebaran :</Text>
                <Text style={styles.infoDesc}>{data.penyebaran}</Text>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    position: "absolute",
    top: 50,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "black",
    fontSize: 20,
  },
  groupInfo: {
    paddingHorizontal: 30,
    marginTop: 15,
    marginBottom: 10,
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 16,
    borderColor: "white",
    padding: 10,
    backgroundColor: "white",
    // Shadow properties
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      // Offset of the shadow
      width: 0, // Horizontal offset
      height: 2, // Vertical offset
    },
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Blur radius of the shadow
    elevation: 9,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "OpenSans_600Semibold",
  },
  infoDesc: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    fontWeight: "400",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  containerKlasifikasi: {
    flex: 1,
    backgroundColor: "white",
    color: "black",
  },
  image: {
    marginTop: 100,
    width: "100%",
    height: 400,
    marginBottom: 20,
    width: "100%",
    borderRadius: 30,
    height: 300,
    zIndex: 1,
    // Shadow properties
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      // Offset of the shadow
      width: 0, // Horizontal offset
      height: 4, // Vertical offset
    },
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 4.65, // Blur radius of the shadow
    elevation: 8,
  },
  backButton: {
    flexDirection: "row",
    position: "absolute",
    top: 50,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "black",
    fontSize: 20,
  },
  fileName: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },
  btn: {
    width: "70%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  chooseBtn: {
    backgroundColor: colors.greenDark,
  },
  uploadBtn: {
    backgroundColor: "#5C6BC0",
  },
  textPrediksi: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
  },
});

export default KlasifikasiFileScreen;
