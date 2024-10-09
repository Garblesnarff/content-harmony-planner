import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { format, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const TaskForm = ({ onAddTask, initialDate }) => {
  const form = useForm({
    defaultValues: {
      description: '',
      content_type: '',
      priority: '',
      due_date: initialDate ? new Date(initialDate) : new Date(),
      due_time: '12:00',
    },
  });

  const onSubmit = (data) => {
    const [hours, minutes] = data.due_time.split(':');
    
    // Create a new Date object from the selected date
    const combinedDateTime = new Date(data.due_date);
    
    // Set the time on the combined date
    combinedDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    // Ensure the due date is not in the past
    const now = new Date();
    if (combinedDateTime < now) {
      form.setError('due_date', { type: 'manual', message: 'Due date cannot be in the past' });
      return;
    }

    // Use a try-catch block to handle potential invalid date errors
    try {
      // Convert the local date to UTC while preserving the intended time
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const utcDate = zonedTimeToUtc(combinedDateTime, userTimeZone);
      const isoString = utcDate.toISOString();

      onAddTask({
        description: data.description,
        content_type: data.content_type,
        priority: data.priority,
        due_date: isoString,
        status: 'pending',
      });
      form.reset();
    } catch (error) {
      console.error('Error creating date:', error);
      form.setError('due_date', { type: 'manual', message: 'Invalid date/time combination' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter task description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <DatePicker
                date={field.value}
                onDateChange={field.onChange}
                disabled={(date) => date < new Date()}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="due_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Task</Button>
      </form>
    </Form>
  );
};

export default TaskForm;