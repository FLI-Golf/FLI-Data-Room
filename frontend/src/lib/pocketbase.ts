import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

// Shared client for use in Svelte components and client-side load functions.
// For server-side hooks/load functions, use locals.pb instead (see hooks.server.ts).
export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
