/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 存储全局用户信息
 */
import { ReactNode } from 'react';

import { AuthProvider } from './AuthContext';

const AppProviders = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
);

export { AppProviders };
