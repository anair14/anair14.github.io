const username = "anair14"; // Replace with your GitHub username
const reposContainer = document.getElementById("repos-container");

async function fetchRepos() {
  const url = `https://api.github.com/users/${username}/repos`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const repos = await response.json();
    displayRepos(repos);
  } catch (error) {
    reposContainer.innerHTML = `<p>Error loading projects: ${error.message}</p>`;
  }
}

function displayRepos(repos) {
  reposContainer.innerHTML = repos
    .slice(0, 5) // Limit to 5 repositories
    .map(
      (repo) => `
        <div class="repo">
          <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
          <p>${repo.description || "No description provided."}</p>
        </div>
      `
    )
    .join("");
}

fetchRepos();

