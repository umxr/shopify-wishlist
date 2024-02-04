export const GET_PRODUCT_BY_HANDLE_QUERY = `#graphql
query getProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    handle
    featuredImage {
      url
    }
  }
}`;

export const GET_PRODUCT_BY_ID_QUERY = `#graphql
  query getProductById($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      featuredImage {
        url
      }
    }
  }
`;

export const FORWARD_PAGINATION_QUERY = `#graphql
  query getProductsByFowardPagination($numProducts: Int!, $cursor: String) {
    products (first: $numProducts, after: $cursor) {
      edges {
        node {
          id
          title
          status
          handle
          wishlistCount: metafield(namespace: "wishlist", key: "count") {
            value
          }
        }
      },
      pageInfo {
        startCursor,
        endCursor,
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const BACKWARD_PAGINATION_QUERY = `#graphql
  query getProductsByBackwardPagination($numProducts: Int!, $cursor: String) {
    products (last: $numProducts, before: $cursor) {
      edges {
        node {
          id
          title
          status
          handle
          wishlistCount: metafield(namespace: "wishlist", key: "count") {
            value
          }
        }
      },
      pageInfo {
        startCursor,
        endCursor,
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;
