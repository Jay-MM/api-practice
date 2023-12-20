// seelct DOM elements
// form
const form = document.querySelector('form');
// input
const input = document.getElementById('search-input');
// link-list div 
const linkList = document.querySelector('.list-group');

function renderUserProfile(username) {
  console.log('hellow from renderprofile', username);
  // fetch user's profile
  // display data in UI
}

function renderRepos(username) {
  // fetch User's repos by username
  fetch('https://api.github.com/users/' + username + '/repos?type=all&sort=created&per_page=10')
  // if status= 'ok' then return the response in json form 
  // otherwise return an errorr alert
  .then(function (userNameResponse) {
    if (userNameResponse.status === 200) {
      return userNameResponse.json()
    }else if (userNameResponse.status === 404) {
      alert('User not found. \n\Check your entry and try again')
    }
  })
  .then(function (repoData){
    console.log('repo data', repoData)
    // display data into link-list div 
    // for loop to loop over our array of repos
    for (let i = 0; i < repoData.length; i++) {
      // create list and anchor tag elements 
      const li = document.createElement('li')
      const a = document.createElement('a')
      
      const repo = repoData[i]

      a.href = repo.html_url
      a.textContent = repo.full_name
      a.target = '_blank'

      // append list item to body
      li.appendChild(a)
      // append list item to linkList 
      linkList.appendChild(li)

    }
  })
}

function handleSubmit(e) {
  e.preventDefault();
  // get username out of input 
  const username = input.value

  console.log(username);
  // render user profile
  renderUserProfile(username);
  // render repos
  renderRepos(username);
}

// event listener for submit event 
form.addEventListener('submit', handleSubmit)
