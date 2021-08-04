// basic
import React from 'react';
import './App.scss';

// redux
import { useDispatch } from 'react-redux'
import { useTypedSelector, addGuest } from 'store';

type Props = {}

const App: React.FC<Props> = (props) => {

  // selector
  const guests = useTypedSelector(state => state.guests)

  return (
    <div className="App">
      <section className="section-game">
        <form action="">
          <h2>現在のゲスト</h2>
          <div className="guests">
            <ul>
              <li>googleネーム/switchネーム（0）</li>
              <li>googleネーム/switchネーム（0）</li>
              <li>googleネーム/switchネーム（0）</li>
            </ul>
          </div>
          <h2>次回のゲスト</h2>
          <div className="guests">
            <ul>
              <li>googleネーム/switchネーム（1）</li>
              <li>googleネーム/switchネーム（0）</li>
              <li>googleネーム/switchネーム（0）</li>
            </ul>
          </div>
          <h2>次々回のゲスト</h2>
          <div className="guests">
            <ul>
              <li>googleネーム/switchネーム（1）</li>
              <li>googleネーム/switchネーム（0）</li>
              <li>googleネーム/switchネーム（0）</li>
            </ul>
          </div>
        </form>
      </section>
      <section className="section-guest">
        <h2>ゲスト一覧</h2>
        <div className="guests">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>googleネーム</th>
                <th>switchネーム</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr>
                  <td><input type="text" value={`${guest.order}`} /></td>
                  <td><input type="text" value={`${guest.gName}`} /></td>
                  <td><input type="text" value={`${guest.sName}`} /></td>
                  <td><button></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="btn">
          <button>追加</button>
        </div>
      </section>
      <section className="section-setting">
        <h2>設定</h2>
      </section>
    </div>
  );
}

export default App;
