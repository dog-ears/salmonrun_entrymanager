// basic
import React from 'react'
import './App.scss'

// redux
// import { useTypedSelector } from 'store'

// component
import SectionGame from 'component/sectionGame/SectionGame'
import SectionGuest from 'component/sectionGuest/SectionGuest'

type Props = {}

const App: React.FC<Props> = (props) => {

  // selector
  // const guests = useTypedSelector(state => state.guests)

  return (
    <div className="App">
      <SectionGame />
      <SectionGuest />
      {/* <section className="section-setting">
        <h2>設定</h2>
      </section> */}
    </div>
  );
}

export default App;
