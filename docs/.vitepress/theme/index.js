import DefaultTheme from "vitepress/theme";
import HomeHeroImage from "./components/HomeHeroImage.vue";
import "./tailwind.css";

export default {
	extends: DefaultTheme,
	Layout: HomeHeroImage,
};
