import DefaultTheme from "vitepress/theme";
import Terminal from "./components/Terminal.vue";
import "./tailwind.css";

export default {
	extends: DefaultTheme,
	Layout: Terminal,
};
