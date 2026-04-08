const sources = [
  {
    name: "Slack",
    tag: "2 items",
    note: "Urgent messages and handoff notes from project channels.",
  },
  {
    name: "Trello",
    tag: "1 item",
    note: "Deadline cards and board updates that need attention today.",
  },
  {
    name: "Google Drive",
    tag: "2 items",
    note: "Briefs, assets, and docs hiding in shared folders.",
  },
];

const actions = [
  {
    title: "Reply to Mia about the launch copy",
    priority: "Urgent",
    source: "Slack",
    context: "Project channel mentioned a missing headline and asked for approval before noon.",
  },
  {
    title: "Update Trello card: QA sign-off",
    priority: "Urgent",
    source: "Trello",
    context: "Board due today. The only blocker is the final browser test pass.",
  },
  {
    title: "Download final logo pack",
    priority: "Normal",
    source: "Google Drive",
    context: "Latest asset folder contains the approved export bundle.",
  },
  {
    title: "Review meeting notes",
    priority: "Normal",
    source: "Slack",
    context: "Decision recap posted in thread, needs to be folded into the brief.",
  },
  {
    title: "Check contract revision",
    priority: "Normal",
    source: "Google Drive",
    context: "A new doc version was uploaded after client feedback.",
  },
];

const sourcesEl = document.getElementById("sources");
const actionsEl = document.getElementById("actions");
const summaryEl = document.getElementById("summary");
const sourceTpl = document.getElementById("source-template");
const actionTpl = document.getElementById("action-template");

function renderSources() {
  sourcesEl.innerHTML = "";
  sources.forEach((source) => {
    const node = sourceTpl.content.cloneNode(true);
    node.querySelector("strong").textContent = source.name;
    node.querySelector(".tag").textContent = source.tag;
    node.querySelector("p").textContent = source.note;
    sourcesEl.appendChild(node);
  });
}

function renderActions() {
  const sorted = [...actions].sort((a, b) => (a.priority === b.priority ? 0 : a.priority === "Urgent" ? -1 : 1));

  actionsEl.innerHTML = "";
  sorted.forEach((action) => {
    const node = actionTpl.content.cloneNode(true);
    const article = node.querySelector(".action-card");
    article.classList.add(action.priority === "Urgent" ? "urgent" : "");
    node.querySelector("strong").textContent = action.title;
    node.querySelector(".badge").textContent = action.priority;
    node.querySelector(".badge").classList.add(action.priority === "Urgent" ? "urgent" : "normal");
    node.querySelector(".context").textContent = `${action.source}: ${action.context}`;
    actionsEl.appendChild(node);
  });

  document.getElementById("action-count").textContent = sorted.length;
  document.getElementById("urgent-count").textContent = sorted.filter((a) => a.priority === "Urgent").length;

  summaryEl.innerHTML = `
    <div class="summary-row">
      <strong>Everything in one place</strong>
      <span>Slack, Trello, and Drive items have been flattened into a single prioritized queue, so the next action is obvious.</span>
    </div>
  `;
}

document.getElementById("refresh-btn").addEventListener("click", renderActions);

renderSources();
renderActions();
