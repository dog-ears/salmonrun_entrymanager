import { createSlice, configureStore } from '@reduxjs/toolkit';
import { createSelectorHook } from 'react-redux';

// guestの型定義
type GuestType = {
  id: number,
  gName: string,
  sName: string,
  order: number,
  isActive: boolean,
}

// stateの型定義
type StateType = {
  guests: GuestType[],
};

// 初期状態。
const initialState: StateType = {
  guests: [
    {
      id: 1,
      gName: 'googleねーむ1',
      sName: 'switchねーむ1',
      order: 1,
      isActive: true,
    },
    {
      id: 2,
      gName: 'googleねーむ2',
      sName: 'switchねーむ2',
      order: 2,
      isActive: true,
    },
    {
      id: 3,
      gName: 'googleねーむ3',
      sName: 'switchねーむ3',
      order: 3,
      isActive: true,
    },
  ],
};

interface PayloadAction<T, P> {
  type: T;
  payload: P;
}

// createSliceでreducerとactionを同時に定義
const slice = createSlice({
  name: 'rootState',
  initialState,
  reducers: {
    addGuest: (state, action: PayloadAction<string, GuestType>) => ({
      ...state,
    }),
  },
})

// action（各コンポーネントから、dispatchで呼ばれる）
export const { addGuest, } = slice.actions;

// storeの生成
export const store = configureStore({
  reducer: slice.reducer,
});

// 型情報付きのuseTypedSelectorエクスポート
export const useTypedSelector = createSelectorHook<StateType>();
