import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### agents

| name       | type                     | format  | required |
|------------|--------------------------|---------|----------|
| id         | integer                  | integer | true     |
| name       | text                     | string  | true     |
| role       | text                     | string  | true     |
| model      | text                     | string  | true     |
| api_key    | text                     | string  | true     |
| status     | text                     | string  | false    |
| created_at | timestamp with time zone | string  | false    |
*/

export const useAgent = (id) => useQuery({
    queryKey: ['agents', id],
    queryFn: () => fromSupabase(supabase.from('agents').select('*').eq('id', id).single()),
});

export const useAgents = () => useQuery({
    queryKey: ['agents'],
    queryFn: () => fromSupabase(supabase.from('agents').select('*')),
});

export const useAddAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAgent) => fromSupabase(supabase.from('agents').insert([newAgent])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
    });
};

export const useUpdateAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('agents').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
    });
};

export const useDeleteAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('agents').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
    });
};