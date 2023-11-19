import { useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
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

  const toggleNavigation = () => {
    setOpenNav(true);
  };

  const closeNavigation = () => {
    setOpenNav(false);
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
      {openNav && (
        <SafeAreaView
          style={{
            position: "absolute",
            backgroundColor: COLORS.secondary,
            width: "50%",
            flex: 1,
            height: "100%",
            zIndex: 20,
            flexDirection: "row",
            justifyContent: "center",
            gap: 50,
          }}
        >
          <View>
            <TouchableOpacity onPress={() => console.log("Navigate to Home")}>
              <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Navigate to Home")}>
              <Text>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Navigate to Home")}>
              <Text>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Navigate to Home")}>
              <Text>Toggle Mode</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setOpenNav(false)}>
            <ScreenHeaderBtn
              handlePress={closeNavigation}
              iconUrl={icons.closeIcon}
              dimension="60%"
            />
          </TouchableOpacity>
        </SafeAreaView>
      )}

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

export default Home;
