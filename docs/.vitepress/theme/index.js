import DefaultTheme from "vitepress/theme";
import HomeHeroImage from "@/components/HomeHeroImage.vue";
import "@/global.css";

export default {
	extends: DefaultTheme,
	Layout: HomeHeroImage,
};
