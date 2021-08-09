// basic
import React from 'react';
import './SectionGuest.scss';

// redux
import { useDispatch } from 'react-redux'
import { useTypedSelector, addGuest } from 'store';

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

  // handle（クリックなど画面操作時の処理）
  // ゲストの追加
  const handleAddGuest = () => {
    dispatch(addGuest());
  }

  return (
    <section className="section-guest">
      <h2>ゲスト一覧</h2>
      <div className="btn-basic _mt10">
        <ul>
          <li><button onClick={handleAddGuest} ><i className="fas fa-user-plus"></i></button></li>
        </ul>
      </div>
      <div className="guests _mt10">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>googleネーム</th>
              <th>switchネーム</th>
              <th>参加回数</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            {_.sortBy(guests, ['order']).map((guest) => (
              <tr key={guest.id} id={`guest${guest.id}`}>
                <SectionGuestTd guestId={guest.id} guestProp='order' />
                <SectionGuestTd guestId={guest.id} guestProp='gName' />
                <SectionGuestTd guestId={guest.id} guestProp='sName' />
                <td>{guest.entrytimes}</td>
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
