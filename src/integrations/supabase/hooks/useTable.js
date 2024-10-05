import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### Table (first table)

| name       | type                     | format  | required |
|------------|--------------------------|---------|----------|
| id         | bigint                   | integer | true     |
| created_at | timestamp with time zone | string  | true     |
*/

export const useTableItem = (id) => useQuery({
    queryKey: ['Table', id],
    queryFn: () => fromSupabase(supabase.from('Table').select('*').eq('id', id).single()),
});

export const useTableItems = () => useQuery({
    queryKey: ['Table'],
    queryFn: () => fromSupabase(supabase.from('Table').select('*')),
});

export const useAddTableItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newItem) => fromSupabase(supabase.from('Table').insert([newItem])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Table'] });
        },
    });
};

export const useUpdateTableItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('Table').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Table'] });
        },
    });
};

export const useDeleteTableItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('Table').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Table'] });
        },
    });
};