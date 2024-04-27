// import React, { useState } from 'react';
// import FilterPosts from './FilterPosts';
// import RecentPosts from './RecentPosts';

// function PostList({ posts }) {
//   const [selectedFilter, setSelectedFilter] = useState('all');

//   const handleFilterChange = (filter) => {
//     setSelectedFilter(filter);
//   };

//   const filterPosts = (posts, filter) => {
//     if (filter === 'all') {
//       return posts;
//     } else if (filter === 'questions') {
//       return posts.filter((post) => post.tags.includes('questions'));
//     } else if (filter === 'comments') {
//       return posts.filter((post) => post.tags.includes('comments'));
//     }
//     return posts;
//   };

//   const filteredPosts = filterPosts(posts, selectedFilter);

//   return (
//     <div>
//       <FilterPosts selectedFilter={selectedFilter} handleFilterChange={handleFilterChange} />
//       <div className="post-list">
//         {filteredPosts.map((post) => (
//           <RecentPosts key={post.id} post={post} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PostList;



