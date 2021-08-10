// basic
import React from 'react';
import './SectionGame.scss';

// redux
import { useDispatch } from 'react-redux'
import { useTypedSelector, editGuests, addResult } from 'store';

// lib
import _ from 'lodash'

type Props = {}

const SectionGuest: React.FC<Props> = (props) => {

  // dispatch
  const dispatch = useDispatch();

  // selector（storeStateの取得）
  const guests = useTypedSelector(state => state.guests)
  const results = useTypedSelector(state => state.results)

  // handle（クリックなど画面操作時の処理）
  // 参加者交代
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

  // ゲーム結果追加
  const handleAddResult = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, gameResult: boolean) => {

    e.preventDefault()

    // データ更新
    dispatch(addResult({
      id: 0,
      isVictory: gameResult,
      players: getPlayerAtN(0).map((player) => player.id)
    }));
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
        <h1>{results.length + 1}<small>戦目（2戦交代）</small></h1>
        <div className="result">{results.filter((result) => result.isVictory).length}<small>勝</small>{results.filter((result) => !result.isVictory).length}<small>敗</small>
          {results.length > 0 &&
            <small className="star">（{results.map(
              (result) => result.isVictory ? '●' : '〇'
            )}）</small>
          }
        </div>
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
            <li><button onClick={(e) => { handleAddResult(e, true) }}><i className="fas fa-angle-right"></i>勝利</button></li>
            <li><button onClick={(e) => { handleAddResult(e, false) }}><i className="fas fa-angle-right"></i>敗北</button></li>
            <li><button onClick={(e) => { handleAddPlayerGameCount(e) }}><i className="fas fa-angle-right"></i>参加者交代</button></li>
          </ul>
        </div>
      </form>
    </section>
  );
}

export default SectionGuest;