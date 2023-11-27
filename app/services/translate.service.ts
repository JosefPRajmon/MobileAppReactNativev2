import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import cs from '../translation/cs.json';

class TranslateService {
    private currentLocale: string;

    constructor() {
        this.currentLocale = i18n.currentLocale();
        i18n.defaultLocale = "cs";
        i18n.fallbacks = true;
        i18n.translations = {
            cs
        };

        i18n.locale = Localization.locale;
    }

    setLocale(lang: string): void {
        this.currentLocale = lang;
        i18n.locale = lang;
    }

    get(name: string, params = {}): string {
        return i18n.t(name, params);
    }

    getWithFirstLowerCase(name: string, params = {}): string {
        let string = this.get(name, params);
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    getWithFirstUpperCase(name: string, params = {}): string {
        let string = this.get(name, params);
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getUpperCase(name: string, params = {}): string {
        let string = this.get(name, params);
        return string.toUpperCase();
    }

    getCurrentLocale() {
        return this.currentLocale;
    }

    // locale strings have to match js file name (without js) in node_modules/moment/locale/
    getCurrentLocaleMomentFormat() {
        // if (this.currentLocale.startsWith('cs')) {
        //   return 'cs';
        // }
        return 'cs';
    }
}

export const translate = new TranslateService();
