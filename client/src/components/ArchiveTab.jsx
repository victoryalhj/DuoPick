import './ArchiveTab.css';
import { format } from 'date-fns';

export default function ArchiveTab ({ archivePlans = [], code, handleRemoveArchivedPlan }) {
  


  return (
    <div>
      {archivePlans?.length > 0 ? (
        <div className='archived-list'>  
          {archivePlans.map((plan) => (
            <div key={plan.id} className='archived-card'>
              <div className='archived-card-title-area'>
                <h4>{plan.title}</h4>
                <div className='star'>{[1,2,3,4,5].map((star) => (
                    star <= plan.rating ? '★' : ''
                ))}</div>
              </div>
            
              <div className='archived-card-review'>{plan.review}</div>
            
              <div className='archived-card-category-area'>
                <div className='category'>{plan.category}</div>
                <div className='tags'>{plan.tags.map((tag) => <div className='tag'>{tag}</div>)}</div>
                <div>{plan.date? format(new Date(plan.date), 'EEE, d MMM yyyy') : ''}</div>
              </div> 

              <div className='archived-card-budget-area'>
                <div>Planned £{plan.budget}</div>
                <div>Spent £{plan.actualSpent}</div>
              </div>

              <button 
                type='button'
                className='archived-card-remove-btn'
                onClick={() => handleRemoveArchivedPlan(plan.id)}
              >Delete</button>
            </div>
      ))}
       </div>
      ) : (
        <p>No archived plans yet.</p>
      )}
    </div>
  );
}
