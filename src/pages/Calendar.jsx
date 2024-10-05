import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from '../components/TaskForm';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date(2024, 9, 5)); // October 5th 2024
  const [tasks, setTasks] = useState({});

  const handleAddTask = (newTask) => {
    const taskDate = new Date(newTask.dueDate).toDateString();
    setTasks(prevTasks => ({
      ...prevTasks,
      [taskDate]: [...(prevTasks[taskDate] || []), newTask]
    }));
  };

  const handleRemoveTask = (taskDate, taskId) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [taskDate]: prevTasks[taskDate].filter(task => task.id !== taskId)
    }));
  };

  const renderTasksForDate = (date) => {
    const tasksForDate = tasks[date.toDateString()] || [];
    return (
      <div className="mt-2">
        {tasksForDate.map(task => (
          <div key={task.id} className="flex justify-between items-center mb-1">
            <span>{task.title}</span>
            <Button variant="destructive" size="sm" onClick={() => handleRemoveTask(date.toDateString(), task.id)}>Remove</Button>
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