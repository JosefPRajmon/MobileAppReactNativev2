import React from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export function TabBarIcon(props: { name: string; color: string }) {
  return <Icon size={25} style={{ marginBottom: 2 }} {...props} />;
}
