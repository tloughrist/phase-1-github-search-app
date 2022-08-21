document.addEventListener('DOMContentLoaded', function () {
    const dropDown = document.createElement('select');
    const opt1 = document.createElement('option');
    const opt2 = document.createElement('option');
    
    opt1.textContent = 'Search: Usernames';
    opt2.textContent = 'Search: Repositories'
    
    dropDown.appendChild(opt1);
    dropDown.appendChild(opt2);

    document.querySelector('form').insertBefore(dropDown,document.querySelector('form').firstChild);
    
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        if(dropDown.value === 'Search: Usernames') {
            removeAllChildNodes(document.getElementById('user-list'));
            removeAllChildNodes(document.getElementById('repos-list'));
            
            const userName = document.getElementById('search').value;
            
            const userFetch = fetch(`https://api.github.com/search/users?q=${userName}`, {
                'method': 'GET',
                'headers': {
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json"
                }
            })
            .then((response) => response.json())
            .then((data) => {
                for(let i = 0; i < data.items.length; i++) {
                    let displayName = document.createElement('h3');
                    let avatarSrc = document.createElement('img');
                    let profileUrl = document.createElement('a');
                    let userListItem = document.createElement('li');
                    let listList = document.createElement('ul');
                    let listName = document.createElement('li');
                    let listAvatar = document.createElement('li');
                    let listProfile = document.createElement('li');

                    displayName.textContent = data.items[i].login;
                    avatarSrc.src = data.items[i].avatar_url;
                    avatarSrc.width = 100;
                    avatarSrc.height = 100;
                    profileUrl.href = data.items[i].html_url;
                    profileUrl.textContent = `${data.items[i].login} profile`;

                    listName.appendChild(displayName);
                    listAvatar.appendChild(avatarSrc);
                    listProfile.appendChild(profileUrl);

                    listList.appendChild(listName);
                    listList.appendChild(listAvatar);
                    listList.appendChild(listProfile);

                    userListItem.appendChild(listList);

                    document.getElementById('user-list').appendChild(userListItem);

                    displayName.addEventListener('click', function () {
                        fetch(`https://api.github.com/users/${displayName.textContent}/repos`, {
                            'method': 'GET',
                            'headers': {
                            "Content-Type": "application/json",
                            Accept: "application/vnd.github.v3+json"
                            }
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            removeAllChildNodes(document.getElementById('repos-list'));
                            for(let i = 0; i < data.length; i++) {
                                const repo = document.createElement('li')
                                const repoLink = document.createElement('a')

                                const repoName = data[i].name;
                                const repoUrl = data[i].html_url;

                                repoLink.href = repoUrl;
                                repoLink.textContent = repoName;

                                repo.appendChild(repoLink);
                                document.getElementById('repos-list').appendChild(repo);
                            }
                        })     
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } if(dropDown.value === 'Search: Repositories') {
            removeAllChildNodes(document.getElementById('user-list'));
            removeAllChildNodes(document.getElementById('repos-list'));
            
            const repositoryName = document.getElementById('search').value;
            
            const userFetch = fetch(`https://api.github.com/search/repositories?q=${repositoryName}`, {
                'method': 'GET',
                'headers': {
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json"
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                
                removeAllChildNodes(document.getElementById('repos-list'))
                for(let i = 0; i < data.items.length; i++) {
                    const repo = document.createElement('li')
                    const repoLink = document.createElement('a')

                    const repoName = data.items[i].name;
                    const repoUrl = data.items[i].html_url;

                    repoLink.href = repoUrl;
                    repoLink.textContent = repoName;

                    repo.appendChild(repoLink);
                    document.getElementById('repos-list').appendChild(repo);
                }     
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    });
});



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
/*

*/