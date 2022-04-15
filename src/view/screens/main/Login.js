import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { globalstyles } from "../../../styles/globalstyles";
import { theme } from "../../../styles/themes";
import { useGlobalContext } from "../../../context/AppContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState({ status: false, message: "" });
  const [errorPassword, setErrorPassword] = useState({
    status: false,
    message: "",
  });
  const { getLogin } = useGlobalContext();
  const emailValidation = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === true) {
      return true;
    } else return false;
  };

  const submitEmail = (email) => {
    Keyboard.dismiss();
    if (!email) {
      return setErrorEmail({
        status: true,
        message: "email is required",
      });
    } else {
      const validate = emailValidation(email);
      if (validate) {
        setErrorEmail({
          status: false,
          message: "",
        });
        return setEmail(email);
      } else {
        return setErrorEmail({
          status: true,
          message: "wrong email format",
        });
      }
    }
  };
  const handleLogin = () => {
    setErrorEmail({ status: false, message: "" });
    setErrorPassword({ status: false, message: "" });
    submitEmail(email);
    if (!password)
      return setErrorPassword({
        status: true,
        message: "password is required",
      });
    if (email && password) {
      setLoading(true);
      setUserData({ email, password });
    }
  };

  useEffect(() => {
    setEmail(null);
    setPassword(null);
    if (userData) {
      axios({
        method: "POST",
        url: "https://sudahnonton.000webhostapp.com/api/login",
        data: {
          email: userData.email,
          password: userData.password,
        },
      })
        .then((res) => {
          getLogin(res.data.access_token);
          setLoading(false);
          navigation.navigate("Bottom");
          Alert.alert("Alert", "Login is Sucessful, Welcome Riza!", [
            { text: "OK" },
          ]);
        })
        .catch((err) => {
          if (err.response.status) {
            setLoading(false);
            Alert.alert("Alert", "Login Failed,\nWrong email/password", [
              { text: "OK" },
            ]);
          }
        });
    }
  }, [userData]);
  if (loading) {
    return (
      <View style={styles.container}>
        <View>
          <ActivityIndicator
            animating={true}
            size="large"
            color={theme.colors.primary}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollview}>
          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior="position"
          >
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../../assets/logo.png")}
                style={styles.image}
              />
            </View>
            <View>
              <TextInput
                label="Email"
                placeholder="Email"
                value={email}
                placeholderTextColor={theme.colors.backgroundopacitydark}
                accessibilityIgnoresInvertColors
                clearButtonMode="while-editing"
                email
                blurOnSubmit={false}
                onChangeText={(email) => {
                  setEmail(email ? email : null);
                }}
                underlineColor={
                  errorEmail.status ? theme.colors.accent : theme.colors.primary
                }
                onSubmitEditing={() => submitEmail(email)}
                autoCapitalize="none"
                left={
                  <TextInput.Icon
                    color={theme.colors.primary}
                    size={24}
                    name="email"
                    style={{ justifyContent: "flex-end" }}
                  />
                }
                style={styles.textinput}
              />
              <Text style={styles.errorText}>{errorEmail.message}</Text>
              <TextInput
                label="Password"
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                placeholderTextColor={theme.colors.backgroundopacitydark}
                accessibilityIgnoresInvertColors
                underlineColor={
                  errorPassword.status
                    ? theme.colors.accent
                    : theme.colors.primary
                }
                clearTextOnFocus={true}
                clearButtonMode="while-editing"
                blurOnSubmit={false}
                autoCapitalize="none"
                onChangeText={(password) =>
                  setPassword(password ? password : null)
                }
                dark
                onSubmitEditing={() => {
                  setErrorPassword({ status: false, message: "" });
                  Keyboard.dismiss();
                  if (!password)
                    return setErrorPassword({
                      status: true,
                      message: "password is required",
                    });
                  else {
                    setPassword(password);
                  }
                }}
                left={
                  <TextInput.Icon
                    color={theme.colors.primary}
                    size={24}
                    name="lock"
                    style={{ justifyContent: "flex-end" }}
                  />
                }
                style={styles.textinput}
              />
              <Text style={styles.errorText}>{errorPassword.message}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleLogin();
                  Keyboard.dismiss();
                }}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <Text style={[globalstyles.smallText, { textAlign: "center" }]}>
                Only SudahNonton admins are allowed to login
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.backgroundopacitydark,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  scrollview: {
    width: "100%",
    marginTop: 80,
    padding: 20,
  },
  formContainer: {
    width: "100%",
    padding: 15,
    height: 500,
    backgroundColor: theme.colors.background,
    // paddingTop: 50,
    // alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 5,
    paddingBottom: 60,
    elevation: 2,
  },

  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 5,
    zIndex: 3,
    backgroundColor: theme.colors.backgroundopacitymid,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 5,
  },
  textinput: {
    elevation: -2,
    width: "100%",
    height: 80,
    marginBottom: 10,
    backgroundColor: theme.colors.primaryOpacity,
    color: "blue",
  },
  button: {
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors.background,
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.accent,
    marginBottom: 10,
  },
});
