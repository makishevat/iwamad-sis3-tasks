import { useRef } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";

import type { Task } from "../data/tasks";

type TaskRowProps = {
  task: Task;
  onPress: () => void;
  onDelete: (id: number) => void;
};

export function TaskRow({ task, onPress, onDelete }: TaskRowProps) {
  const swipeable = useRef<SwipeableMethods>(null);

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      layout={LinearTransition}
    >
      <ReanimatedSwipeable
        ref={swipeable}
        overshootRight={false}
        renderRightActions={() => (
          <Pressable
            onPress={() => {
              swipeable.current?.close();
              onDelete(task.id);
            }}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deletePressed,
            ]}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.title}>{task.title}</Text>

          <Text style={styles.description}>
            {task.description}
          </Text>

          <Text style={styles.status}>
            {task.completed ? "✓ Completed" : "○ In progress"}
          </Text>
        </Pressable>
      </ReanimatedSwipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 64,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  cardPressed: {
    backgroundColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  status: {
    fontSize: 13,
    marginTop: 6,
    color: "#7357D9",
  },
  deleteButton: {
    minHeight: 64,
    width: 85,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#DC3545",
    alignItems: "center",
    justifyContent: "center",
  },
  deletePressed: {
    opacity: 0.7,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
});
