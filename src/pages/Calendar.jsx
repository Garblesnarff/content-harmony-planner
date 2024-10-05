import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from '../components/TaskForm';
import { useTasks, useAddTask, useUpdateTask, useDeleteTask } from '../integrations/supabase/hooks/useTasks';
import { useToast } from "@/components/ui/use-toast";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date(2024, 9, 5)); // October 5th 2024
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

  const getTasksForDate = (date) => {
    if (!tasks) return [];
    return tasks.filter(task => {
      const taskDate = new Date(task.due_date);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const renderTasksForDate = (date) => {
    const tasksForDate = getTasksForDate(date);
    return (
      <div className="mt-2">
        {tasksForDate.map(task => (
          <div key={task.id} className="flex justify-between items-center mb-1">
            <span>{task.description}</span>
            <Button variant="destructive" size="sm" onClick={() => handleDeleteTask(task.id)}>Remove</Button>
          </div>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Task for {date.toDateString()}</DialogTitle>
            </DialogHeader>
            <TaskForm onAddTask={handleAddTask} initialDate={date.toISOString().split('T')[0]} />
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks. Please try again.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>
      <div className="flex">
        <Card className="mr-4">
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card className="flex-grow">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Tasks for {date.toDateString()}</h2>
            {renderTasksForDate(date)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;