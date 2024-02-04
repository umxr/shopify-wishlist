import {
  FORWARD_PAGINATION_QUERY,
  BACKWARD_PAGINATION_QUERY,
} from "./gql/product";

type GetPaginationQueryInput = URLSearchParams;
type GetPaginationQueryResult = {
  query: string;
  variables: Record<string, any>;
};

export const getPaginationQuery = (
  searchParams: GetPaginationQueryInput,
): GetPaginationQueryResult => {
  const numProductsForward = Number(searchParams.get("first")) || 10;
  const cursorForward = searchParams.get("after") || null;
  const numProductsBackward = Number(searchParams.get("last")) || 10;
  const cursorBackward = searchParams.get("before") || null;

  if (cursorForward) {
    return {
      query: FORWARD_PAGINATION_QUERY,
      variables: { numProducts: numProductsForward, cursor: cursorForward },
    };
  } else if (cursorBackward) {
    return {
      query: BACKWARD_PAGINATION_QUERY,
      variables: { numProducts: numProductsBackward, cursor: cursorBackward },
    };
  } else {
    return {
      query: FORWARD_PAGINATION_QUERY,
      variables: { numProducts: numProductsForward, cursor: null },
    };
  }
};
