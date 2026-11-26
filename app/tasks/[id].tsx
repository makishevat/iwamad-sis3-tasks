import { Stack, router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTasks } from "../../src/context/TasksContext";

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, deleteTask, toggleTask } = useTasks();

  const taskId = Number(id);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Task Not Found" }} />
        <Text style={styles.heading}>Task not found</Text>
        <Text style={styles.description}>
          No task with id {id}.
        </Text>

        <Pressable
          onPress={() => router.replace("/")}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Back to tasks</Text>
        </Pressable>
      </View>
    );
  }

    const currentTask = task;

    function handleDelete() {
       deleteTask(currentTask.id);
       router.replace("/");
    }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: currentTask.title }} />
      
      <Text style={styles.heading}>{currentTask.title}</Text>

      <Text style={styles.label}>Description</Text>
      <Text style={styles.description}>
        {currentTask.description || "No description provided."}
      </Text>

      <Text style={styles.label}>Status</Text>
      <Text style={styles.status}>
        {currentTask.completed ? "✓ Completed" : "○ In progress"}
      </Text>

      <Pressable
        onPress={() => toggleTask(task.id)}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>
          {currentTask.completed ? "Mark as In Progress" : "Mark as Completed"}
        </Text>
      </Pressable>

      <Pressable
        onPress={handleDelete}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.deleteText}>Delete Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FC",
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 24,
    lineHeight: 24,
  },
  status: {
    fontSize: 16,
    color: "#6C63FF",
    marginBottom: 24,
  },
  button: {
    minHeight: 48,
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "600",
  },
});
