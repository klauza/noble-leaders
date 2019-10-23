const date = new Date().toLocaleDateString("en-GB");
const forumData = [
  {
    author: "Admin",
    slugAuthor: "admin",
    link: "about-website",
    subject: "About website & cc",
    content: "I would appreciate any constructive feedback from you about this app. I've put a lot of effort in building this project, I was basically learning by doing. Eventually I'm happy that I can show it to you, and public space. "
  },
  {
    author: "Mario Marian",
    slugAuthor: "mario-marian",
    link: "leaderboard-tournament",
    subject: "Leaderboard",
    content: "The next idea is to build a new system, where top players from each game will be juxtaposed on a podium. Also each week / month all the scores will be set to 0 so the race will start over once again and simultaneously the best players will be awarded.",
    comments: [
      { name: "Admin", slugName: "admin", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", edited: false, editDate: null, date: date }, 
      { name: "Mario Marian", slugName: "mario-marian", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", edited: false, editDate: null, date: date },
      { name: "michael", slugName: "michael", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", edited: false, editDate: null, date: date }
    ]
  },
  {
    author: "Admin",
    slugAuthor: "admin",
    link: "snake-discussion",
    subject: "Snake discussion",
    content: "Feel free to write your experience with a Snake game.",
    comments: [
      { name: "michael", slugName: "michael", content: "I like it. Needs some work with bottom section though.", edited: false, editDate: null, date: date}
    ]
  },
  {
    author: "Admin",
    slugAuthor: "admin",
    link: "about-me",
    subject: "Few words about you",
    content: "Hey, let's write here few words about yourself. Feel free to write a longer story. I will start from myself. I'm Michal, I'm a creator of this website and I know how to cook chicken soup and stew. I hope you enjoy this game platform and will leave at least a short constructive feedback. The page is constantly growing and I aim to develop it with new ideas and technologies whenever I can.",
    comments: [
      { name: "testacc", slugName: "testacc", content: "I am a test account and I'm glad to be here.", edited: false, editDate: null, date: date }
    ]
  },
  {
    author: "admin",
    slugAuthor: "admin",
    link: "statistics",
    icon: "fa fa-star",
    subject: "Statistics",
    description: "app statistics",
    content: "Here are all players ratings",
    comments: [],
    specialArticle: true,
    specialArticleContent: ["a", "b"],
    createdAt: "2019-10-23"
  }
]


export default forumData