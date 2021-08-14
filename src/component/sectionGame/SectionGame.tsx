// basic
import React, { useState } from 'react';
import './SectionGame.scss';

// redux
import { useDispatch } from 'react-redux'
import { useTypedSelector, editGuests, addResult, deleteLastResult, deleteAllResults } from 'store';

// lib
import _ from 'lodash'

type Props = {}

const SectionGuest: React.FC<Props> = (props) => {

  // dispatch
  const dispatch = useDispatch();

  // selector（storeStateの取得）
  const guests = useTypedSelector(state => state.guests)
  const results = useTypedSelector(state => state.results)

  // state
  const [playerCount, setPlayerCount] = useState<number>(3)

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

  // ゲーム結果最後のひとつを削除
  const handleClearLastResult = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()
    dispatch(deleteLastResult())
  }

  // ゲーム結果クリア
  const handleClearAllResults = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()

    if (window.confirm("勝敗記録を全て削除します。よろしいですか？")) {
      dispatch(deleteAllResults())
    }
  }

  // n回目の参加者を取得する
  const getPlayerAtN = (n: number) => {

    // 状態がactiveの人のみ取得
    let allPlayers = _.filter(guests, (guest) => guest.isActive)

    // 参加回数、優先順位で並び替え
    allPlayers = _.sortBy(allPlayers, ['entrytimes', 'order'])

    // n回目の参加者を取得
    let players = _.slice(allPlayers, 0 + playerCount * n, playerCount + playerCount * n)

    return players
  }

  // 
  const handleChangePlayerCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    if (isNaN(v)) {
      alert('数値を入力してください')
      return false
    }
    setPlayerCount(v)
  }

  return (
    <section className="section-game">
      <form action="">
        <div className="topTtl"><span>参加型配信</span> <span>参加者管理ツール</span></div>
        <h1>{results.length + 1}<small>戦目（ </small><input type="text" defaultValue="2" /><small>戦交代）</small></h1>
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
            <li><button onClick={(e) => { handleClearLastResult(e) }}><i className="fas fa-trash-alt"></i>勝敗記録を一つ削除する</button></li>
            <li><button onClick={(e) => { handleClearAllResults(e) }}><i className="fas fa-trash-alt"></i>勝敗記録をクリアする</button></li>
          </ul>
        </div>
        <div className="playerCount"><span>参加者人数：</span><input type="text" value={playerCount} onChange={(e) => handleChangePlayerCount(e)} /><span>人</span></div>
      </form>
    </section>
  );
}

export default SectionGuest;
