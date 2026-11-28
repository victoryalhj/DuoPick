import GroupSetup from './components/GroupSetup'
import { useState } from 'react';
import PlanTab from './components/PlanTab';
import WalletTab from './components/WalletTab';
import ArchiveTab from './components/ArchiveTab';
import './App.css';

function App() {
  const [groupCode, setGroupCode] = useState('');
  const [groupName, setGroupName] = useState('')
  const [activeTab, setActiveTab] = useState('Plan')
  const [groupMembers, setGroupMembers] = useState([])
  const [currentUser, setCurrentUser] = useState('')

  const [plans, setPlans] = useState([]);
  const [archivePlans, setArchivePlans] = useState([]);

  function handleGroupReady(groupData) {
    if (!groupData) return;

    const code = groupData.code || groupData.groupCode || '';
    const name = groupData.name || groupData.groupName || '';
    const rawMember = groupData.groupMembers ?? groupData.members ?? [];

    setGroupCode(code);
    if (name) {
      setGroupName(name);
    }
    if (Array.isArray(rawMember) && rawMember.length > 0) {
      setGroupMembers(rawMember);
      setCurrentUser(rawMember[0])
    }
  }

  if (!groupCode) {
    return <GroupSetup onGroupReady={handleGroupReady} />
  }

  //Find the plan card that matches planId
  function handleArchivePlan (planId, archiveData) {
    const targetPlan = plans.find((plan) => plan.id === planId);

    if (!targetPlan) return;

    const completedPlan = {
      ...targetPlan,
      ...archiveData,
    }
    //Keep existing archived plans and append the selected plan
    //Renew setPlans with which is not same planId
    setArchivePlans((prev) => [...prev, completedPlan]);
    setPlans((prev) => prev.filter((plan) => plan.id !== planId));
    setActiveTab('Archive');
  }

  function handleRemoveArchivedPlan (planId) {
    setArchivePlans((prevArchivedPlan) => prevArchivedPlan.filter((plan) => plan.id !== planId))
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
          {groupMembers.map((member) => {
            const isCurrent = member === currentUser;
            return (
              <div
                key={member}
                onClick={() => setCurrentUser(member)}
                className={`user ${isCurrent? 'active' : ''}`}
              >
                <span>{member[0]?.toUpperCase()}</span>
                <p>{isCurrent ? `${member}(you)` : member}</p>
              </div>
              

            )
          })}
        </div>

        <div
          className='budget-area'
          onClick={() => setActiveTab('Wallet')}
        >
          <h3>Set budget</h3>
          <p>Open Wallet</p>
        </div>

        <div className='tabs-area'>
          <button 
            type='button' 
            onClick={() => { setActiveTab('Plan')}}
            className={`tab-btn ${activeTab === 'Plan' ? 'active' : ''}`}
           >Plan</button>
          <button 
            type='button' 
            onClick={() => { setActiveTab('Archive') }}
            className={`tab-btn ${activeTab === 'Archive' ? 'active' : ''}`}
          >Archive</button>
          <button 
            type='button' 
            onClick={() => { setActiveTab('Wallet') }}
            className={`tab-btn ${activeTab === 'Wallet' ? 'active' : ''}`}
          >Wallet</button>
        </div>
      </header>

{/* 
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
      </div> */}

      {/* <div className='vote-notice-area'>
        <h3>1 idea need your vote</h3>
        <button>Vote now</button>
      </div>

      <div className='decide-for-us-area'>
        <button>Decide for us</button>
      </div> */}

  { activeTab === 'Plan' && <PlanTab 
    code={groupCode} 
    groupMembers={groupMembers} 
    currentUser={currentUser} 
    plans={plans} 
    setPlans={setPlans} 
    handleArchivePlan={handleArchivePlan}/> }

  { activeTab === 'Wallet' && <WalletTab code={groupCode} /> }

  { activeTab === 'Archive' && <ArchiveTab 
    archivePlans={archivePlans}
    code={groupCode}
    handleRemoveArchivedPlan={handleRemoveArchivedPlan}
  />}


    </main >
  )
}

export default App