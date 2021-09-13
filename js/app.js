const searchInput = document.querySelector('.searchInput')
const searchBtn = document.querySelector('.searchBtn')

document.addEventListener('keypress', (event) => {
  if(event.key === 'Enter') {
    request()
  }
})

searchBtn.addEventListener('click', () => {
  request()
})

const request = async () => {
  try {
    const username = searchInput.value
    const response = await axios.get(`https://api.github.com/users/${username}`)
    showSearch(response.data)
  } catch (error) {
    if(error.message === 'Request failed with status code 404') {
      showNotFound()
    }
  }
}


const showSearch = (data) => {
  console.log(data)

  const footDiv = document.querySelector('.foot')
  footDiv.style.backgroundColor = 'var(--secondary-blue)'

  const {avatar_url, name, login: username, bio, created_at: createDate, public_repos: repos, followers, following, location, company, html_url} = data

  footVisorHead(avatar_url, name, username, bio, createDate, html_url)

  footVisorFoot(repos, followers, following, location, company)

  console.log(avatar_url, name, username, bio, createDate, html_url, public_repos, followers, following, location, company);
/*   const avatar_url = data.avatar_url
  const name = data.name
  const username = data.login
  const bio = data.bio
  const createDate = data.created_at */
}


const footVisorHead = (avatar_url , name, username, bio, createDate, html_url) => {
  const footVisorHead = document.querySelector('.footVisor-head')
  footVisorHead.innerHTML = ''

  //Avatar
  const avatarImgUser = document.createElement('img')
  avatarImgUser.setAttribute('src', avatar_url)
  avatarImgUser.setAttribute('alt', 'GitHub user searched avatar.')
  avatarImgUser.setAttribute('class', 'avatarImgUser')

  //Content
  const nameUser = document.createElement('p')
  nameUser.setAttribute('class', 'contentInfoUser')
  nameUser.innerHTML = name
  nameUser.style.fontSize = '20px'
  nameUser.style.color = '#fff'
  nameUser.style.paddingLeft = '10%'

  const usernameUserLink = document.createElement('a')
  usernameUserLink.setAttribute('href', html_url)
  usernameUserLink.setAttribute('target', '_blank')
  usernameUserLink.innerHTML = username
  usernameUserLink.style.color = 'var(--addictional-blue)'
  usernameUserLink.style.textDecoration = 'none'
  usernameUserLink.style.fontSize = '15px'

  const usernameUser = document.createElement('p')
  usernameUser.setAttribute('class', 'contentInfoUser')
  usernameUser.style.paddingLeft = '10%'
  usernameUser.appendChild(usernameUserLink)

  const bioUser = document.createElement('p')
  bioUser.setAttribute('class', 'contentInfoUser')
  bioUser.style.paddingLeft = '10%'
  bioUser.style.color = '#C4C4C4'
  bioUser.style.fontSize = '15px'
  if(bio===null) {
    bioUser.style.color = '#787878'
    bioUser.innerHTML = 'O usuário não possui biografia.'
  } else {
    bioUser.innerHTML = bio
  }

  //createDate
/*   let newDate = new Date(createDate)
newDate = newDate.split('', 4)  //não funcionou...
console.log(newDate);
*/

  const date = convertDate(createDate)

  const createDateUser = document.createElement('p')
  createDateUser.innerHTML = date
  createDateUser.style.color = '#C4C4C4'
  createDateUser.style.fontSize = '15px'


  const arrShowInfos = [nameUser, usernameUser, bioUser]

  const contentInfoUserDiv = document.createElement('div')
  contentInfoUserDiv.setAttribute('class', 'contentInfoUser-div')

  for(let i in arrShowInfos) {
    contentInfoUserDiv.appendChild(arrShowInfos[i])
  }


  footVisorHead.appendChild(avatarImgUser)
  footVisorHead.appendChild(contentInfoUserDiv)
  footVisorHead.appendChild(createDateUser)
}


