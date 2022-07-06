import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import HomePage from "../src/HomePage";
import NewsPage from "../src/NewsPage";
import React from "react";

const screens = {
    News: {
        screen: HomePage
    },
    View: {
        screen: NewsPage
    },
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
