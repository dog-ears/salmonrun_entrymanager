import { createSlice, configureStore } from '@reduxjs/toolkit';
import { createSelectorHook } from 'react-redux';
import _ from 'lodash';

// guestの型定義
export type GuestType = {
  id: number,
  order: number,
  gName: string,
  sName: string,
  entrytimes: number,
  isActive: boolean,
}

// resultの型定義
export type ResultType = {
  id: number,
  isVictory: boolean,
  players: Number[],
}

// stateの型定義
type StateType = {
  guests: GuestType[],
  results: ResultType[],
};

// ローカルストレージからの読み込み
const loadState = (): StateType => {
  const jsonStr: string | null = localStorage.getItem('salmon-entrymanager');
  if (!jsonStr) {
    return {
      guests: [],
      results: [],
    }
  }
  const loadedState: StateType = Object.assign({
    guests: [],
    results: [],
  }, JSON.parse(jsonStr))
  return loadedState
}

// ローカルストレージに保存
const saveState = (state: StateType) => {
  const jsonStr: string = JSON.stringify(state);
  localStorage.setItem('salmon-entrymanager', jsonStr);
}

// 初期状態。
const initialState: StateType = loadState();

interface PayloadOptionAction<T, P> {
  type: T;
  payload?: P;
}
interface PayloadAction<T, P> {
  type: T;
  payload: P;
}

// createSliceでreducerとactionを同時に定義
const slice = createSlice({
  name: 'rootState',
  initialState,
  reducers: {

    // ゲスト追加
    addGuest: (state, action: PayloadOptionAction<string, GuestType>) => {
      const result = {
        ...state,
        guests: state.guests.concat(action.payload ? action.payload : {
          id: state.guests.length + 1,
          order: state.guests.length + 1,
          gName: '-',
          sName: '-',
          entrytimes: 0,
          isActive: true,
        })
      }
      saveState(result)
      return result
    },

    // ゲスト更新
    editGuest: (state, action: PayloadAction<string, GuestType>) => {

      // 新しいguestデータの格納
      let newGuestData = action.payload

      // 古いguestデータの格納
      let oldGuestData = state.guests.filter((guest) =>
        guest.id === newGuestData.id
      )[0]

      // 更新用のguestsデータコピー
      let newGuests = _.cloneDeep(state.guests)

      // orderが変わっている場合は、追加で処理が必要
      if (oldGuestData.order !== newGuestData.order) {

        // orderが1未満だったら、1に変更
        if (newGuestData.order < 1) {
          newGuestData.order = 1
        }

        // orderがguestsの要素数より多かったら、要素数に変更
        if (state.guests.length < newGuestData.order) {
          newGuestData.order = state.guests.length
        }

        // orderが増えるか減るかの分岐
        if (oldGuestData.order < newGuestData.order) { // 増える場合の処理
          newGuests.map((guest) => {

            // 各guestのorderの値が、変更前より大きくかつ変更後以下なら、orderを-1する。
            if (oldGuestData.order < guest.order && guest.order <= newGuestData.order) {
              guest.order -= 1
            }
            return guest
          })
        } else if (newGuestData.order < oldGuestData.order) {  // 減る場合の処理
          newGuests.map((guest) => {

            // 各guestのorderの値が、変更後以上でかつ変更前未満なら、orderを+1する
            if (newGuestData.order <= guest.order && guest.order < oldGuestData.order) {
              guest.order += 1
            }
            return guest
          })
        }
      }

      // 新しいゲストデータに差し替える
      newGuests = newGuests.map((guest) =>
        guest.id === newGuestData.id ? newGuestData : guest
      )

      const result = {
        ...state,
        guests: newGuests
      }
      saveState(result)
      return result
    },

    // ゲスト更新（複数）
    editGuests: (state, action: PayloadAction<string, GuestType[]>) => {

      // 更新用guestデータ（差分）の配列
      let newGuestsDiff = action.payload

      // 更新用のguestsデータ（全部）のディープコピー作成
      let newGuestsAll = _.cloneDeep(state.guests)

      // 更新用guestデータ（差分）ひとつひとつに処理を行う
      newGuestsDiff.map((newGuestData) => {

        // 古いguestデータの格納
        let oldGuestData = state.guests.filter((guest) =>
          guest.id === newGuestData.id
        )[0]

        // orderが変わっている場合は、追加で処理が必要
        if (oldGuestData.order !== newGuestData.order) {

          // orderが1未満だったら、1に変更
          if (newGuestData.order < 1) {
            newGuestData.order = 1
          }

          // orderがguestsの要素数より多かったら、要素数に変更
          if (state.guests.length < newGuestData.order) {
            newGuestData.order = state.guests.length
          }

          // orderが増えるか減るかの分岐
          if (oldGuestData.order < newGuestData.order) { // 増える場合の処理
            newGuestsAll = newGuestsAll.map((guest) => {

              // 各guestのorderの値が、変更前より大きくかつ変更後以下なら、orderを-1する。
              if (oldGuestData.order < guest.order && guest.order <= newGuestData.order) {
                guest.order -= 1
              }
              return guest
            })
          } else if (newGuestData.order < oldGuestData.order) {  // 減る場合の処理
            newGuestsAll = newGuestsAll.map((guest) => {

              // 各guestのorderの値が、変更後以上でかつ変更前未満なら、orderを+1する
              if (newGuestData.order <= guest.order && guest.order < oldGuestData.order) {
                guest.order += 1
              }
              return guest
            })
          }
        }

        // 新しいゲストデータに差し替える
        newGuestsAll = newGuestsAll.map((guest) =>
          guest.id === newGuestData.id ? newGuestData : guest
        )

        return newGuestData
      })

      const result = {
        ...state,
        guests: newGuestsAll
      }
      saveState(result)
      return result
    },

    // ゲスト全削除
    deleteAllGuests: (state) => {

      const result = {
        ...state,
        guests: []
      }
      saveState(result)
      return result
    },

    // リザルト格納
    addResult: (state, action: PayloadAction<string, ResultType>) => {
      const result = {
        ...state,
        results: state.results.concat([{
          ...action.payload,
          id: state.results.length + 1
        }])
      }
      saveState(result)
      return result
    },
  },
})

// action（各コンポーネントから、dispatchで呼ばれる）
export const { addGuest, editGuest, editGuests, deleteAllGuests, addResult, } = slice.actions;

// storeの生成
export const store = configureStore({
  reducer: slice.reducer,
});

// 型情報付きのuseTypedSelectorエクスポート
export const useTypedSelector = createSelectorHook<StateType>();
