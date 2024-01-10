document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("github-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let user = document.getElementById("search").value;
    let details = document.getElementById("github-container");
    let userList = document.getElementById("user-list");
    let reposList = document.getElementById("repos-list");

    userList.innerHTML = "";
    reposList.innerHTML = "";

    // Fetch user details

    fetch(`https://api.github.com/search/users?q=${user}`)
      .then(res => res.json())
      .then((userData) => {
        console.log(userData);

        let avatar = document.createElement("img");
        avatar.src = userData.items[0].avatar_url;
        userList.appendChild(avatar);

        let a = document.createElement("a");
        a.href = userData.items[0].html_url;
        a.innerHTML = userData.items[0].login;
        userList.appendChild(a);

        details.appendChild(userList);

        // Fetch user repositories

        fetch(`https://api.github.com/users/${user}/repos`)
          .then(res => res.json())
          .then((reposData) => {
            console.log(reposData);

            reposData.forEach(repo => {
              let repoLink = document.createElement("a");
              repoLink.href = repo.html_url;
              repoLink.innerHTML = repo.name;
              reposList.appendChild(repoLink);
            });

            details.appendChild(reposList);
          })
          .catch((reposError) => {
            console.error('Error fetching user repositories:', reposError);
          });
      })
      .catch((userError) => {
        console.error('theres an error somewhere:', userError);
      });
  });
});
