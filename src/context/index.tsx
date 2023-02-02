/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 存储全局用户信息
 */
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { AuthProvider } from './AuthContext';
import { store } from '@/store';

const AppProviders = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
    </Provider>
);

export { AppProviders };
