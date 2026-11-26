//Backend server base URL for sending API request from the frontend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/groups';

//Request data from the server via fetch(), parse JSON to JS
export async function getPlanList (code) {
  const url = `${API_URL}/${code}/plan`;
  console.log('url?',url)

  const response = await fetch(`${API_URL}/${code}/plan`);
  if (!response.ok) {
    throw new Error('Failed to fetch plan');
  }
  return response.json();
}

export async function postPlanData (code, planData) {
  const response = await fetch(`${API_URL}/${code}/plan`, {
    method: 'POST',
    body: JSON.stringify(planData),
    headers: {
        'Content-Type': 'application/json',
    }
  });
  if (!response.ok) {
    throw new Error('Failed to post plan data');
  }
  return response.json();
}

export async function deletePlanData (code, planId) {
  const response = await fetch(`${API_URL}/${code}/plan/${planId}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete plan data');
  }
  return response.json();
}
export async function createGroup(groupData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
    })

    if (!response.ok) {
        throw new Error('Failed to create group')
    }

    return response.json()
}