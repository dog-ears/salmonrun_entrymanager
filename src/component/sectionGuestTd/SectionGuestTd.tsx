// basic
import React, { useState, useRef, useEffect } from 'react'
import './SectionGuestTd.scss'

// redux
import { useDispatch } from 'react-redux'
import { useTypedSelector, GuestType, editGuest } from 'store'

// lib
import _ from 'lodash'

type Props = {
  guestId: number,
  guestProp: keyof GuestType, // <- GuestTypeのキーの文字列のみ許可
}

const SectionGuestTd: React.FC<Props> = (props) => {

  // dispatch
  const dispatch = useDispatch();

  // selector
  const guests = useTypedSelector(state => state.guests)

  // ref
  const inputEl = useRef<HTMLInputElement>(null);

  // state
  const [isEditing, setIsEditing] = useState(false);

  // props、およびguest 変更時の処理
  useEffect(() => {

    if (inputEl.current?.value) {
      inputEl.current.value = String(guests[props.guestId - 1][props.guestProp])
    }
  }, [guests, props.guestId, props.guestProp]);

  // handle（クリックなど画面操作時の処理）
  // 編集開始
  const handleStartEdit = (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {

    // input 表示
    setIsEditing(true)
    inputEl.current?.focus()
  }

  // 編集完了
  const handleEndEdit = (e: React.FocusEvent<HTMLInputElement>) => {

    let newData = e.currentTarget.value

    // orderのときはバリデーションを行う
    if (props.guestProp === 'order') {

      // 入力が数値以外だったら、エラーを出して、古いデータを入れる
      if (!Number.isInteger(Number(newData))) {
        alert('Orderに数値以外が入力されました')

        // 古いデータに差し替え
        e.currentTarget.value = String(guests[props.guestId - 1].order)

        // inputを隠す
        setIsEditing(false)

        return false
      }
    }

    // 入力前と値が違っていたら、更新する。
    if (newData !== guests[props.guestId - 1][props.guestProp]) {

      // 更新するguestデータをディープコピー
      let newGuest = _.cloneDeep(guests[props.guestId - 1])

      // 入力されたデータを格納
      if (props.guestProp === 'order') {
        newGuest.order = Number(newData)
      } else if (props.guestProp === 'gName' || props.guestProp === 'sName') {
        newGuest[props.guestProp] = newData
      }
      // データ更新
      dispatch(editGuest(newGuest));
    }

    // inputを隠す
    setIsEditing(false)
  }

  // ゲストをアクティブ / 休眠状態に変更
  const handleChangeGuestState = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newState: boolean) => {
    let newGuest = _.cloneDeep(guests[props.guestId - 1])
    newGuest.isActive = newState

    // データ更新
    dispatch(editGuest(newGuest));
  }

  if (props.guestProp === 'order' || props.guestProp === 'gName' || props.guestProp === 'sName') {
    return (
      <td
        className={`sectionGuestTd${isEditing ? ' -editting' : ''}`}
        onClick={(e) => { handleStartEdit(e) }}
      >
        {guests[props.guestId - 1][props.guestProp]}
        <span><input type="text"
          ref={inputEl}
          defaultValue={String(guests[props.guestId - 1][props.guestProp])}
          onBlur={(e) => { handleEndEdit(e) }}
        /></span>
      </td>
    )
  } else {
    return (
      <td>
        <div className="btn-basic">
          <ul>
            {guests[props.guestId - 1].isActive ?
              <li><button className="-narrow" onClick={(e) => { handleChangeGuestState(e, false) }}><i className="fas fa-eye"></i></button></li>
              :
              <li><button className="-narrow" onClick={(e) => { handleChangeGuestState(e, true) }}><i className="fas fa-eye-slash"></i></button></li>
            }

          </ul>
        </div>
      </td >
    )
  }
}

export default SectionGuestTd;
