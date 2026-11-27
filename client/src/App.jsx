import GroupSetup from './components/GroupSetup'
import { useState } from 'react';
import PlanTab from './components/PlanTab';
import WalletTab from './components/WalletTab';
// import ArchiveTab from './components/ArchiveTab';
// import WalletTab from './components/WalletTab';
import './App.css';

function App() {
  const [groupCode, setGroupCode] = useState('');
  const [groupName, setGroupName] = useState('Lovely Couple')
  const [activeTab, setActiveTab] = useState('Plan')

  function handleGroupReady({ code, name }) {
    setGroupCode(code);
    if (name) {
      setGroupName(name);
    }
  }
  if (!groupCode) {
    return <GroupSetup onGroupReady={handleGroupReady} />
  }
  return (

    <main>
      <header>
        <div className='logo-area'>
          <h1>DuoPick</h1>
          <p>Decide together. Remember it. Spend Wisely.</p>
        </div>

        <div className='group-area'>
          <h3>{groupName}</h3>
          <button type='button' onClick={() => setGroupCode('')}>⇄ Switch group</button>
        </div>

        <div className='profile-area'>
          <div>Y</div>
          <p>You(You)</p>
        </div>

        <div
          className='budget-area'
          onClick={() => setActiveTab('Wallet')}
        >
          <h3>Set budget</h3>
          <p>Open Wallet</p>
        </div>

        <div className='tabs-area'>
          <button type='button' onClick={() => { setActiveTab('Plan') }}>Plan</button>
          <button type='button' onClick={() => { setActiveTab('Archive') }}>Archive</button>
          <button type='button' onClick={() => { setActiveTab('Wallet') }}>Wallet</button>
        </div>
      </header>


      <div className='vote-description-area'>
        <div>
          <p>1 . Add</p>
          <p>an idea</p>
        </div>
        <div>
          <p>2 . Vote</p>
          <p>👍 or 👎 + comment</p>
        </div>
        <div>
          <p>3 . Go</p>
          <p>then archive it</p>
        </div>
      </div>

      {/* <div className='vote-notice-area'>
    <h3>1 idea need your vote</h3>
    <button>Vote now</button>
</div> */}

      {/* <div className='decide-for-us-area'>
    <button>Decide for us</button>
</div> */}

      {activeTab === 'Plan' && <PlanTab code={groupCode} />}
      {activeTab === 'Wallet' && <WalletTab code={groupCode} />}
      {/* {activeTab === 'Archive' && <ArchiveTab code={code}/>}
      {activeTab === 'plan' && <WalletTab code={code}/>} */}

    </main >
  )
}

export default App