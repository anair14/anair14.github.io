// 🌀 Three.js Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a rotating wireframe torus knot
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

camera.position.z = 30;

// Animate rotation
function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

async function fetchGitHubProjects() {
    const username = "anair14"; 
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    const repos = await response.json();
    
    const projectsList = document.getElementById("projects");
    projectsList.innerHTML = "";

    repos.forEach(repo => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <p class="repo-description">${repo.description || "No description available"}</p>
        `;
        projectsList.appendChild(listItem);
    });
}

fetchGitHubProjects();
