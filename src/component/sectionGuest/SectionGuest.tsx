// basic
import React, { useState } from 'react';
import './SectionGuest.scss';

// redux
import { useDispatch } from 'react-redux'
import { useTypedSelector, addGuest, deleteAllGuests, GuestType } from 'store';

// component
import SectionGuestTd from 'component/sectionGuestTd/SectionGuestTd'

// lib
import _ from 'lodash'

type Props = {}

const SectionGuest: React.FC<Props> = (props) => {

  // dispatch
  const dispatch = useDispatch();

  // selector
  const guests = useTypedSelector(state => state.guests)

  // state
  const [sortBy, setSortBy] = useState<keyof GuestType>('order')
  const [sortDirAsc, setSortDirAsc] = useState<boolean>(true)

  // handle（クリックなど画面操作時の処理）
  // ゲストの追加
  const handleAddGuest = () => {
    dispatch(addGuest())
  }

  // ゲストのクリア
  const handleClearGuest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (window.confirm("ゲストを全て削除します。よろしいですか？")) {
      dispatch(deleteAllGuests())
    }
  }

  // ソート
  const handleClickSort = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, column: keyof GuestType) => {
    e.preventDefault()


    if (sortBy === column) {
      // ソートカラムが、現在と同じだった場合は、ソートディレクションが変わる
      setSortDirAsc(!sortDirAsc)
    } else {
      // ソートカラムが変更だった場合は、ソートカラムを変更しつつ、ディレクションをascにする
      setSortBy(column)
      setSortDirAsc(true)
    }
  }

  // ソートされたguestの取得
  const getGuests = (): GuestType[] => {
    return _.orderBy(guests, [sortBy], sortDirAsc ? 'asc' : 'desc')
  }

  return (
    <section className="section-guest">
      <h2>ゲスト一覧</h2>
      <div className="btn-basic _mt10">
        <ul>
          <li><button onClick={handleAddGuest} ><i className="fas fa-user-plus"></i> ゲストを追加する</button></li>
          <li><button onClick={(e) => { handleClearGuest(e) }} ><i className="fas fa-trash-alt"></i> ゲストをクリアする</button></li>
        </ul>
      </div>
      <div className="guests _mt10">
        <table>
          <thead>
            <tr>
              <th><span onClick={(e) => { handleClickSort(e, 'order') }}>Order</span> {sortBy === 'order' && (sortDirAsc ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>)}</th>
              <th><span onClick={(e) => { handleClickSort(e, 'gName') }}>googleネーム</span> {sortBy === 'gName' && (sortDirAsc ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>)}</th>
              <th><span onClick={(e) => { handleClickSort(e, 'sName') }}>switchネーム</span> {sortBy === 'sName' && (sortDirAsc ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>)}</th>
              <th><span onClick={(e) => { handleClickSort(e, 'entrytimes') }}>参加回数</span> {sortBy === 'entrytimes' && (sortDirAsc ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>)}</th>
              <th><span onClick={(e) => { handleClickSort(e, 'isActive') }}>状態</span> {sortBy === 'isActive' && (sortDirAsc ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>)}</th>
            </tr>
          </thead>
          <tbody>
            {getGuests().map((guest) => (
              <tr key={guest.id} id={`guest${guest.id}`} className={!guest.isActive ? '-disActive' : ''}>
                <SectionGuestTd guestId={guest.id} guestProp='order' />
                <SectionGuestTd guestId={guest.id} guestProp='gName' />
                <SectionGuestTd guestId={guest.id} guestProp='sName' />
                <SectionGuestTd guestId={guest.id} guestProp='entrytimes' />
                <SectionGuestTd guestId={guest.id} guestProp='isActive' />
              </tr>
            ))}
          </tbody>
        </table>
        {(!guests.length) &&
          <div className="noGuest">なし</div>
        }
      </div>
    </section>
  );
}

export default SectionGuest;
