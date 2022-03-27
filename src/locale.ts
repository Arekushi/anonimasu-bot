import path from 'path';
import i18n from 'i18n';


export const locale = () => {
    i18n.configure({
        locales: ['en', 'pt'],
        defaultLocale: 'pt',
        extension: '.json',
        updateFiles: false,
        objectNotation: true,
        directory: path.join(__dirname, './assets/locales')
    });
};
