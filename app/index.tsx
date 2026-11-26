import { router } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { TaskRow } from "../src/components/TaskRow";
import { useTasks } from "../src/context/TasksContext";

export default function TasksScreen() {
  const { tasks, deleteTask } = useTasks();

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
        Swipe a task left to delete it.
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(task) => String(task.id)}
        renderItem={({ item }) => (
          <TaskRow
            task={item}
            onPress={() => router.push(`/tasks/${item.id}`)}
            onDelete={deleteTask}
          />
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.65,
  },
  hint: {
    marginBottom: 12,
    color: "#777",
    fontSize: 13,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});
