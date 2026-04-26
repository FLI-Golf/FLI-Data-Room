import type { AuthModel } from 'pocketbase';

declare global {
	namespace App {
		interface Locals {
			pb: import('pocketbase').default;
			user: AuthModel | null;
		}
		interface PageData {
			user?: AuthModel | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
