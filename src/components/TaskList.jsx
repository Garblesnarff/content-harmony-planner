import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="pt-4">
            <h3 className="font-semibold">{task.description}</h3>
            <div className="flex space-x-2 mt-2">
              <Badge>{task.content_type}</Badge>
              <Badge variant={task.priority === 'high' ? 'destructive' : (task.priority === 'medium' ? 'default' : 'secondary')}>
                {task.priority}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-2">Status: {task.status}</p>
            <p className="text-sm text-gray-600">Due: {new Date(task.due_date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Created: {new Date(task.created_at).toLocaleString()}</p>
            {task.completed_at && (
              <p className="text-sm text-gray-600">Completed: {new Date(task.completed_at).toLocaleString()}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
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