import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TaskForm from '../components/TaskForm';
import { useTasks } from '../integrations/supabase/hooks/useTasks';

const WeeklyPage = () => {
  const [currentWeek, setCurrentWeek] = useState([]);
  const { data: tasks, isLoading, isError } = useTasks();
  const today = new Date();

  useEffect(() => {
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
      <div className="mt-2 space-y-2">
        {tasksForDate.map(task => (
          <div key={task.id} className="flex justify-between items-center p-2 bg-white rounded-md shadow hover:shadow-md transition-shadow">
            <span className="text-sm">{task.description}</span>
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
            <TaskForm onAddTask={(newTask) => console.log(newTask)} initialDate={date} />
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Weekly View</h1>
      <div className="grid grid-cols-7 gap-4">
        {currentWeek.map((date, index) => {
          const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));
          return (
            <Card key={index} className={`overflow-hidden card-hover ${isPastDate ? 'opacity-50' : ''}`}>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-primary">{date.toLocaleDateString('en-US', { weekday: 'short' })}</h2>
                <p className="text-sm mb-2 text-gray-600">{date.toLocaleDateString()}</p>
                {renderTasksForDate(date)}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyPage;