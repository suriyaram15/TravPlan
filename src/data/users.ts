
import { User } from '../types';

// Mock user data
export const users: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

// Get current user (simulated)
export const getCurrentUser = () => users[0];

// Get user by ID
export const getUserById = (id: string) => 
  users.find(user => user.id === id);
