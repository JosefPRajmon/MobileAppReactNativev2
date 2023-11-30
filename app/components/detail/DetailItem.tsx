import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import cuid from 'cuid';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Metrics, AppStyles, Colors } from '../../themes';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { translate } from '../../services/translate.service';
import HTML, { IGNORED_TAGS } from 'react-native-render-html';

export default function DetailItem(props: any) {
  const { title, type, data, onItemPress, containerStyle } = props;

  const renderItems = () => {
    switch (type) {
      case 'situations':
        return data.map((item: any) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={cuid()}
              style={styles.buttonItemContainer}
              onPress={() => onItemPress(item.id_situation)}
            >
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{item.name}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  style={styles.icon}
                  size={Metrics.icon.normal}
                  name='file-document-outline'
                  color={Colors.listItemIcon}
                />
              </View>
            </TouchableOpacity>
          );
        });
      case 'faq':
        return data.map((item: any) => {
          return (
            <View key={cuid()} style={styles.buttonItemContainer}>
              <View style={styles.textContainer}>
                <View
                  style={[
                    styles.textInner,
                    { marginBottom: Metrics.margin.tinny }
                  ]}
                >
                  <Text>
                    <Text style={styles.itemTitle}>
                      {translate.get('text-question')}
                    </Text>
                    <Text style={styles.itemSubtitle}>{item.otazka}</Text>
                  </Text>
                </View>
                <View style={styles.textInner}>
                  <Text>
                    <Text style={styles.itemTitle}>
                      {translate.get('text-answer')}
                    </Text>
                    <Text style={styles.itemSubtitle}>{item.odpoved}</Text>
                  </Text>
                </View>
              </View>
            </View>
          );
        });
      case 'texts':
        return data.map((item: any) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={cuid()}
              style={styles.buttonItemContainer}
              disabled={item.href === ''}
              onPress={() => handleOpenLink(item.href)}
            >
              <View style={styles.textContainer}>
                {item.href === '' ? (
                  <Text style={styles.itemSubtitle}>{item.text}</Text>
                ) : (
                  <Text style={styles.itemTitle}>{item.text}</Text>
                )}
              </View>
              {item.href !== '' && (
                <View style={styles.iconContainer}>
                  <Icon
                    style={styles.icon}
                    size={Metrics.icon.normal}
                    name='link-variant'
                    color={Colors.listItemIcon}
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        });
      case 'links':
        return data.map((item: any) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={cuid()}
              style={styles.buttonItemContainer}
              onPress={() => handleOpenLink(item.href)}
            >
              <View style={styles.textContainer}>
                {item.text !== '' && (
                  <Text style={styles.itemTitle}>{item.text}</Text>
                )}
                {item.description !== '' && (
                  <Text style={styles.itemTitle}>{item.description}</Text>
                )}
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  style={styles.icon}
                  size={Metrics.icon.normal}
                  name='link-variant'
                  color={Colors.listItemIcon}
                />
              </View>
            </TouchableOpacity>
          );
        });
      case 'contacts':
        return data.map((item: any) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={cuid()}
              style={styles.buttonItemContainer}
              onPress={() => onItemPress(item.id_person)}
            >
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>
                  {item.name} {item.surname}
                </Text>
                <Text style={styles.itemSubtitle}>{item.name_job}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  style={styles.icon}
                  size={Metrics.icon.normal}
                  name='phone'
                  color={Colors.listItemIcon}
                />
              </View>
            </TouchableOpacity>
          );
        });
      case 'button':
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonItemContainer}
            onPress={onItemPress}
          >
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{data}</Text>
            </View>
          </TouchableOpacity>
        );
      case 'email-phone-link':
        return data.map((item: any) => {
          return (
            <TouchableOpacity
              key={cuid()}
              style={styles.buttonItemContainer}
              onPress={() =>
                (item.number && handleCallPhone(item.number)) ||
                (item.email && handleSendEmail(item.email)) ||
                (item.link && handleOpenLink(item.link))
              }
            >
              {item.number && (
                      <View style={styles.textContainer}>

                  <Text style={styles.itemSubtitle}>
                    {item.name ? item.name : 'TELEFON'}
                  </Text>
                  <Text style={styles.itemTitle}>{item.number}</Text>
                </View>
              )}
              {item.email && (
                <View style={styles.textContainer}>
                  <Text style={styles.itemSubtitle}>EMAIL</Text>
                  <Text style={styles.itemTitle}>{item.email}</Text>
                </View>
              )}
              {item.link && (
                <View style={styles.textContainer}>
                  <Text style={styles.itemSubtitle}>WEB</Text>
                  <Text style={styles.itemTitle}>{item.link}</Text>
                </View>
              )}
              <View style={styles.iconContainer}>
                <Icon
                  style={styles.icon}
                  size={Metrics.icon.normal}
                  name={
                    (item.number && 'phone') ||
                    (item.email && 'email') ||
                    (item.link && 'link-variant')
                  }
                  color={Colors.listItemIcon}
                />
              </View>
            </TouchableOpacity>
          );
        });
      case 'html':
        return (
          <View style={styles.itemContainer}>
            <HTML
              source={{ html: data }}
              onLinkPress={(evt, href) => handleOpenLink(href)}
              baseFontStyle={styles.textItem}
              tagsStyles={{ p: styles.pStyle }}
              ignoredTags={[...IGNORED_TAGS, 'br']}
            />
          </View>
        );
      default:
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.textItem}>{data}</Text>
          </View>
        );
    }
  };

  const handleOpenLink = (href: string) => {
    href !== '' && WebBrowser.openBrowserAsync(href);
  };

  const handleCallPhone = (number: string) => {
    Linking.openURL('tel:' + number.replace(/ /g, ''));
  };

  const handleSendEmail = (email: string) => {
    Linking.openURL('mailto:' + email);
  };

  return data !== '' ? (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.title}>
        <Text style={AppStyles.detailItemTitle}>{title}</Text>
      </View>
      {renderItems()}
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: Metrics.margin.big,
    marginBottom: Metrics.margin.tinny
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.detailItemBorder
  },
  itemContainer: {
    //paddingHorizontal: Metrics.padding.small,
    marginTop: Metrics.padding.small
  },
  textItem: {
    fontSize: Metrics.font.text,
    color: Colors.text.defaultText
  },
  buttonItemContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
    padding: Metrics.padding.small,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.listItemSeparator
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    color: Colors.text.defaultText
  },
  iconContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
  },
  itemTitle: {
    fontSize: Metrics.font.text,
    fontWeight: 'bold',
    marginBottom: Metrics.margin.tinny,
    color: Colors.text.defaultText
  },
  itemSubtitle: {
    fontSize: Metrics.font.text,
    color: Colors.text.defaultText
  },
  icon: {
    paddingLeft: Metrics.padding.small
  },
  textInner: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  // styling HTML view
  pStyle: {
    padding: 0
  }
});
