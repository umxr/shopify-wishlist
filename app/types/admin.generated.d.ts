/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as AdminTypes from './admin.types.d.ts';

export type GetProductByHandleQueryVariables = AdminTypes.Exact<{
  handle: AdminTypes.Scalars['String']['input'];
}>;


export type GetProductByHandleQuery = { productByHandle?: AdminTypes.Maybe<(
    Pick<AdminTypes.Product, 'id' | 'title' | 'handle'>
    & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>> }
  )> };

export type GetProductByIdQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type GetProductByIdQuery = { product?: AdminTypes.Maybe<(
    Pick<AdminTypes.Product, 'id' | 'title' | 'handle'>
    & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>> }
  )> };

export type GetProductsByFowardPaginationQueryVariables = AdminTypes.Exact<{
  numProducts: AdminTypes.Scalars['Int']['input'];
  cursor?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type GetProductsByFowardPaginationQuery = { products: { edges: Array<{ node: Pick<AdminTypes.Product, 'id' | 'title' | 'status' | 'handle'> }>, pageInfo: Pick<AdminTypes.PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'> } };

export type GetProductsByBackwardPaginationQueryVariables = AdminTypes.Exact<{
  numProducts: AdminTypes.Scalars['Int']['input'];
  cursor?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type GetProductsByBackwardPaginationQuery = { products: { edges: Array<{ node: Pick<AdminTypes.Product, 'id' | 'title' | 'status' | 'handle'> }>, pageInfo: Pick<AdminTypes.PageInfo, 'startCursor' | 'endCursor' | 'hasPreviousPage' | 'hasNextPage'> } };

interface GeneratedQueryTypes {
  "#graphql\nquery getProductByHandle($handle: String!) {\n  productByHandle(handle: $handle) {\n    id\n    title\n    handle\n    featuredImage {\n      url\n    }\n  }\n}": {return: GetProductByHandleQuery, variables: GetProductByHandleQueryVariables},
  "#graphql\n  query getProductById($id: ID!) {\n    product(id: $id) {\n      id\n      title\n      handle\n      featuredImage {\n        url\n      }\n    }\n  }\n": {return: GetProductByIdQuery, variables: GetProductByIdQueryVariables},
  "#graphql\n  query getProductsByFowardPagination($numProducts: Int!, $cursor: String) {\n    products (first: $numProducts, after: $cursor) {\n      edges {\n        node {\n          id\n          title\n          status\n          handle\n        }\n      },\n      pageInfo {\n        startCursor,\n        endCursor,\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n  }\n": {return: GetProductsByFowardPaginationQuery, variables: GetProductsByFowardPaginationQueryVariables},
  "#graphql\n  query getProductsByBackwardPagination($numProducts: Int!, $cursor: String) {\n    products (last: $numProducts, before: $cursor) {\n      edges {\n        node {\n          id\n          title\n          status\n          handle\n        }\n      },\n      pageInfo {\n        startCursor,\n        endCursor,\n        hasPreviousPage\n        hasNextPage\n      }\n    }\n  }\n": {return: GetProductsByBackwardPaginationQuery, variables: GetProductsByBackwardPaginationQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
