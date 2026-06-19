const chapters = [
  { label: "问题定义", time: 32, detail: "整条训练栈都可能成为瓶颈" },
  { label: "监控 vs profiling", time: 71, detail: "wide but shallow, deep but narrow" },
  { label: "行为指纹", time: 220, detail: "beta / mu / sigma 的直觉" },
  { label: "系统流程", time: 327, detail: "Detect -> Profile -> Compare" },
  { label: "生产案例", time: 738, detail: "混合硬件和软件问题" },
  { label: "结论", time: 958, detail: "从监控到深度理解" }
];

const video = document.getElementById("talkVideo");
const chapterButtons = document.getElementById("chapterButtons");
const slideList = document.getElementById("slideList");
const transcriptList = document.getElementById("transcriptList");
const slideSearch = document.getElementById("slideSearch");
const transcriptSearch = document.getElementById("transcriptSearch");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function highlight(text, query) {
  const safe = escapeHtml(text);
  if (!query) return safe;
  const needle = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return safe.replace(new RegExp(needle, "gi"), (match) => `<mark>${match}</mark>`);
}

function jumpTo(time) {
  if (!video) return;
  video.currentTime = time;
  video.play().catch(() => {});
  video.scrollIntoView({ behavior: "smooth", block: "center" });
}

function renderChapters() {
  chapterButtons.innerHTML = chapters.map((chapter) => `
    <button class="jump-button" type="button" data-time="${chapter.time}">
      <span class="pill">${chapter.label}</span>
      <span>${chapter.detail}</span>
    </button>
  `).join("");
  chapterButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => jumpTo(Number(button.dataset.time)));
  });
}

function slideMatches(slide, query) {
  if (!query) return true;
  const haystack = [
    slide.title,
    slide.chapter,
    slide.point,
    slide.talk,
    ...(slide.explain || [])
  ].map(normalize).join(" ");
  return haystack.includes(query);
}

function renderSlides() {
  const query = normalize(slideSearch.value);
  const slides = window.SLIDES.filter((slide) => slideMatches(slide, query));
  slideList.innerHTML = slides.map((slide) => `
    <article class="slide-card" id="slide-${slide.no}">
      <div class="slide-media">
        <img src="${slide.image}" alt="Slide ${slide.no}: ${escapeHtml(slide.title)}" loading="lazy">
      </div>
      <div class="slide-body">
        <div class="slide-kicker">
          <span class="pill">Slide ${slide.no}</span>
          <span>${escapeHtml(slide.chapter)}</span>
        </div>
        <h3>${highlight(slide.title, query)}</h3>
        <p>${highlight(slide.point, query)}</p>
        <ul>
          ${(slide.explain || []).map((item) => `<li>${highlight(item, query)}</li>`).join("")}
        </ul>
        <div class="talk-note">
          <strong>讲解建议</strong>
          <p>${highlight(slide.talk, query)}</p>
        </div>
        <div class="slide-actions">
          ${slide.start ? `<button class="slide-button" type="button" data-time="${slide.start}">跳到视频对应段落</button>` : ""}
          <a class="slide-button" href="${slide.image}" target="_blank" rel="noreferrer">打开 slide 图</a>
        </div>
      </div>
    </article>
  `).join("");
  slideList.querySelectorAll("[data-time]").forEach((button) => {
    button.addEventListener("click", () => jumpTo(Number(button.dataset.time)));
  });
}

function transcriptMatches(item, query) {
  if (!query) return true;
  return normalize(`${item.en} ${item.zh}`).includes(query);
}

function renderTranscript() {
  const query = normalize(transcriptSearch.value);
  const rows = window.TRANSCRIPT.filter((item) => transcriptMatches(item, query));
  transcriptList.innerHTML = rows.map((item) => `
    <article class="transcript-row">
      <div class="idx">${item.index}</div>
      <div>
        <strong>English</strong>
        <p>${highlight(item.en, query)}</p>
      </div>
      <div>
        <strong>中文</strong>
        <p>${highlight(item.zh, query)}</p>
      </div>
    </article>
  `).join("");
}

renderChapters();
renderSlides();
renderTranscript();

slideSearch.addEventListener("input", renderSlides);
transcriptSearch.addEventListener("input", renderTranscript);
