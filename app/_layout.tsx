import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TasksProvider } from "../src/context/TasksContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TasksProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "My Tasks" }}
          />
          <Stack.Screen
            name="new"
            options={{ title: "New Task" }}
          />
          <Stack.Screen
            name="tasks/[id]"
            options={{ title: "Task Details" }}
          />
        </Stack>
      </TasksProvider>
    </GestureHandlerRootView>
  );
}
