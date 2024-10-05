import React from 'react';
import { useTasks, useAddTask, useUpdateTask, useDeleteTask } from '../integrations/supabase';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useToast } from "@/components/ui/use-toast";

const TaskManagement = () => {
  const { data: tasks, isLoading, isError } = useTasks();
  const addTaskMutation = useAddTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const { toast } = useToast();

  const handleAddTask = async (newTask) => {
    try {
      await addTaskMutation.mutateAsync(newTask);
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

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTaskMutation.mutateAsync(updatedTask);
      toast({
        title: "Task updated",
        description: "The task has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the task. Please try again.",
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

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks. Please try again.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Task Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <TaskForm onAddTask={handleAddTask} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Task List</h2>
          <TaskList 
            tasks={tasks} 
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;