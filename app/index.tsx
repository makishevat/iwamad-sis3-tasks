import { router } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTasks } from "../src/context/TasksContext";

export default function TasksScreen() {
  const { tasks } = useTasks();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push("/new")}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>+ New Task</Text>
      </Pressable>

      <Text style={styles.hint}>
        Tap a task to see its details.
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(t) => String(t.id)}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/tasks/${item.id}`)}
            style={({ pressed }) => [
              styles.taskRow,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>
                {item.title}
              </Text>

              <Text style={styles.status}>
                {item.completed ? "✓ Completed" : "○ In progress"}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No tasks yet. Create your first task!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F7FC",
  },
  button: {
    minHeight: 48,
    backgroundColor: "#7357D9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    marginBottom: 12,
    color: "#777777",
    fontSize: 13,
  },
  taskRow: {
    minHeight: 64,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  taskInfo: {
    gap: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
  status: {
    fontSize: 13,
    color: "#777777",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777777",
    fontSize: 15,
  },
  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },
});
