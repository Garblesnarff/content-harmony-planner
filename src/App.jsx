import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskManagement from "./pages/TaskManagement";
import MonthlyGoal from "./pages/MonthlyGoal";
import CalendarPage from "./pages/Calendar";
import WeeklyPage from "./pages/Weekly";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<TaskManagement />} />
            <Route path="monthly-goal" element={<MonthlyGoal />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="weekly" element={<WeeklyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;