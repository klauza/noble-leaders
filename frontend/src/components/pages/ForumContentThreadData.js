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
    content: "lorem ipsum dolor sit 2",
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
    content: "lorem ipsum dolor sit 3",
    comments: []
  },
  {
    author: "Admin",
    slugAuthor: "admin",
    link: "about-me",
    subject: "Few words about you",
    content: "lorem ipsum dolor sit 4",
    comments: []
  },
  {
    author: "Admin",
    slugAuthor: "admin",
    link: "games-ratings",
    subject: "See ratings given by users",
    content: "Here are all players ratings",
    comments: []
  }
]


export default forumData