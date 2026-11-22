# Personal Portfolio 🚀

## 🌐 Project Link

Coming soon — deploying on GitHub Pages!

## 👩‍💻 About Me

Hi, I’m Airi — a computer science student and creative technologist who blends structured logic with playful curiosity. I build things that are both functional and thoughtful — from backend tools that streamline life, to interactive pages that carry personality.

Whether it's writing, engineering, or design, I believe in small details that make a big impact. This space is my way of sharing the experiments, side quests, and ideas I’ve brought to life.

Thanks for stopping by.

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, HTML5, CSS3
- **Backend/Tooling:** Vite, Node.js
- **Design:** Figma, Dribble (for inspiration), Liquidify (for logo)
- **Version Control:** Git & GitHub
- **Deployment:** GitHub Pages (coming soon)

## 🗂️ Where things live

```
src/
├── App.tsx                 routes
├── main.tsx                entry: loads fonts/Tailwind + styles/index.css
├── pages/                  one file per route (Home, Projects, ProjectDetail, Writing, BlogPost, Poetry, About)
├── components/
│   ├── layout/             Layout, Navigation (typed logo) and footer/
│   │   └── footer/         Footer, Wordmark (laser), Orb, EndNote
│   ├── theme/              NeonPage, NeonBackground, PixelIcon, SectionTitle
│   ├── home/               hero/, StackedProjects, ExperienceLog, SkillMarquee, SignOff
│   ├── projects/           CafeStreet intro, ProjectGrid (3×3 flip cards), ProjectModal, detail/ (project page parts)
│   ├── writing/            BulletinBoard, EssayCard, PoemNote
│   ├── about/              Menu (café menu card), AboutHero, ChatStory, PolaroidGallery, ...
│   └── ui/                 shadcn toast/tooltip primitives
├── data/                   ✏️ edit content here: projects.ts, home.ts, about.ts, site.ts (nav + socials)
├── contents/               ✏️ essays (blogs/) and poems (poems/) as markdown
├── hooks/                  small reusable hooks (scroll, typing, reveal, footer overlap)
├── styles/                 custom CSS, one file per area (theme, layout, home, projects, about, writing, newspaper)
└── utils/                  markdown loader, smooth scroll
public/img/px/              pixel-art icons + GIFs (coffee.gif, pour.gif)
```

**Common edits**
- Add or change a project → `src/data/projects.ts` (its page at `/projects/<slug>` updates automatically; add `highlights` for the bullet list)
- Change experience, skills, contact email → `src/data/home.ts`
- About page menu, interests, quick facts → `src/data/about.ts`
- Nav links / social links → `src/data/site.ts`
- New essay or poem → drop a `.md` file into `src/contents/blogs` or `src/contents/poems`
- Theme only supports two fonts: **Playwrite HU** (headings) and **JetBrains Mono** (everything else)
