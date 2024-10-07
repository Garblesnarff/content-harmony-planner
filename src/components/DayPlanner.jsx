import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const DayPlanner = ({ tasks }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const priorityTasks = tasks.filter(task => task.priority === 'high' && task.status === 'pending').slice(0, 3);
  const todoTasks = tasks.filter(task => task.status === 'pending').slice(0, 5);

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    return hour < 12 ? `${hour === 0 ? 12 : hour}:00 AM` : `${hour === 12 ? 12 : hour - 12}:00 PM`;
  });

  const getTasksForTime = (time) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.due_date);
      const taskTime = taskDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
      return taskTime === time;
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-1/3 p-4 border-r">
            <h3 className="font-semibold mb-2">Date</h3>
            <p>{currentDate}</p>
            <h3 className="font-semibold mt-4 mb-2">Priorities</h3>
            <ul className="space-y-1">
              {priorityTasks.map(task => (
                <li key={task.id}>{task.description}</li>
              ))}
            </ul>
            <h3 className="font-semibold mt-4 mb-2">To Do List</h3>
            <ul className="space-y-1">
              {todoTasks.map(task => (
                <li key={task.id} className="flex items-center space-x-2">
                  <Checkbox id={`task-${task.id}`} />
                  <label htmlFor={`task-${task.id}`}>{task.description}</label>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mt-4 mb-2">Notes</h3>
            <div className="h-20 border rounded p-2"></div>
          </div>
          <div className="w-2/3 p-4">
            <h3 className="font-semibold mb-2">Time</h3>
            <div className="space-y-2">
              {timeSlots.map((time, index) => (
                <div key={index} className="flex">
                  <div className="w-1/4 text-sm">{time}</div>
                  <div className="w-3/4 border-b">
                    {getTasksForTime(time).map(task => (
                      <div key={task.id} className="text-sm">{task.description}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DayPlanner;