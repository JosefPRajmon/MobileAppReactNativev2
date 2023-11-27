import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import moment from 'moment';
import { Metrics, AppStyles, Colors } from '../../themes';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { ListItemSeparator } from './ListItemSeparator';

export default function ListItem(props: any) {
  const {
    onItemPress,
    thumb,
    title,
    description,
    linkText,
    subtitle,
    date,
    isReaded,
    useSeparator,
    disabled
  } = props;

  return (
    <TouchableOpacity
      style={[styles.touch, isReaded && styles.isReaded]}
      onPress={onItemPress}
      disabled={disabled}
    >
      <View style={[styles.container, useSeparator && styles.separator]}>
        {thumb && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: thumb }} style={styles.image} />
          </View>
        )}
        <View style={styles.textContainer}>
          {date && (
            <Text style={styles.date}>
              {typeof date === 'string'
                ? date
                : moment(date).format('D.M.YYYY')}
            </Text>
          )}
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
          {linkText && (
            <View style={styles.linkContainer}>
              <Icon
                style={styles.linkIcon}
                size={Metrics.icon.small}
                name='earth'
                color={Colors.listItemIcon}
              />
              {linkText && <Text style={styles.linkText}>{linkText}</Text>}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touch: {
    flex: 1,
    width: '90%',
    flexDirection: 'column',
        backgroundColor: Colors.appBackround,
        borderRadius: 15,
        margin: "5%",
        marginBottom:"0%"
  },
  container: {
    width: '100%',
    flexDirection: 'row'
  },
  separator: {
    borderBottomWidth: 0.0,

      borderBottomColor: Colors.appBackround //Colors.listItemSeparator
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: Metrics.padding.normal,
    paddingLeft: Metrics.padding.big
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: Metrics.padding.normal
  },
  image: {
    ...AppStyles.listItemThumb
  },
  title: {
    ...AppStyles.listItemTitle
  },
  subtitle: {
    ...AppStyles.listItemSubtitle
  },
  date: {
    ...AppStyles.listItemDate
  },
  description: {
    ...AppStyles.listItemDescription
  },
  linkContainer: {
    ...AppStyles.listItemLink
  },
  linkText: {
    ...AppStyles.listItemLinkText
  },
  linkIcon: {
    ...AppStyles.listItemLinkIcon
  },
  isReaded: {
    opacity: 0.6
  }
});
