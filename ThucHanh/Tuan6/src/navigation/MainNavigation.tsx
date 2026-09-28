import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Gio5_Bai1_TabBar from "../components/Gio5_Bai1_TabBar";
import Gio4_Bai1_HomeScreen from "../components/Gio4_Bai1_HomeScreen";
import Gio4_Bai2_BookDetail from "../components/Gio4_Bai2_BookDetail";
import Gio5_Bai2_CartScreen from "../components/Gio5_Bai2_CartScreen";
import CategoryScreen from "../components/CategoryScreen";
import AccountScreen from "../components/AccountScreen";
import CheckoutScreen from "../components/CheckoutScreen";

const Stack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Gio4_Bai1_HomeScreen} />
      <Stack.Screen name="BookDetail" component={Gio4_Bai2_BookDetail} />
    </Stack.Navigator>
  );
}

function CartStackNavigator() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="CartMain" component={Gio5_Bai2_CartScreen} />
      <CartStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </CartStack.Navigator>
  );
}

export default function MainNavigation() {
  return (
    <Tab.Navigator
      tabBar={(props) => <Gio5_Bai1_TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="DanhMuc" component={CategoryScreen} />
      <Tab.Screen name="GioHang" component={CartStackNavigator} />
      <Tab.Screen name="TaiKhoan" component={AccountScreen} />
    </Tab.Navigator>
  );
}
