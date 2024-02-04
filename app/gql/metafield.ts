export const GET_PRODUCT_METAFIELD_DEFFINITION_QUERY = `#graphql
  query getProductMetafieldDefinition{
    metafieldDefinitions(namespace: "wishlist", key: "count" ownerType: PRODUCT, first: 1) {
      edges {
        node {
          name
          type {
            name
          }
        }
      }
    }
  }
`;

export const GET_CUSTOMER_METAFIELD_DEFFINITION_QUERY = `#graphql
  query getCustomerMetafieldDefinition{
    metafieldDefinitions(namespace: "wishlist", key: "items", ownerType: CUSTOMER, first: 1) {
      edges {
        node {
          name
          type {
            name
          }
        }
      }
    }
  }
`;

export const PRODUCT_METAFIELD_DEFFINITION_MUTATION = `#graphql
mutation createProductMetafieldDefinition {
  metafieldDefinitionCreate(
    definition: {namespace: "wishlist", key: "count", name: "Wishlist Count", ownerType: PRODUCT, type: "number_integer"}
  ) {
    createdDefinition {
      id
    }
    userErrors {
      field
      message
    }
  }
}`;

export const CUSTOMER_METAFIELD_DEFFINITION_MUTATION = `#graphql
  mutation createCustomerMetafieldDefinition {
    metafieldDefinitionCreate(
      definition: {
        namespace: "wishlist"
        key: "items",
        name: "Wishlist Items",
        ownerType: CUSTOMER,
        type: "list.metaobject_reference",
        validations: {
          name: "metaobject_definition_id",
          value: "gid://shopify/MetaobjectDefinition/1014038582"
        }
      }
    ) {
        createdDefinition {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
