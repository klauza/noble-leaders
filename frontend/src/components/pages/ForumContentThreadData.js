const date = new Date().toLocaleDateString("en-GB");
const forumData = [
  {
    author: "Admin",
    slugAuthor: "admin",
    link: "about-website",
    subject: "About website & cc",
    content: "Morbi non ligula eu eros imperdiet euismod. Quisque eu viverra nunc. Etiam neque dui, molestie quis mollis non, mattis non leo. Sed sit amet nibh ligula. Sed justo felis, sollicitudin eu ullamcorper non, dictum vitae dolor. Ut eu imperdiet massa, quis pellentesque arcu. Nam at tellus nec ante ornare iaculis vitae nec risus. Aliquam erat volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam bibendum elit sit amet ipsum ultrices, quis commodo nunc hendrerit."
  },
  {
    author: "Mario Marian",
    slugAuthor: "mario-marian",
    link: "leaderboard-tournament",
    subject: "Leaderboard",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt iste cumque officiis ab, dicta rerum nobis exercitationem at fugit ducimus minima qui. Labore, quas. Vel nisi rerum totam sed odit quia voluptatibus blanditiis expedita soluta mollitia? Assumenda, fuga? Quod nostrum quaerat sunt natus nihil.",
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
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam veritatis eveniet ipsam iure sapiente eaque corrupti similique necessitatibus, esse, omnis incidunt quia expedita modi, deleniti nesciunt autem rem vel numquam cupiditate laboriosam beatae vero laborum corporis suscipit. Facere labore vero culpa in nesciunt id, magnam ea? Ipsa inventore, vitae, sequi molestiae provident laborum sit vel totam cupiditate iusto blanditiis dolorum!",
    comments: []
  },
  {
    author: "Admin",
    slugAuthor: "admin",
    link: "about-me",
    subject: "Few words about you",
    content: "Hey, you can write here few words about yourself. Feel free to write a longer story. I will start from myself. I'm Michal, I'm a creator of this website and I know how to cook chicken soup and stew. I hope you enjoy this game playform and will leave a small feedback or a constructive one. The page is constantly growing, I'm trying to develop it with new ideas and technologies whenever I can.",
    comments: [
      { name: "testacc", slugName: "testacc", content: "I am a test account and I'm glad to be here.", edited: false, editDate: null, date: date }
    ]
  },
  {
    author: "Admin",
    slugAuthor: "admin",
    link: "statistics",
    subject: "Statistics",
    content: "Here are all players ratings",
    comments: [],
    specialArticle: true,
    specialArticleContent: ["a", "b"]
  }
]


export default forumData