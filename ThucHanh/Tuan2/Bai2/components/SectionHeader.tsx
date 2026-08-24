import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface SectionTheme {
  headerBg: string;
  titleColor: string;
  badgeBg: string;
  badgeText: string;
  borderLeft: string;
  avatarBg: string;
  avatarText: string;
}

export interface SectionHeaderProps {
  title: string;
  count: number;
  isCollapsed: boolean;
  theme: SectionTheme;
  onToggle: () => void;
}

export function SectionHeader({
  title,
  count,
  isCollapsed,
  theme,
  onToggle,
}: SectionHeaderProps) {
  return (
    <Pressable
      onPress={onToggle}
      style={[
        styles.sectionHeader,
        {
          backgroundColor: theme.headerBg,
          borderLeftWidth: 4,
          borderLeftColor: theme.borderLeft,
        },
      ]}
    >
      <View style={styles.sectionTitleRow}>
        <Text style={[styles.sectionTitle, { color: theme.titleColor }]}>
          {title}
        </Text>
        <View style={[styles.countBadge, { backgroundColor: theme.badgeBg }]}>
          <Text style={[styles.countBadgeText, { color: theme.badgeText }]}>
            {count} SV
          </Text>
        </View>
      </View>
      <Text style={[styles.collapseIcon, { color: theme.titleColor }]}>
        {isCollapsed ? "▶" : "▼"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 12,
    borderRadius: 6,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  collapseIcon: {
    fontSize: 12,
  },
});
