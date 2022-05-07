import AsyncStorage from '@react-native-async-storage/async-storage';
import decode, { JwtPayload } from 'jwt-decode';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { SearchPhotoResult } from '../api/search';
import { im } from '../middleware/immerMiddleware';

if (typeof Window !== 'undefined' && Window.__REDUX_DEVTOOLS_EXTENSION__) {
  Window.__REDUX_DEVTOOLS_EXTENSION__;
}

export const decodeToken = (token: string): TokenParams => {
  const decoded = decode<TokenParams>(token);

  const merged = Object.assign(initialValues, decoded);

  return merged;
};

export interface QueryProps {
  query: string;
  pageNumber: number;
  perPage: number;
}

interface TokenParams extends JwtPayload {
  id: string;
  mobile: string;
  verifiedMobile: boolean;
  newUser: boolean;
  exp: number;
  scope: string[];
}

const initialValues = {
  id: '',
  email: '',
  mobile: '',
  verifiedMobile: false,
  newUser: true,
  exp: 0,
};

export type Permissions = 'undefined' | 'authorized' | 'denied';

interface TypedValues {
  email?: string;
  mobile?: string;
  code?: string;
}

export interface UserStore {
  listItems: SearchPhotoResult[];
  searchProps: QueryProps;
  feedProps: QueryProps;
  hasHydrated: boolean;
  loading: boolean;
  isDark: boolean;
  signedIn: boolean;
  typedValues: TypedValues;
  permissions: Permissions;
  setListItems: (feedItems: SearchPhotoResult[]) => void;
  setSearchProps: (searchProps: QueryProps) => void;
  setFeedProps: (feedProps: QueryProps) => void;
  setTypedValues: (typed: TypedValues) => void;
  setDarkMode: (dark: boolean) => void;
  setLoading: (loading: boolean) => void;
  setPermissions: (permissions: Permissions) => void;
  setSignedIn: (success: boolean) => void;
}

export const useStore = create<UserStore>(
  persist(
    im(set => ({
      listItems: [],
      searchProps: { query: '', pageNumber: 0, perPage: 0 },
      feedProps: { query: '', pageNumber: 0, perPage: 0 },
      hasHydrated: false,
      isDark: false,
      loading: true,
      permissions: 'undefined',
      signedIn: false,
      typedValues: {},
      setListItems: (listItems: SearchPhotoResult[]) => set({ listItems }),
      setSearchProps: (searchProps: QueryProps) => set({ searchProps }),
      setFeedProps: (feedProps: QueryProps) => set({ feedProps }),
      setDarkMode: (dark: boolean) => set({ isDark: dark }),
      setLoading: (loading: boolean) => set({ loading }),
      setPermissions: (permissions: Permissions) => set({ permissions }),
      setTypedValues: (typed: TypedValues) => {
        set(draft => {
          Object.assign(draft.typedValues, typed);
        });
      },
      setSignedIn: (success: boolean) => set({ signedIn: success }),
    })),
    {
      name: 'app_travelers_store',
      getStorage: () => AsyncStorage,
      partialize: state => ({
        listItems: state.listItems,
        searchProps: state.searchProps,
        signedIn: state.signedIn,
        permissions: state.permissions,
      }),
      onRehydrateStorage: () => () => {
        useStore.setState({ hasHydrated: true });
      },
    },
  ),
);
