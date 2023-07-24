// import { graphql, useStaticQuery } from "gatsby"

// const InstagramFeed = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       allInstagramPhoto {
//         edges {
//           node {
//             caption
//             media_url
//             permalink
//             timestamp
//           }
//         }
//       }
//     }
//   `)
//   return (
//     <div>
//       {data.allInstagramPhoto.edges.map((edge) => (
//         <div key={edge.node.permalink}>
//           <a href={edge.node.permalink}>
//             <img src={edge.node.media_url} alt={edge.node.caption} />
//           </a>
//           <p>{edge.node.caption}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default InstagramFeed
