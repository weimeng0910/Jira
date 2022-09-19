import { ReactNode } from 'react';

import { AuthProvider } from './AuthContext';

const AppProviders = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
);

export { AppProviders };
