import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

export const useTask = (id) => useQuery({
    queryKey: ['tasks', id],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*').eq('id', id).single()),
});

export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
        const data = await fromSupabase(supabase.from('tasks').select('*'));
        console.log('Raw tasks data from server:', data);
        data.forEach(task => {
            console.log(`Task ${task.id}:`);
            console.log('  description:', task.description);
            console.log('  due_date:', task.due_date);
            console.log('  created_at:', task.created_at);
            console.log('  completed_at:', task.completed_at);
        });
        return data;
    },
});

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTask) => {
            console.log('Adding new task:', newTask);
            // Format the due_date to ISO string before sending to Supabase
            const formattedTask = {
                ...newTask,
                due_date: new Date(newTask.due_date).toISOString(),
            };
            console.log('Formatted task being sent:', formattedTask);
            const result = await fromSupabase(supabase.from('tasks').insert([formattedTask]));
            console.log('Result of adding task:', result);
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('tasks').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('tasks').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};