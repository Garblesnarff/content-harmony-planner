import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

const TaskCard = ({ task }) => {
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
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return formatInTimeZone(parseISO(dateString), userTimeZone, 'MM/dd/yyyy, h:mm a');
  };

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
        <p className="text-sm text-gray-600">Due: {formatDateTime(task.due_date)}</p>
        <p className="text-sm text-gray-600">Created: {formatDateTime(task.created_at)}</p>
        {task.completed_at && (
          <p className="text-sm text-gray-600">Completed: {formatDateTime(task.completed_at)}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;