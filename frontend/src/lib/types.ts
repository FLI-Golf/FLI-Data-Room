export type Role = 'admin' | 'basic' | 'advanced';

export interface User {
	id: string;
	email: string;
	name: string;
	role: Role;
	ndaAccepted: boolean;
	ndaAcceptedAt: string | null;
	verified: boolean;
}

export interface Document {
	id: string;
	title: string;
	description: string;
	file: string;
	requiredRole: Role;
	created: string;
	updated: string;
}
