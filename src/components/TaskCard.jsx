import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

const TaskCard = ({ task, onUpdateTask, onDeleteTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Use the user's timezone to format the date
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return formatInTimeZone(new Date(dateString), userTimeZone, 'MMM dd, yyyy h:mm a');
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-sm">{task.description}</h4>
          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
        </div>
        <div className="flex items-center text-gray-500 text-xs space-x-2">
          <Badge variant="outline">{task.content_type}</Badge>
          {task.due_date && (
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(task.due_date)}</span>
            </div>
          )}
        </div>
        <Button 
          variant="destructive" 
          size="sm"
          className="mt-2"
          onClick={() => onDeleteTask && onDeleteTask(task.id)}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;