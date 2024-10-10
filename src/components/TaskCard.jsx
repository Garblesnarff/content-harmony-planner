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

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    if (date < now) {
      return null; // Return null for past dates
    }
    return date.toLocaleString();
  };

  const formattedDueDate = formatDateTime(task.due_date);

  // Don't render the card if the due date is in the past
  if (!formattedDueDate) {
    return null;
  }

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
        <p className="text-sm text-gray-600">Due: {formattedDueDate}</p>
        {task.completed_at && (
          <p className="text-sm text-gray-600">Completed: {formatDateTime(task.completed_at)}</p>
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