import { StyleSheet } from 'react-native';
//import createNormalizeStyle from '../util/textHelper';
import { Colors, Metrics } from './';

const appStyles = StyleSheet.create({
    /** Components */
    /* Header */
    headerButton: {
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingHorizontal: Metrics.padding.micro
    },
    headerRightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: Metrics.margin.normal
    },
    listItemTitle: {
        color: Colors.text.listItemTitle,
        fontSize: Metrics.font.title,
        fontWeight: 'bold',
        marginBottom: Metrics.margin.small
    },
    listItemDate: {
        color: Colors.text.defaultText,
        fontSize: Metrics.font.subtitle,
        fontWeight: 'bold',
        marginBottom: Metrics.margin.small
    },
    listItemSubtitle: {
        color: Colors.text.defaultText,
        fontSize: Metrics.font.text,
        fontWeight: 'bold'
    },
    listItemDescription: {
        color: Colors.text.defaultText,
        fontSize: Metrics.font.text,
        marginTop: Metrics.margin.small,
        fontWeight: '400'
    },
    listItemLink: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: Metrics.margin.small
    },
    listItemLinkText: {
        color: Colors.text.defaultText,
        fontSize: Metrics.font.subtitle,
        fontWeight: 'bold'
    },
    listItemLinkIcon: {
        marginRight: Metrics.margin.small
    },
    listItemThumb: {
        width: Metrics.images.thumbnail,
        height: Metrics.images.thumbnail,
        borderRadius: Metrics.images.borderRadius
    },
    accordionHeader: {
        flexDirection: 'row',
        padding: Metrics.padding.normal,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.accordion.separator,
        backgroundColor: Colors.accordion.headerColor,
        margin: "4%",
        marginBottom: "1.5%",
        borderRadius: 12
    },
    accordionTitle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: Metrics.margin.small
    },
    accordionText: {
        color: Colors.accordion.text,
        fontWeight: 'bold',
        fontSize: Metrics.font.title
    },
    accordionIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: Metrics.icon.small
    },
    detailTitle: {
        fontSize: Metrics.font.detailTitle,
        fontWeight: 'bold',
        color: Colors.text.detailTitle
    },
    detailItemTitle: {
        flex: 1,
        paddingBottom: 2,
        color: Colors.text.detailTitle,
        fontWeight: 'bold',
        fontSize: Metrics.font.title
    },
    calloutTitle: {
        color: Colors.text.listItemTitle,
        fontSize: Metrics.font.title,
        fontWeight: 'bold',
        marginBottom: Metrics.margin.normal
    },
    calloutDescription: {
        color: Colors.text.defaultText,
        fontSize: Metrics.font.text,
        fontWeight: '400'
    },
    input: {
        color: Colors.input.text,
        borderColor: Colors.input.background
    },
    filterButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.filterButtonsContainerBg,
        paddingTop: Metrics.padding.small,
        paddingBottom: Metrics.padding.big,
        paddingHorizontal: Metrics.padding.big
    },

    toastTextStyle: {
        color: Colors.text.defaultText
    },


    bottomView: {
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.0)'
        // Další styly pro spodní View
    },
    menuCentr: {
        width: "14%",
        height: 50,
        padding: "3%",
        flex: 1,
        backgroundColor: Colors.navHeader.backgroundColor
    }, 
    menuLeft: {
        width: "43%",
        backgroundColor: Colors.navHeader.backgroundColor
    },
    menuRight: {
        width: "43%",
        backgroundColor: Colors.navHeader.backgroundColor
    },
    menuItem: {
        width: "28%",
        margin: "3%",
        padding: "5%",
    }
});

export default appStyles;
