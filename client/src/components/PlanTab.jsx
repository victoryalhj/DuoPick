import { useState } from 'react';
import { postPlanData } from '../../services/api';
import './PlanTab.css';
import { format } from 'date-fns';

//Suggested 3 ideas
const suggestedIdeasList = {
  Restaurant: [
    'Street-food market crawl',
    'Go to the Michelin-starred restaurant',
    'Try a ramen place you have never been to',
  ],
  'Weekend trip': [
    'Costal train by trip',
    'Cozy countryside Airbnb',
    'Historic town stroll',
  ],
  Activity: [
    'Go to the Winter Wonder Land',
    'Board game cafe tonight',
    'Find a hidden bakery',
  ],
  'Something else': [
    'Sunset viewpoint picnic',
    'Having a house party',
    'Try a new class together',
  ]
}

//Keep track of which item is being edited and its temporary value
export default function PlanTab({
  code,
  groupMembers=[],
  currentUser='',
  plans,
  setPlans,
  handleArchivePlan
}) {

  const [newTitle, setNewTitle] = useState('');
  const [category, setCategory] = useState('Restaurant');
  const [newLink, setNewLink] = useState('');
  const [newMemo, setNewMemo] = useState('');
  const [newBudget, setNewBudget] = useState(0);
  const [newDate, setNewDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
 
  const [openToggle, setOpenToggle] = useState(false);
  const [editBudgetId, setEditBudgetId] = useState(null);
  const [draftBudget, setDraftBudget] = useState('');

  const [suggestedIdeas, setSuggestedIdeas] = useState([]); 

  const [editDateId, setEditDateId] = useState(null);
  const [draftDate, setDraftDate] = useState('');

  const [archivingPlanId, setArchivingPlanId] = useState(null)
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [tags, setTags] = useState('')
  const [actualSpent, setActualSpent] = useState('')

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      const savedPlan = await postPlanData(code, {
        title: newTitle,
        category: category,
        link: newLink,
        memo: newMemo,
        budget: newBudget,
        date: newDate,
      });
      console.log('savedPlan',savedPlan)

      setPlans(oldPlans => [...oldPlans, savedPlan])
 
      setNewTitle('');
      setNewLink('');
      setNewMemo('');
      setNewBudget(0);
      setNewDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));

    }
    catch (error) {
      console.log({message: 'Failed to add idea'}, error);
    }
  }
  
  //{id: 101, title:'Oxford', budget:100} plan.id(101)
  function handleSaveBudget (planId) {
    const numericBudget = draftBudget === '' ? 0 : Number(draftBudget);

    setPlans((prevPlan) => prevPlan.map((plan) => plan.id === planId ? {...plan, budget: numericBudget} : plan));
    setEditBudgetId(null);
  }
 
  //Show 3 suggested ideas on screen
  function handleSuggestedIdeas () {
    const ideasForCategory = suggestedIdeasList[category] || suggestedIdeasList['Something else'];
    setSuggestedIdeas(ideasForCategory);
  }

  async function handleAddSuggestedIdea (idea) {
    try {
      const suggestedPlan = await postPlanData(code, {
        title: idea,
        category: category,
        link: '',
        memo: '',
        budget: 0,
        date: '',
      });
      setPlans(oldPlans => [...oldPlans, suggestedPlan])
    }
    catch (error) {
      console.log({message: 'Failed to add suggested idea'}, error)
    }
  }

  async function handleSaveDate (planId) {
    setPlans((prevPlan) => prevPlan.map((plan) => plan.id === planId ? {...plan, date: draftDate} : plan)
    );
    setEditDateId(null);
  }

  function handleRemovePlan (planId) {
    setPlans((prevPlan) => prevPlan.filter((plan) => plan.id !== planId));
  }

  function handleOpenArchivingForm (plan) {
    setArchivingPlanId(plan.id);
    setRating(0);
    setReview('');
    setTags('');
    setActualSpent('');
  }

  //Save form inputs for the plan and move it to the Archive tab
  //Split comma-separated tags, trim whitespace, and remove empty strings into new array
  //Fall back to plan budget if actualSpend is empty, otherwise use actualSpent
  //Pass the archived details up to App.jsx to update plans and archive state
  //' pub , food ' > [' pub ',' food '] > ['pub','food']
  function handleSaveArchive (plan) {
    const tag = tags.split(',').map((item) => item.trim()).filter((item) => item !== '')
    const spent = actualSpent === '' ? Number(plan.budget) : Number(actualSpent);
    
    handleArchivePlan(plan.id, {rating, review, tags: tag, actualSpent: spent});
    setArchivingPlanId(null);
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
                {/* <option value="Cafe">Cafe</option> */}
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
              <button 
                type='button'
                onClick={() => setOpenToggle(prev => !prev)}
                >Pick a date
              </button>
              {openToggle &&
                <input
                  type='datetime-local'
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              }
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
          <div className='need-ideas-details'>
            <select
                className='category-area'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Weekend trip">Weekend trip</option>
                {/* <option value="Cafe">Cafe</option> */}
                <option value="Activity">Activity</option>
                <option value="Something else">Something else</option>

            </select>
            <button 
              type='button'
              onClick={handleSuggestedIdeas}
            >Suggest 3 ideas</button>
          </div>

          {suggestedIdeas?.length > 0 && (
            <div className='suggested-idea-area'>
              {suggestedIdeas.map((idea) => (
                <div key={idea} className='suggested-idea'>
                  <div className='each-idea'>{idea}</div>
                  <button
                    type='button'
                    onClick={()=> handleAddSuggestedIdea(idea)}
                  >
                    Add
                  </button>
                </div>

            ))}
            </div>
          )}
        </div>
        
        {plans?.length > 0 && (
          <div className='add-idea-input-result'>
            {plans.map((plan) => (
              <div key={plan.id} className='each-idea-card'>
                  
                  <div className='vote-check-area'>Your vote needed</div>
                  <h3>{plan.title}</h3>

                  <div className='category-details'>
                    <div>
                      <div className='category-name'>{plan.category}</div>
                      <a
                       href={plan.link}
                       target='_blank'
                       rel='noreferrer'
                       className='plan-link'
                       >{plan.link}</a>
                    </div>
                    {editBudgetId === plan.id ? (
                      <input
                        type='number'
                        className='budget-input'
                        value={draftBudget}
                        onChange={(e) => setDraftBudget(e.target.value)}
                        onBlur={() => handleSaveBudget(plan.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSaveBudget(plan.id);
                          }
                          if (e.key === 'Escape') {
                            setEditBudgetId(null);
                          }
                        }}
                      />
                    ) : (
                    <div 
                      className='budget'
                      onClick={() => {
                        setEditBudgetId(plan.id)
                        setDraftBudget(plan.budget)
                      }}  
                    >£{plan.budget} ✎</div>
                    )}
                  </div>
                  
                  <div className='date-details'>
                    <div>When</div>

                    {editDateId === plan.id? (
                      <input 
                        type='datetime-local'
                        className='date-input'
                        value={draftDate}
                        onChange={(e) => setDraftDate(e.target.value)}
                        onBlur={() => handleSaveDate(plan.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSaveDate(plan.id)
                          }
                          if (e.key === 'Escape') {
                            setEditDateId(null)
                          }
                        }}
                      />

                    ) : (
                      <div 
                        className='date-value'
                        onClick={() => {
                          setEditDateId(plan.id);
                          setDraftDate(plan.date || format(new Date(), "yyyy-MM-dd'T'HH:mm"))
                        }}
                      >
                        {plan.date ? format(new Date(plan.date), 'EEE, d MMM yyyy ✎') : 'Pick a date'}
                      </div>
                    )}
                  </div>

                  <div className='member-details'>
                    {groupMembers.map((member) => {
                      const isSelected = member === currentUser;
                      return (
                        <button type='button' key={member} className={isSelected? 'active' : ''}>
                          {isSelected ? `${member} (you)` : member}
                        </button>
                      )
                    })}
                  </div>


                  <div className='vote-details'>
                    <p>Your vote</p>
                    <button>👍 Like</button>
                    <button>👎 Pass</button>
                  </div>


                  <div className='unlock-details'>
                    <button 
                      type='button'
                      disabled={archivingPlanId === plan.id}
                      onClick={() => handleOpenArchivingForm(plan)}  
                    >We went → Archive</button>
                    <button 
                      type='button' 
                      onClick={() => handleRemovePlan(plan.id)}
                    >Remove</button>
                  </div>

                  {archivingPlanId === plan.id && (
                    <div>
                      <hr/>
                      <div className='archive-form'>
                        <div>{[1,2,3,4,5].map((star) => (
                          <button
                            key={star}
                            type='button'
                            className={`star-btn ${star <= rating ? 'filled': ''}`}
                            onClick={() => setRating(star)}
                          >
                           {star <= rating ? '★' : '☆'} 
                          </button>
                        ))}</div>

                        <div className='archive-form-detail'>
                          <input 
                            value={review}
                            type="text" 
                            placeholder='One-line review'
                            onChange={(e) => setReview(e.target.value)}
                          />
                          <input 
                            value={tags}
                            type="text" 
                            placeholder='Tags, comma separated'
                            onChange={(e) => setTags(e.target.value)}
                          />
                          <input 
                            value={actualSpent}
                            type="text" 
                            placeholder='Actual spent(£)'
                            onChange={(e) => setActualSpent(e.target.value)}
                          />
                        </div>

                        <button
                          type='button'
                          className='save-to-archive-btn'
                          onClick={() => handleSaveArchive(plan)}
                        >Save to archive</button>
                        <button
                          type='button'
                          className='cancel-btn'
                          onClick={() => setArchivingPlanId(null)}
                        >Cancel</button>
                      </div>
                    </div>
                  )}
                </div>  


          ))}
          </div>
        ) }

    </section>
  )
}
