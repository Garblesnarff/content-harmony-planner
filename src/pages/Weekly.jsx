import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from '../components/TaskForm';

const WeeklyPage = () => {
  const [currentWeek, setCurrentWeek] = useState([]);
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const today = new Date(2024, 9, 5); // October 5th 2024
    const week = getWeekDates(today);
    setCurrentWeek(week);
  }, []);

  const getWeekDates = (date) => {
    const week = [];
    const current = new Date(date);
    current.setDate(current.getDate() - current.getDay());
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

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
      <div className="mt-2 space-y-2">
        {tasksForDate.map(task => (
          <div key={task.id} className="flex justify-between items-center p-2 bg-white rounded-md shadow hover:shadow-md transition-shadow">
            <span className="text-sm">{task.title}</span>
            <Button variant="destructive" size="sm" onClick={() => handleRemoveTask(date.toDateString(), task.id)} className="hover-glow">Remove</Button>
          </div>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full hover-glow">Add Task</Button>
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Weekly View</h1>
      <div className="grid grid-cols-7 gap-4">
        {currentWeek.map((date, index) => (
          <Card key={index} className="overflow-hidden card-hover">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2 text-primary">{date.toLocaleDateString('en-US', { weekday: 'short' })}</h2>
              <p className="text-sm mb-2 text-gray-600">{date.toLocaleDateString()}</p>
              {renderTasksForDate(date)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPage;