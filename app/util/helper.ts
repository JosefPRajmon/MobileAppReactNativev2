import { AppConfig } from '../config/App.config';
import { Colors, Metrics } from '../themes';
import { Dimensions } from 'react-native';
import moment from 'moment';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

export const createThumbnailUrl = (img: any, type: string) => {
    let image: any;

    switch (type) {
        case 'thumb':
            const thumbShringSize = Math.floor(Metrics.images.thumbnail * Metrics.screenDims.scale);
            if (typeof img === "number" && img > 0) {
                image = img ? AppConfig.domainUrl + 'galerie/' + img + "_" + thumbShringSize + "_" + thumbShringSize + "_4.jpg" : null;
            } else if (typeof img === "string") {
                image = img.replace(".jpg", "_" + thumbShringSize + "_" + thumbShringSize + "_4.jpg")
            } else {
                image = null;
            }
            break;
        case 'detail':
            if (typeof img === "number" && img > 0) {
                const width = (Metrics.screenDims.width - Metrics.padding.normal) /* * Metrics.screenDims.scale */;
                image = img ? AppConfig.domainUrl + 'galerie/' + img + '_' + Math.floor(width) + '_0_2.jpg' : null;
            } else {
                image = null;
            }
            break;
        case 'callout':
            if (typeof img === "number" && img > 0) {
                image = img ? AppConfig.domainUrl + 'galerie/' + img + '_' + Metrics.bubble.imgWidth + '_' + Metrics.bubble.imgHeight + '_6.jpg' : null;
            } else {
                image = null;
            }
            break;
        case 'swiper':
            if (typeof img === "number" && img > 0) {
                image = img ? AppConfig.domainUrl + 'galerie/' + img + '_' + Metrics.imageSwiper.width + '_' + Metrics.imageSwiper.height + '_6.jpg' : null;
            } else {
                image = null;
            }
            break;
        default:
            image = img ? AppConfig.domainUrl + 'galerie/' + img + '.jpg' : null;
            break;
    }

    if (image) {
        image = image.replace(/^http:\/\//i, 'https://');
    }

    return image;
};

export const removeDiacritics = (str: string) => {
    return str.toLowerCase().replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/[úů]/g, "u").replace(/ý/g, "y").replace(/[ĺľ]/g, "l")
        .replace(/č/g, "c").replace(/ď/g, "d").replace(/ě/g, "e").replace(/ň/g, "n").replace(/ř/g, "r").replace(/š/g, "s").replace(/ť/g, "t").replace(/ž/g, "z");
}

export const filerForAccordion = (items: Array<any>, attr: string, value: number) => {
    return items.filter(item => item[attr] === value);
}

export const getLongitudeDeltaFromZoom = (zoom: number) => {
    return Math.pow(Math.E, Math.log(360) - (zoom + 1) * Math.LN2);
}

export const getMapBounds = (region: any) => {
    return {
        westLng: region.longitude - region.longitudeDelta / 2,
        southLat: region.latitude - region.latitudeDelta / 2,
        eastLng: region.longitude + region.longitudeDelta / 2,
        northLat: region.latitude + region.latitudeDelta / 2,
        zoom: Math.floor(Math.log(360 / region.longitudeDelta) / Math.LN2)
    };
}

export const openLink = (href: string) => {
    href !== "" && WebBrowser.openBrowserAsync(href);
}

export const hexToRGBa = (hex: string, alpha: number) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export const handleCallPhone = (number: string) => {
    Linking.openURL("tel:" + number.replace(/ /g, ''));
}

export const filterByDate = (items: any, dateChoice: number, selectedDate?: any) => {
    let start: any;
    let end: any;

    switch (dateChoice) {
        case 0:
            // Zvolený datum
            start = moment(selectedDate).startOf('day').valueOf();
            end = moment(selectedDate).endOf('day').valueOf();
            break;
        case 1:
            // DNES
            start = moment().startOf('day').valueOf();
            end = moment().endOf('day').valueOf();
            break;
        case 2:
            //ZÍTRA
            start = moment().add(1, 'days').startOf('day').valueOf();
            end = moment().add(1, 'days').endOf('day').valueOf();
            break;
        case 3:
            // O VÍKENDU
            // Start je pátek od 18:00 a end neděle 23:59
            start = moment().startOf('day').startOf('week').add(5, 'days').set('hour', 18).valueOf();
            end = moment().endOf('week').add(1, 'days').valueOf();
            break;
        case 4:
            // TENTO TÝDEN
            // Ode dneška do konce týdne
            start = moment().startOf('day').valueOf();
            end = moment().endOf('week').add(1, 'days');
            break;
        case 5:
            // PŘÍŠTÍ TÝDEN
            start = moment().endOf('week').add(2, 'days').startOf('day').valueOf();
            end = moment(start).add(6, 'days').endOf('day').valueOf();
            break;
        case 6:
            // TENTO MĚSÍC
            start = moment().startOf('day').valueOf();
            end = moment().endOf('month').valueOf();
            break;
        default:
            // VŠECHNY ODE DNEŠKA
            start = moment().startOf('day').valueOf();
            end = moment(start).add(50, 'days').endOf('day').valueOf();
    }
    return items.filter((item: any) => {
        for (let date of item.datetimes) {
            if ((date.start >= start && date.start <= end) || (!!date.end && date.end >= start && date.end <= end) || (date.start <= start && date.end && date.end >= end)) {
                item.used_date = date;
                return true;
            }
        }
        return false;
    });
}