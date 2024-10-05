// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';

// Import hooks
import {
  useTask,
  useTasks,
  useAddTask,
  useUpdateTask,
  useDeleteTask
} from './hooks/useTasks';

import {
  useSetting,
  useSettings,
  useAddSetting,
  useUpdateSetting,
  useDeleteSetting
} from './hooks/useSettings';

import {
  useAgent,
  useAgents,
  useAddAgent,
  useUpdateAgent,
  useDeleteAgent
} from './hooks/useAgents';

import {
  useLog,
  useLogs,
  useAddLog,
  useUpdateLog,
  useDeleteLog
} from './hooks/useLogs';

import {
  useTableItem,
  useTableItems,
  useAddTableItem,
  useUpdateTableItem,
  useDeleteTableItem
} from './hooks/useTable';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useTask,
  useTasks,
  useAddTask,
  useUpdateTask,
  useDeleteTask,
  useSetting,
  useSettings,
  useAddSetting,
  useUpdateSetting,
  useDeleteSetting,
  useAgent,
  useAgents,
  useAddAgent,
  useUpdateAgent,
  useDeleteAgent,
  useLog,
  useLogs,
  useAddLog,
  useUpdateLog,
  useDeleteLog,
  useTableItem,
  useTableItems,
  useAddTableItem,
  useUpdateTableItem,
  useDeleteTableItem
};