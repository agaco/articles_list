export const fullListQuery = () => (
  `{
   articles(t: Article, limit: 20) {
     id
     original_id
     title
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


export const singleArtQuery = `query getArticle($url: String!) {
  article(url: $url) {
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
 }`;

