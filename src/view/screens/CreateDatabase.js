import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Caption, TextInput, Title, Text } from "react-native-paper";
import { globalstyles } from "../../styles/globalstyles";
import { theme } from "../../styles/themes";
import * as ImagePicker from "expo-image-picker";
import { windowHeight } from "../../context/initValues";
import { useGlobalContext } from "../../context/AppContext";

const CreateDatabase = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const { getUser } = useGlobalContext();

  const handleSubmit = () => {
    getUser(title, image);
    alert("Registration successful, start your movie database!");
    navigation.push("Welcome");
  };
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [200, 200],
      quality: 1,
    });
    setImage(pickerResult.uri);
  };

  return (
    <View style={globalstyles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <View style={styles.subcontainer}>
            <Image
              source={require("../../../assets/TitleLogo.png")}
              style={styles.logoImage}
            />
            <Title style={{ color: theme.colors.text }}>
              Create Your Very Own Database
            </Title>
            <TextInput
              mode="flat"
              underlineColor={theme.colors.primary}
              activeUnderlineColor={theme.colors.text}
              placeholder="Database Name"
              label="Database Name"
              style={styles.textInput}
              value={title || null}
              onChangeText={(val) => setTitle(val)}
            />

            {!image && (
              <Image
                source={require("../../../assets/user.png")}
                style={styles.resultImage}
              />
            )}
            {image && (
              <Image source={{ uri: image }} style={styles.resultImage} />
            )}
            <Text style={styles.subheading}>Add your database logo</Text>

            <TouchableOpacity
              onPress={openImagePickerAsync}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitbutton}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
          <Caption>
            This database data will be stored locally in your phone
          </Caption>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateDatabase;

const styles = StyleSheet.create({
  container: {
    height: windowHeight - 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  subcontainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginHorizontal: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  submitbutton: {
    width: 200,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  logoImage: {
    width: 200,
    height: 50,
    resizeMode: "contain",
  },
  resultImage: {
    borderRadius: 8,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  subheading: {
    textAlign: "center",
    color: theme.colors.text,
  },
  textInput: {
    width: "90%",
    backgroundColor: theme.colors.primaryOpacity,
    marginBottom: 10,
    color: theme.colors.text,
  },
});
