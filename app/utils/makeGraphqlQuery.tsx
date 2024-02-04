type GraphqlQueryInput = {
  query: string;
  variables?: Record<string, any>;
};
type GraphqlQueryResult = any;

export const makeGraphqlQuery = (
  admin: any,
): ((input: GraphqlQueryInput) => Promise<GraphqlQueryResult>) => {
  return async ({ query, variables = {} }) => {
    return admin.graphql(query, { variables });
  };
};
