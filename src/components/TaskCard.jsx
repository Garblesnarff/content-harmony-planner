import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TaskCard = ({ task, onUpdateTask, onDeleteTask }) => {
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

  // Log raw date strings
  console.log('Raw due_date:', task.due_date);
  console.log('Raw created_at:', task.created_at);
  console.log('Raw completed_at:', task.completed_at);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg">{task.description}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex space-x-2 mb-2">
          <Badge variant="secondary">{task.content_type}</Badge>
          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
          <Badge variant="outline">{task.status}</Badge>
        </div>
        <p className="text-sm text-gray-600">Due: {task.due_date || 'Not set'}</p>
        <p className="text-sm text-gray-600">Created: {task.created_at || 'Not set'}</p>
        {task.completed_at && (
          <p className="text-sm text-gray-600">Completed: {task.completed_at}</p>
        )}
        <div className="mt-4 space-x-2">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;