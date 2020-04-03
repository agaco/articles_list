export const fullListQuery = () => (
 `{
   articles(t: Article, limit: 20) {
     id
     title
     url
     tags
     img {
       url
       title
     }
     author {
       img
       name
     }
     body(t: Plain) {
       data
       params {
         id
         type
         description
       }
     }
   }
 }`
);

export const singleArtQuery = (url) => (
 `{
   article(
    url: ${url}
   ) {
     id
     original_id
     title
     url
     tags
     img {
       url
       title
     }
     author {
       img
       name
     }
     body(t: HTML) {
       data
     }
   }
 }`
);

