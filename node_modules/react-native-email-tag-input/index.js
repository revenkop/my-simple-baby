/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";

export const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default function EmailTagInput({
  value = [],
  onChange,
  subComponent,
  placeholder,
  textInputStyle,
  emailTagsItemStyle,
  suggessionData,
  Avatar,
  CloseIcon,
}) {
  const [inputPosition, setInputPosition] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [removeEmailTagItem, setRemoveEmailTagItem] = React.useState(null);
  const [emailTags, setEmailTags] = React.useState(value);

  // const {state: contactsState} = React.useContext(ContactsContext);

  useEffect(() => {
    onChange(emailTags);
  }, [emailTags]);

  function validateEmail(emailAdress) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(emailAdress);
  }

  const emailFilter = () => {
    return suggessionData.filter((contact) => {
      return contact?.email?.toLowerCase()?.includes(email?.toLowerCase());
    });
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: 2,
            rowGap: 10,
            marginVertical: emailTags.length > 0 ? 12 : 0,
          }}
        >
          {emailTags.map((emailTag) => (
            <View
              style={[
                {
                  borderRadius: 50,
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  marginLeft: 4,
                  flex: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  backgroundColor:
                    removeEmailTagItem === emailTag
                      ? "#8392a5"
                      : validateEmail(emailTag)
                      ? "#0168fa"
                      : "#f22c3d",
                },
              ]}
            >
              <Text
                style={[
                  emailTagsItemStyle,
                  { color: "#FFF", fontWeight: "600" },
                ]}
              >
                {emailTag}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setEmailTags((_emailTags) =>
                    _emailTags.filter((item) => item !== emailTag)
                  );
                  setRemoveEmailTagItem(null);
                }}
                style={{ paddingLeft: 3 }}
              >
                <CloseIcon />
              </TouchableOpacity>
            </View>
          ))}

          <TextInput
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              setInputPosition(layout.y + layout.height);
            }}
            onChangeText={(text) => {
              setRemoveEmailTagItem(null);
              setEmail(text);
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                if (email.length === 0) {
                  if (removeEmailTagItem) {
                    setEmailTags((_emailTags) =>
                      _emailTags.filter((item) => item !== removeEmailTagItem)
                    );
                    setRemoveEmailTagItem(null);
                  } else {
                    setRemoveEmailTagItem(emailTags[emailTags.length - 1]);
                  }
                }
              }
            }}
            style={[
              textInputStyle,
              { flex: 1, minWidth: 50 },
              emailTags.length > 0 ? { padding: 0, marginLeft: 10 } : {},
            ]}
            placeholder={placeholder}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            inputMode="email"
            value={email}
          />
        </View>

        {email.length > 0 && (
          <View
            style={{
              width: "100%",
              height: HEIGHT - inputPosition,
            }}
          >
            <ScrollView>
              {emailFilter().length === 0 && (
                <TouchableOpacity
                  onPress={() => {
                    if (validateEmail(email)) {
                      setEmailTags([...emailTags, email]);
                      setEmail("");
                    } else {
                      Alert.alert(
                        "Geçersiz Alıcı",
                        "Lütfen geçerli bir e-posta adresi giriniz.",
                        [{ text: "Tamam", style: "cancel" }]
                      );
                    }
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: "#ccc",
                      padding: 8,
                      alignItems: "center",
                    }}
                  >
                    <Avatar email={email} />

                    <View style={{ marginLeft: 8 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          marginTop: 2,
                        }}
                      >
                        {email}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}

              {emailFilter().map((contact) => (
                <TouchableOpacity
                  onPress={() => {
                    setEmailTags([...emailTags, contact.email]);
                    setEmail("");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: "#ccc",
                      padding: 8,
                      alignItems: "center",
                    }}
                  >
                    <Avatar email={email} />

                    <View style={{ marginLeft: 8 }}>
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        {contact.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          marginTop: 2,
                        }}
                      >
                        {contact.email}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      {email.length === 0 && subComponent?.()}
    </>
  );
}
