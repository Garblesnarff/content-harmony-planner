import { LayoutDashboard, CalendarDays, Target } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import TaskManagement from "./pages/TaskManagement";
import MonthlyGoal from "./pages/MonthlyGoal";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <LayoutDashboard className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Task Management",
    to: "/tasks",
    icon: <CalendarDays className="h-4 w-4" />,
    page: <TaskManagement />,
  },
  {
    title: "Monthly Goal",
    to: "/monthly-goal",
    icon: <Target className="h-4 w-4" />,
    page: <MonthlyGoal />,
  },
];