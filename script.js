
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});


async function loadArchitectureProjects() {
  const projectGrid = document.getElementById("projectGrid");

  if (!projectGrid) {
    console.error("Project grid not found.");
    return;
  }

  try {
    const response = await fetch(
      "http://127.0.0.1:3000/api/projects"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const projects = await response.json();
    const cards = projectGrid.querySelectorAll(".project-card");

    projects.forEach((project, index) => {
      let card = cards[index];

      if (!card) {
        card = document.createElement("article");
        card.className = "project-card";

        const info = document.createElement("div");
        info.className = "card-info";
        card.appendChild(info);
        projectGrid.appendChild(card);
      }

      let info = card.querySelector(".card-info");

      if (!info) {
        info = document.createElement("div");
        info.className = "card-info";
        card.appendChild(info);
      }

      let category = info.querySelector(".category");
      if (!category) {
        category = document.createElement("p");
        category.className = "category";
        info.appendChild(category);
      }
      category.textContent = project.style.toUpperCase();

      let title = info.querySelector("h3");
      if (!title) {
        title = document.createElement("h3");
        info.appendChild(title);
      }
      title.textContent = project.name;

      let location = info.querySelector(".project-location");
      if (!location) {
        location = document.createElement("p");
        location.className = "project-location";
        info.appendChild(location);
      }
      location.textContent = project.location;
    });

    cards.forEach((card, index) => {
      if (index >= projects.length) card.remove();
    });
  } catch (error) {
    console.error("Could not load projects:", error);
  }
}

loadArchitectureProjects();

