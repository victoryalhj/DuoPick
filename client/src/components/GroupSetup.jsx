import { useState } from 'react'
import './GroupSetup.css'


function GroupSetup() {
    const [groupName, setGroupName] = useState('')
    const [members, setMembers] = useState('')
    const [inviteCode, setInviteCode] = useState('')

    function handleCreateGroup(event) {
        event.preventDefault()

        console.log('Group name:', groupName)
        console.log('Members:', members)
    }

    function handleJoinGroup(event) {
        event.preventDefault()

        if (inviteCode.trim().length !== 6) {
            alert('Invitation code must be exactly 6 characters')
            return
        }

        console.log('Joining group with code:', inviteCode)
    }

    return (
        <div className="group-setup">
            <h1>DuoPick ✨</h1>
            <p>Decide together. Remember it. Spend wisely.</p>
            <section className="group-card">
                <h2>Create a new group</h2>

                <form onSubmit={handleCreateGroup}>
                    <label htmlFor="groupName">Group name</label>
                    <input
                        type="text"
                        id="groupName"
                        placeholder="Enter your group name"
                        value={groupName}
                        onChange={(event) => setGroupName(event.target.value)}
                        required
                    />

                    <label htmlFor="members">Group members</label>
                    <input
                        type="text"
                        id="members"
                        placeholder="You, friends"
                        value={members}
                        onChange={(event) => setMembers(event.target.value)}
                        required
                    />

                    <button type="submit">Create Group</button>
                </form>
            </section>
            <section className="group-card">
                <h2>Join an existing group</h2>

                <form onSubmit={handleJoinGroup}>
                    <label htmlFor="inviteCode">Invitation code</label>

                    <input
                        type="text"
                        id="inviteCode"
                        placeholder="Enter your 6-character code"
                        maxLength={6}
                        value={inviteCode}
                        onChange={(event) => setInviteCode(event.target.value)}
                        required
                    />

                    <button type="submit">Join Group</button>
                </form>
            </section>
        </div>
    )
}
export default GroupSetup