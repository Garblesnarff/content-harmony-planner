import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### logs

| name         | type                     | format  | required |
|--------------|--------------------------|---------|----------|
| id           | integer                  | integer | true     |
| task_id      | integer                  | integer | false    |
| log_message  | text                     | string  | true     |
| log_level    | text                     | string  | false    |
| created_at   | timestamp with time zone | string  | false    |

Foreign Key Relationships:
- task_id references tasks.id
*/

export const useLog = (id) => useQuery({
    queryKey: ['logs', id],
    queryFn: () => fromSupabase(supabase.from('logs').select('*').eq('id', id).single()),
});

export const useLogs = () => useQuery({
    queryKey: ['logs'],
    queryFn: () => fromSupabase(supabase.from('logs').select('*')),
});

export const useAddLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newLog) => fromSupabase(supabase.from('logs').insert([newLog])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['logs'] });
        },
    });
};

export const useUpdateLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('logs').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['logs'] });
        },
    });
};

export const useDeleteLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('logs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['logs'] });
        },
    });
};