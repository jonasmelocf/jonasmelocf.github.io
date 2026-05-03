import { useData } from "vitepress";
import translationsFile from "@/assets/translations.jsonc?raw";
import { commentsRegex } from "@/lib/utils";

type Translations = {
	[textInEnglish: string]: { [langCode: string]: string };
};

const translations: Translations = JSON.parse(
	translationsFile.replace(commentsRegex, ""),
);

export function useTranslation() {
	const data = useData();
	const lang = data.localeIndex.value;

	function t(textInEnglish: string) {
		if (!(textInEnglish in translations)) {
			throw new Error(`missing "${lang}" translation "${textInEnglish}"`);
		}
		if (lang === "en") {
			return textInEnglish;
		}
		return translations[textInEnglish][lang];
	}

	return { t };
}
