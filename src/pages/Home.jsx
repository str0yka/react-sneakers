// import React from 'react';
// import Card from "../components/Card";
//
// const Home = () => {
//   return (
//     <>
//       <div className="contentHeader">
//         <h1 className='title'>Все кроссовки</h1>
//         <label className="searchBlock">
//           <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
//             <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" strokeWidth="2" strokeLinecap="round"/>
//           </svg>
//           <input
//             type="text"
//             placeholder='Поиск...'
//             value={query}
//             onChange={onSearch}
//           />
//           {query &&
//             <button
//               className='searchClear'
//               onClick={() => setQuery('')}
//             >
//               <span className="visually-hidden">очистить поиск</span>
//             </button>
//           }
//         </label>
//       </div>
//
//       <section className="sneakers">
//         {searchedProducts
//           .map(card =>
//             <Card
//               key={card.id}
//               card={card}
//               onAddToFavorite={() => onAddToFavorite(card)}
//               onAddToCart={() => onAddToCart(card)}
//             />
//           )}
//       </section>
//     </>
//   );
// };
//
// export default Home;