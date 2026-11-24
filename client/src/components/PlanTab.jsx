import { useState } from 'react';
import { postPlanData } from '../../services/api';
import './PlanTab.css';

export default function PlanTab({code}) {
  const [plans, setPlans] = useState([]);

  const [newTitle, setNewTitle] = useState('');
  const [category, setCategory] = useState('Restaurant');
  const [newLink, setNewLink] = useState('');
  const [newMemo, setNewMemo] = useState('');
  const [newBudget, setNewBudget] = useState(0);
  const [newDate, setNewDate] = useState('');

  // const categories = ['Restaurant', 'Weekend trip', 'Cafe', 'Activity', 'Something else'];
  // const [selectedCategory, setSelectedCategory] = useState('');

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      console.log('submit values', {
        title: newTitle,
        category: category,
        link: newLink,
        memo: newMemo,
        budget: newBudget,
        date: newDate,
      });

      await postPlanData(code, {
        title: newTitle,
        category: category,
        link: newLink,
        memo: newMemo,
        budget: newBudget,
        date: newDate,
      });
      setNewTitle('');
      setNewLink('');
      setNewMemo('');
      setNewBudget(0);
      setNewDate('');
    }
    catch (error) {
      console.log({message: 'Failed to add idea'}, error);
    }
  }
  

  return (
    <section>
        
        <div className='add-idea-area'>
          <h3>Add an idea</h3>
          <form onSubmit={handleSubmit}>
            <div className='add-idea-area-first'>
              <input 
                type="text" 
                required
                placeholder='Title'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <select
                className='category-area'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Weekend trip">Weekend trip</option>
                <option value="Cafe">Cafe</option>
                <option value="Activity">Activity</option>
                <option value="Something else">Something else</option>

              </select>
            </div>

            <div className='etc-area'>
              <input 
                type="text" 
                placeholder='Link(optional)'
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
              />
              <input 
                type="text" 
                placeholder='Note(optional)'
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
              />
              <input 
                type="number" 
                placeholder='Budget(£)'
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
              />
            </div>

            <div className='date-area'>
              <p>When are you going? (optional)</p>
              <button type='button'>Pick a date</button>
            </div>
            <div className='add-idea-btn'>
              <button
                type='submit'
              >Add idea</button>
            </div>

          </form>
        </div>

        <div className='need-ideas'>
          <h3>Need ideas?</h3>
          <div>
            <div></div>
            <button>Suggest 3 ideas</button>
          </div>
        </div>


    </section>
  )
}
