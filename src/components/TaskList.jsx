import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MM/dd/yyyy, h:mm a');
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg">{task.description}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex space-x-2 mb-2">
              <Badge variant="secondary">{task.content_type}</Badge>
              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
              <Badge variant="outline">{task.status}</Badge>
            </div>
            <p className="text-sm text-gray-600">Due: {formatDate(task.due_date)}</p>
            <p className="text-sm text-gray-600">Created: {formatDate(task.created_at)}</p>
            {task.completed_at && (
              <p className="text-sm text-gray-600">Completed: {formatDate(task.completed_at)}</p>
            )}
          </CardContent>
          <CardFooter className="bg-gray-50 justify-between">
            <Button 
              variant="outline" 
              onClick={() => onUpdateTask({ ...task, status: task.status === 'completed' ? 'pending' : 'completed' })}
            >
              {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;