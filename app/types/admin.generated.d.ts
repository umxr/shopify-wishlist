/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as AdminTypes from './admin.types.d.ts';

export type GetProductMetafieldDefinitionQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type GetProductMetafieldDefinitionQuery = { metafieldDefinitions: { edges: Array<{ node: (
        Pick<AdminTypes.MetafieldDefinition, 'name'>
        & { type: Pick<AdminTypes.MetafieldDefinitionType, 'name'> }
      ) }> } };

export type GetCustomerMetafieldDefinitionQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type GetCustomerMetafieldDefinitionQuery = { metafieldDefinitions: { edges: Array<{ node: (
        Pick<AdminTypes.MetafieldDefinition, 'name'>
        & { type: Pick<AdminTypes.MetafieldDefinitionType, 'name'> }
      ) }> } };

export type CreateProductMetafieldDefinitionMutationVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type CreateProductMetafieldDefinitionMutation = { metafieldDefinitionCreate?: AdminTypes.Maybe<{ createdDefinition?: AdminTypes.Maybe<Pick<AdminTypes.MetafieldDefinition, 'id'>>, userErrors: Array<Pick<AdminTypes.MetafieldDefinitionCreateUserError, 'field' | 'message'>> }> };

export type CreateCustomerMetafieldDefinitionMutationVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type CreateCustomerMetafieldDefinitionMutation = { metafieldDefinitionCreate?: AdminTypes.Maybe<{ createdDefinition?: AdminTypes.Maybe<Pick<AdminTypes.MetafieldDefinition, 'id'>>, userErrors: Array<Pick<AdminTypes.MetafieldDefinitionCreateUserError, 'field' | 'message'>> }> };

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


export type GetProductsByFowardPaginationQuery = { products: { edges: Array<{ node: (
        Pick<AdminTypes.Product, 'id' | 'title' | 'status' | 'handle'>
        & { wishlistCount?: AdminTypes.Maybe<Pick<AdminTypes.Metafield, 'value'>> }
      ) }>, pageInfo: Pick<AdminTypes.PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'> } };

export type GetProductsByBackwardPaginationQueryVariables = AdminTypes.Exact<{
  numProducts: AdminTypes.Scalars['Int']['input'];
  cursor?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type GetProductsByBackwardPaginationQuery = { products: { edges: Array<{ node: (
        Pick<AdminTypes.Product, 'id' | 'title' | 'status' | 'handle'>
        & { wishlistCount?: AdminTypes.Maybe<Pick<AdminTypes.Metafield, 'value'>> }
      ) }>, pageInfo: Pick<AdminTypes.PageInfo, 'startCursor' | 'endCursor' | 'hasPreviousPage' | 'hasNextPage'> } };

interface GeneratedQueryTypes {
  "#graphql\n  query getProductMetafieldDefinition{\n    metafieldDefinitions(namespace: \"wishlist\", key: \"count\" ownerType: PRODUCT, first: 1) {\n      edges {\n        node {\n          name\n          type {\n            name\n          }\n        }\n      }\n    }\n  }\n": {return: GetProductMetafieldDefinitionQuery, variables: GetProductMetafieldDefinitionQueryVariables},
  "#graphql\n  query getCustomerMetafieldDefinition{\n    metafieldDefinitions(namespace: \"wishlist\", key: \"items\", ownerType: CUSTOMER, first: 1) {\n      edges {\n        node {\n          name\n          type {\n            name\n          }\n        }\n      }\n    }\n  }\n": {return: GetCustomerMetafieldDefinitionQuery, variables: GetCustomerMetafieldDefinitionQueryVariables},
  "#graphql\nquery getProductByHandle($handle: String!) {\n  productByHandle(handle: $handle) {\n    id\n    title\n    handle\n    featuredImage {\n      url\n    }\n  }\n}": {return: GetProductByHandleQuery, variables: GetProductByHandleQueryVariables},
  "#graphql\n  query getProductById($id: ID!) {\n    product(id: $id) {\n      id\n      title\n      handle\n      featuredImage {\n        url\n      }\n    }\n  }\n": {return: GetProductByIdQuery, variables: GetProductByIdQueryVariables},
  "#graphql\n  query getProductsByFowardPagination($numProducts: Int!, $cursor: String) {\n    products (first: $numProducts, after: $cursor) {\n      edges {\n        node {\n          id\n          title\n          status\n          handle\n          wishlistCount: metafield(namespace: \"wishlist\", key: \"count\") {\n            value\n          }\n        }\n      },\n      pageInfo {\n        startCursor,\n        endCursor,\n        hasNextPage\n        hasPreviousPage\n      }\n    }\n  }\n": {return: GetProductsByFowardPaginationQuery, variables: GetProductsByFowardPaginationQueryVariables},
  "#graphql\n  query getProductsByBackwardPagination($numProducts: Int!, $cursor: String) {\n    products (last: $numProducts, before: $cursor) {\n      edges {\n        node {\n          id\n          title\n          status\n          handle\n          wishlistCount: metafield(namespace: \"wishlist\", key: \"count\") {\n            value\n          }\n        }\n      },\n      pageInfo {\n        startCursor,\n        endCursor,\n        hasPreviousPage\n        hasNextPage\n      }\n    }\n  }\n": {return: GetProductsByBackwardPaginationQuery, variables: GetProductsByBackwardPaginationQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\nmutation createProductMetafieldDefinition {\n  metafieldDefinitionCreate(\n    definition: {namespace: \"wishlist\", key: \"count\", name: \"Wishlist Count\", ownerType: PRODUCT, type: \"number_integer\"}\n  ) {\n    createdDefinition {\n      id\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}": {return: CreateProductMetafieldDefinitionMutation, variables: CreateProductMetafieldDefinitionMutationVariables},
  "#graphql\n  mutation createCustomerMetafieldDefinition {\n    metafieldDefinitionCreate(\n      definition: {\n        namespace: \"wishlist\"\n        key: \"items\",\n        name: \"Wishlist Items\",\n        ownerType: CUSTOMER,\n        type: \"list.metaobject_reference\",\n        validations: {\n          name: \"metaobject_definition_id\",\n          value: \"gid://shopify/MetaobjectDefinition/1014038582\"\n        }\n      }\n    ) {\n        createdDefinition {\n        id\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: CreateCustomerMetafieldDefinitionMutation, variables: CreateCustomerMetafieldDefinitionMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
