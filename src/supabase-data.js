import { requireSupabase } from './supabase-client.js';

export async function loadProducts() {
  const client = requireSupabase();
  const { data, error } = await client.from('products').select('*').order('name');
  if (error) throw error;
  return data;
}

export async function loadMyBookings() {
  const client = requireSupabase();
  const { data: userData, error: userError } = await client.auth.getUser();
  if (userError) throw userError;
  if (!userData.user) throw new Error('You must be signed in to view bookings.');

  const { data, error } = await client
    .from('bookings')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('date', { ascending: true });
  if (error) throw error;
  return data;
}

export async function loadMyOrders() {
  const client = requireSupabase();
  const { data: userData, error: userError } = await client.auth.getUser();
  if (userError) throw userError;
  if (!userData.user) throw new Error('You must be signed in to view orders.');

  const { data, error } = await client
    .from('orders')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}