const footVisorFoot = (repos, followers, following, location, company) => {
  const footVisorFoot = document.querySelector('.footVisor-foot')
  footVisorFoot.innerHTML = ''

  //Card strong blue
  const cardStrongBlue = document.createElement('div')
  cardStrongBlue.setAttribute('class', 'cardStrongBlue')


  //Repos, followers and following

  //Repos
  const repoDiv = document.createElement('div')

  const repositoriesLabel = document.createElement('p')
  repositoriesLabel.innerHTML = 'Repos'
  repositoriesLabel.setAttribute('class', 'estilizacaoLabels')

  const repositories = document.createElement('p')
  repositories.innerHTML = repos
  repositories.setAttribute('class', 'numbersFoot')

  repoDiv.appendChild(repositoriesLabel)
  repoDiv.appendChild(repositories)

  //Followers
  const followersDiv = document.createElement('div')

  const followersLabel = document.createElement('p')
  followersLabel.innerHTML = 'Followers'
  followersLabel.setAttribute('class', 'estilizacaoLabels')

  const followersInfo = document.createElement('p')
  followersInfo.innerHTML = followers
  followersInfo.setAttribute('class', 'numbersFoot')

  followersDiv.appendChild(followersLabel)
  followersDiv.appendChild(followersInfo)

  //Following
  const followingDiv = document.createElement('div')

  const followingLabel = document.createElement('p')
  followingLabel.innerHTML = 'Following'
  followingLabel.setAttribute('class', 'estilizacaoLabels')

  const followingInfo = document.createElement('p')
  followingInfo.innerHTML = following
  followingInfo.setAttribute('class', 'numbersFoot')

  followingDiv.appendChild(followingLabel)
  followingDiv.appendChild(followingInfo)
  
  cardStrongBlue.appendChild(repoDiv)
  cardStrongBlue.appendChild(followersDiv)
  cardStrongBlue.appendChild(followingDiv)

  footVisorFoot.appendChild(cardStrongBlue)



  //Location and company
  const divLocationCompany = document.createElement('div')
  divLocationCompany.setAttribute('class', 'divLocationCompany')

  const locationIcon = document.createElement('img')
  locationIcon.setAttribute('src', 'img/map-pin.svg')

  const locationInfo = document.createElement('p')
  locationInfo.innerHTML = location
  locationInfo.style.color = '#fff'
  locationInfo.style.fontSize = '14px'

  const divLocation = document.createElement('div')
  divLocation.appendChild(locationIcon)
  divLocation.appendChild(locationInfo)



  const companyIcon = document.createElement('img')
  companyIcon.setAttribute('src', 'img/company.svg')

  const companyInfo= document.createElement('p')
  companyInfo.style.color = '#fff'
  companyInfo.style.fontSize = '15px'
  if(company === null) {
    companyInfo.innerHTML = 'O usuário não possui uma companhia.'
    companyInfo.style.color = '#787878'
  } else {
    companyInfo.innerHTML = company
  }

  const divCompany = document.createElement('div')
  divCompany.appendChild(companyIcon)
  divCompany.appendChild(companyInfo)
  divCompany.style.paddingLeft = '20%'


  divLocationCompany.appendChild(divLocation)
  divLocationCompany.appendChild(divCompany)
  footVisorFoot.appendChild(divLocationCompany)
}


const convertDate = (createDate) => {
  for(let i in createDate) {createDate = createDate.replace('-', '')}
  createDate = Number(createDate.split('T', 1))
  console.log(createDate)

  const day = parseInt(createDate%100).toString()
  const month = parseInt(createDate%10000/100).toString()
  const year = parseInt(createDate%100000000/10000).toString()
  const stringDate = `Desde ${day}/${month}/${year}`
  return stringDate
}

const showNotFound = () => {
  const footVisorHead = document.querySelector('.footVisor-head')
  footVisorHead.innerHTML = ''

  const footVisorFoot = document.querySelector('.footVisor-foot')
  footVisorFoot.innerHTML = ''



  const errorMessage = document.createElement('p')
  errorMessage.innerHTML = 'Usuário não encontrado :('
  errorMessage.style.color = '#C4C4C4'
  errorMessage.style.fontSize = '30px'
  errorMessage.style.textAlign = 'center'

  const contentInfoUserDiv = document.createElement('div')
  contentInfoUserDiv.setAttribute('class', 'contentInfoUser-div')
  contentInfoUserDiv.appendChild(errorMessage)

  footVisorHead.appendChild(contentInfoUserDiv)
}



const changeThemeBtn = document.querySelector('.checkbox')

changeThemeBtn.addEventListener('change', () => {
  document.body.classList.toggle('sun');
})