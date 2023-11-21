import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Animated,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const translateX = new Animated.Value(-100);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: openNav ? 0 : -210,
      duration: 300, // Adjust the duration of the transition as needed
      useNativeDriver: false,
    }).start();
  }, [openNav]);

  const toggleNavigation = () => {
    setOpenNav(!openNav);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity>
              <ScreenHeaderBtn
                handlePress={toggleNavigation}
                iconUrl={icons.menu}
                dimension="60%"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "Jobbed",
        }}
      />

      {/* Sidebar Navigation */}
      <Animated.View
        style={[
          styles.navbarContainer,
          {
            transform: [{ translateX: translateX }],
          },
        ]}
      >
        <View style={styles.menuContent}>
          <TouchableHighlight
            onPress={() => {
              console.log("Navigate to Home");
              setActiveMenu("Home");
            }}
            underlayColor={COLORS.gray}
            style={styles.menuItem}
          >
            <Text
              style={{
                color: activeMenu === "Home" ? "#f5d7e3" : COLORS.lightWhite,
                fontSize: SIZES.medium,
              }}
            >
              Home
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              console.log("Navigate to Favorites");
              setActiveMenu("Favorites");
            }}
            underlayColor={COLORS.gray}
            style={styles.menuItem}
          >
            <Text
              style={{
                color:
                  activeMenu === "Favorites" ? "#f5d7e3" : COLORS.lightWhite,
                fontSize: SIZES.medium,
              }}
            >
              Favorites
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              console.log("Navigate to Settings");
              setActiveMenu("Settings");
            }}
            underlayColor={COLORS.gray}
            style={styles.menuItem}
          >
            <Text
              style={{
                color:
                  activeMenu === "Settings" ? "#f5d7e3" : COLORS.lightWhite,
                fontSize: SIZES.medium,
              }}
            >
              Settings
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              console.log("Toggle Mode");
              setActiveMenu("ToggleMode");
            }}
            underlayColor={COLORS.gray}
            style={styles.menuItem}
          >
            <Text
              style={{
                color:
                  activeMenu === "ToggleMode" ? "#f5d7e3" : COLORS.lightWhite,
                fontSize: SIZES.medium,
              }}
            >
              Toggle Mode
            </Text>
          </TouchableHighlight>
        </View>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          {/* <Popularjobs />
          <Nearbyjobs /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    backgroundColor: COLORS.secondary,
    width: "50%",
    flex: 1,
    zIndex: 20,
    borderBottomRightRadius: 15,
  },
  menuContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 30, // Adjust the vertical padding as needed
    width: "100%", // Adjust the horizontal padding as needed
  },
});

export default Home;
