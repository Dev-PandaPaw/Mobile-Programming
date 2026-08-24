import { Pressable, StyleSheet, Text, View } from "react-native";
import { Student } from "../data/students";

export interface StudentRowProps {
  student: Student;
  onPress: (student: Student) => void;
  avatarBg?: string;
  avatarColor?: string;
}

function getInitials(fullName: string) {
  const words = fullName.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function StudentRow({
  student,
  onPress,
  avatarBg,
  avatarColor,
}: StudentRowProps) {
  const isActive = student.status === "Đang học";

  return (
    <Pressable
      onPress={() => onPress(student)}
      style={({ pressed }) => [
        styles.studentCard,
        pressed && styles.studentCardPressed,
      ]}
    >
      <View
        style={[styles.avatar, avatarBg ? { backgroundColor: avatarBg } : null]}
      >
        <Text
          style={[
            styles.avatarText,
            avatarColor ? { color: avatarColor } : null,
          ]}
        >
          {getInitials(student.fullName)}
        </Text>
      </View>
      <View style={styles.studentContent}>
        <Text style={styles.studentName}>{student.fullName}</Text>
        <Text style={styles.studentMeta}>
          {student.studentId} · {student.className}
        </Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          isActive ? styles.activeBadge : styles.pausedBadge,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            isActive ? styles.activeText : styles.pausedText,
          ]}
        >
          {student.status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  studentCardPressed: {
    opacity: 0.7,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#4338CA",
    fontWeight: "bold",
    fontSize: 14,
  },
  studentContent: {
    flex: 1,
  },
  studentName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  studentMeta: {
    fontSize: 13,
    color: "#6B7280",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: "#DEF7EC",
  },
  pausedBadge: {
    backgroundColor: "#FEF08A",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  activeText: {
    color: "#03543F",
  },
  pausedText: {
    color: "#713F12",
  },
});
