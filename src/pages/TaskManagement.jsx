import React from 'react';
import KanbanBoard from '../components/KanbanBoard';
import TaskForm from '../components/TaskForm';
import { useAddTask, useDeleteTask } from '../integrations/supabase/hooks/useTasks';
import { useToast } from "@/components/ui/use-toast";

const TaskManagement = () => {
  const addTaskMutation = useAddTask();
  const deleteTaskMutation = useDeleteTask();
  const { toast } = useToast();

  const handleAddTask = async (newTask) => {
    try {
      await addTaskMutation.mutateAsync({ ...newTask, status: 'upcoming' });
      toast({
        title: "Task added",
        description: "Your new task has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
      toast({
        title: "Task deleted",
        description: "The task has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Task Management</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <TaskForm onAddTask={handleAddTask} />
      </div>
      <KanbanBoard onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default TaskManagement;