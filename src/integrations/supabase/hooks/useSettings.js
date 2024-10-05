import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### settings

| name     | type    | format  | required |
|----------|---------|---------|----------|
| id       | integer | integer | true     |
| api_keys | text    | string  | false    |
*/

export const useSetting = (id) => useQuery({
    queryKey: ['settings', id],
    queryFn: () => fromSupabase(supabase.from('settings').select('*').eq('id', id).single()),
});

export const useSettings = () => useQuery({
    queryKey: ['settings'],
    queryFn: () => fromSupabase(supabase.from('settings').select('*')),
});

export const useAddSetting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSetting) => fromSupabase(supabase.from('settings').insert([newSetting])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings'] });
        },
    });
};

export const useUpdateSetting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('settings').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings'] });
        },
    });
};

export const useDeleteSetting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('settings').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings'] });
        },
    });
};