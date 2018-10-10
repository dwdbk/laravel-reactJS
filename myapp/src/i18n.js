import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';
import fr from './assets/locales/fr.json';
import en from './assets/locales/en.json';
// import Environment from './environment';

const debug = process.env.NODE_ENV !== "production";

i18n
    .use(XHR)
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: {
            fr,
            en,
        },
        // whitelist : ['fr','en'],
        // lng : lang,
        fallbackLng: 'fr',
        // False ins production
        debug: debug,

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        // keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },

     /*   backend: {
            loadPath: Environment.CLIENT_API+'/assets/locales/{{lng}}/{{ns}}.json'
        },*/
        react: {
            wait: true
        }
    });

export default i18n;