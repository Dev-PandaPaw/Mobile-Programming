import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SearchField } from "./components/SearchField";
import { SectionHeader, SectionTheme } from "./components/SectionHeader";
import { StudentRow } from "./components/StudentRow";
import { Student, StudentStatus, studentSections } from "./data/students";

function getFirstName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1];
}

function getInitial(fullName: string) {
  const firstName = getFirstName(fullName);
  return firstName.charAt(0).toUpperCase();
}

const SECTION_THEMES: SectionTheme[] = [
  {
    headerBg: "#DBEAFE",
    titleColor: "#1E40AF",
    badgeBg: "#BFDBFE",
    badgeText: "#1E3A8A",
    borderLeft: "#2563EB",
    avatarBg: "#EFF6FF",
    avatarText: "#1D4ED8",
  },
  {
    headerBg: "#D1FAE5",
    titleColor: "#065F46",
    badgeBg: "#A7F3D0",
    badgeText: "#064E3B",
    borderLeft: "#059669",
    avatarBg: "#ECFDF5",
    avatarText: "#047857",
  },
  {
    headerBg: "#FEF3C7",
    titleColor: "#92400E",
    badgeBg: "#FDE68A",
    badgeText: "#78350F",
    borderLeft: "#D97706",
    avatarBg: "#FFFBEB",
    avatarText: "#B45309",
  },
  {
    headerBg: "#FCE7F3",
    titleColor: "#9D174D",
    badgeBg: "#FBCFE8",
    badgeText: "#831843",
    borderLeft: "#DB2777",
    avatarBg: "#FDF2F8",
    avatarText: "#BE185D",
  },
  {
    headerBg: "#EDE9FE",
    titleColor: "#5B21B6",
    badgeBg: "#DDD6FE",
    badgeText: "#4C1D95",
    borderLeft: "#7C3AED",
    avatarBg: "#F5F3FF",
    avatarText: "#6D28D9",
  },
];

function getSectionTheme(title: string): SectionTheme {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash + title.charCodeAt(i)) % SECTION_THEMES.length;
  }
  return SECTION_THEMES[hash];
}

export default function StudentDirectoryScreen() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Tất cả" | StudentStatus>(
    "Tất cả",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [groupBy, setGroupBy] = useState<"faculty" | "alphabet">("faculty");
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const alphabetSections = useMemo(() => {
    const allStudents = studentSections.flatMap((s) => s.data);
    const map = new Map<string, Student[]>();

    allStudents.forEach((student) => {
      const letter = getInitial(student.fullName);
      if (!map.has(letter)) {
        map.set(letter, []);
      }
      map.get(letter)!.push(student);
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b, "vi"))
      .map(([title, data]) => ({ title, data }));
  }, []);

  const filteredSections = useMemo(() => {
    const baseSections =
      groupBy === "faculty" ? studentSections : alphabetSections;
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");

    return baseSections
      .map((section) => {
        const sortedData = [...section.data].sort((a, b) => {
          const nameA = getFirstName(a.fullName);
          const nameB = getFirstName(b.fullName);
          const cmp = nameA.localeCompare(nameB, "vi");
          if (cmp !== 0) {
            return sortOrder === "asc" ? cmp : -cmp;
          }
          return sortOrder === "asc"
            ? a.fullName.localeCompare(b.fullName, "vi")
            : b.fullName.localeCompare(a.fullName, "vi");
        });

        return {
          ...section,
          data: sortedData.filter((student) => {
            const matchQuery =
              !normalizedQuery ||
              `${student.fullName} ${student.studentId} ${student.className}`
                .toLocaleLowerCase("vi")
                .includes(normalizedQuery);
            const matchStatus =
              statusFilter === "Tất cả" || student.status === statusFilter;
            return matchQuery && matchStatus;
          }),
        };
      })
      .filter((section) => section.data.length > 0);
  }, [groupBy, alphabetSections, query, statusFilter, sortOrder]);

  const displayedSections = useMemo(() => {
    return filteredSections.map((section) => ({
      ...section,
      data: collapsedSections.includes(section.title) ? [] : section.data,
    }));
  }, [filteredSections, collapsedSections]);

  const totalStudents = filteredSections.reduce(
    (total, section) => total + section.data.length,
    0,
  );

  const openStudent = (student: Student) => {
    Alert.alert(
      student.fullName,
      `Mã sinh viên: ${student.studentId}\nLớp: ${student.className}\nTrạng thái: ${student.status}`,
    );
  };

  return (
    <View style={styles.container}>
      <SearchField query={query} onChangeQuery={setQuery} />
      <View style={styles.actionRow}>
        <View style={styles.filterContainer}>
          {(["Tất cả", "Đang học", "Bảo lưu"] as const).map((status) => (
            <Pressable
              key={status}
              onPress={() => setStatusFilter(status)}
              style={[
                styles.filterChip,
                statusFilter === status && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  statusFilter === status && styles.filterChipTextActive,
                ]}
              >
                {status}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.actionButtons}>
          <Pressable
            onPress={() =>
              setGroupBy((prev) =>
                prev === "faculty" ? "alphabet" : "faculty",
              )
            }
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>
              {groupBy === "faculty" ? "Khoa" : "A-Z"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>
              {sortOrder === "asc" ? "A→Z ↑" : "Z→A ↓"}
            </Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.resultText}>Tìm thấy {totalStudents} sinh viên</Text>
      <SectionList
        sections={displayedSections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={true}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderSectionHeader={({ section }) => {
          const isCollapsed = collapsedSections.includes(section.title);
          const theme = getSectionTheme(section.title);
          const count =
            filteredSections.find((s) => s.title === section.title)?.data
              .length || 0;

          return (
            <SectionHeader
              title={section.title}
              count={count}
              isCollapsed={isCollapsed}
              theme={theme}
              onToggle={() => toggleSection(section.title)}
            />
          );
        }}
        renderItem={({ item, section }) => {
          const theme = getSectionTheme(section.title);
          return (
            <StudentRow
              student={item}
              onPress={openStudent}
              avatarBg={theme.avatarBg}
              avatarColor={theme.avatarText}
            />
          );
        }}
        renderSectionFooter={({ section }) => {
          if (collapsedSections.includes(section.title)) return null;
          return (
            <View style={styles.sectionFooter}>
              <Text style={styles.sectionFooterText}>
                — Hết danh sách {section.title} —
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Không tìm thấy sinh viên</Text>
            <Text style={styles.emptyText}>
              Không có sinh viên phù hợp với "{query.trim()}".
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 6,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },
  filterChipActive: {
    backgroundColor: "#4F46E5",
  },
  filterChipText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 6,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  actionButtonText: {
    fontSize: 11,
    color: "#4338CA",
    fontWeight: "600",
  },
  resultText: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 8,
    fontWeight: "500",
  },
  sectionFooter: {
    paddingVertical: 6,
    alignItems: "center",
    marginBottom: 4,
  },
  sectionFooterText: {
    fontSize: 11,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
  },
});
