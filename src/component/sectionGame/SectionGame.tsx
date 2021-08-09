// basic
import React from 'react';
import './SectionGame.scss';

// redux
import { useDispatch } from 'react-redux'
import { useTypedSelector, editGuests } from 'store';

// lib
import _ from 'lodash'

type Props = {}

const SectionGuest: React.FC<Props> = (props) => {

  // dispatch
  const dispatch = useDispatch();

  // selector
  const guests = useTypedSelector(state => state.guests)

  // handle（クリックなど画面操作時の処理）
  const handleAddPlayerGameCount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()

    let players = _.cloneDeep(getPlayerAtN(0))
    players = players.map((player) => {
      player.entrytimes += 1
      return player
    })

    // データ更新
    dispatch(editGuests(players));
  }

  // n回目の参加者を取得する
  const getPlayerAtN = (n: number) => {

    // 状態がactiveの人のみ取得
    let allPlayers = _.filter(guests, (guest) => guest.isActive)

    // 参加回数、優先順位で並び替え
    allPlayers = _.sortBy(allPlayers, ['entrytimes', 'order'])

    // n回目の参加者を取得
    let players = _.slice(allPlayers, 0 + 3 * n, 3 + 3 * n)

    return players
  }

  return (
    <section className="section-game">
      <form action="">
        <h2>参加中のゲスト</h2>
        <div className="guests">
          <ul>
            {getPlayerAtN(0).map((player) => (
              <li key={player.id}>{player.gName} / {player.sName}（{player.entrytimes}）</li>
            ))}
          </ul>
        </div>
        <h2>次回参加予定のゲスト</h2>
        <div className="guests">
          <ul>
            {getPlayerAtN(1).map((player) => (
              <li key={player.id}>{player.gName} / {player.sName}（{player.entrytimes}）</li>
            ))}
          </ul>
        </div>
        <h2>次々回参加予定のゲスト</h2>
        <div className="guests">
          <ul>
            {getPlayerAtN(2).map((player) => (
              <li key={player.id}>{player.gName} / {player.sName}（{player.entrytimes}）</li>
            ))}
          </ul>
        </div>
        <div className="btn-basic _mt10">
          <ul>
            <li><button className="-w100p" onClick={(e) => { handleAddPlayerGameCount(e) }}><i className="fas fa-angle-right"></i>参加中のゲストのゲーム回数を＋１する</button></li>
          </ul>
        </div>
      </form>
    </section>
  );
}

export default SectionGuest;
