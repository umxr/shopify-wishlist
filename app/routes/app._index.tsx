import { useCallback } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { Page, Text, Card, Link, IndexTable, Badge } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { makeGraphqlQuery } from "~/utils/makeGraphqlQuery";
import { getPaginationQuery } from "~/product.server";
import type { GetProductByIdQuery } from "~/types/admin.generated";
import type { PageInfo } from "~/types/admin.types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const url = new URL(request.url);

  const { query, variables } = getPaginationQuery(url.searchParams);

  try {
    const productsRequest = await makeGraphqlQuery(admin)({
      query,
      variables,
    });
    const productsResponse = await productsRequest.json();
    const pagination: PageInfo = productsResponse.data.products.pageInfo;
    const products: GetProductByIdQuery["product"][] =
      productsResponse.data.products.edges.map((edge: any) => edge.node);

    return json({
      products,
      pagination: {
        ...pagination,
        first: variables.numProducts,
        last: variables.numProducts,
      },
    });
  } catch (error) {
    console.error("Error fetching products", error);
    return json({
      products: [],
      pagination: null,
    });
  }
};

type Status = "ACTIVE" | "ARCHIVED" | "DRAFT";

const STATUS_MAP: Record<Status, string> = {
  ACTIVE: "success",
  ARCHIVED: "new",
  DRAFT: "info",
};

export default function Index() {
  const { pagination, products } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [_, setSearchParams] = useSearchParams();

  const navigatePage = useCallback(
    (cursor: string, isNext: boolean) => {
      const params = new URLSearchParams();
      if (isNext) {
        params.set("after", cursor);
        params.delete("before");
        params.set("first", pagination?.first.toString());
        params.delete("last");
      } else {
        params.set("before", cursor);
        params.delete("after");
        params.set("last", pagination?.last.toString());
        params.delete("first");
      }
      setSearchParams(params);
    },
    [pagination?.first, pagination?.last, setSearchParams],
  );

  return (
    <Page title="Wishlist">
      <Card roundedAbove="sm" padding="0">
        <IndexTable
          selectable={false}
          loading={navigation.state === "loading"}
          resourceName={{
            singular: "product",
            plural: "products",
          }}
          itemCount={products.length}
          headings={[
            { title: "Title" },
            {
              title: "Status",
            },
          ]}
          pagination={{
            hasNext: pagination?.hasNextPage,
            hasPrevious: pagination?.hasPreviousPage,
            onNext: () => navigatePage(pagination?.endCursor as string, true),
            onPrevious: () =>
              navigatePage(pagination?.startCursor as string, false),
          }}
        >
          {products.map(({ id, title, status, handle }, index) => {
            const formattedStatus =
              status.charAt(0) + status.slice(1).toLowerCase();

            return (
              <IndexTable.Row id={id} key={id} position={index}>
                <IndexTable.Cell>
                  <Link dataPrimaryLink url={handle}>
                    <Text fontWeight="bold" as="span">
                      {title}
                    </Text>
                  </Link>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Badge tone={STATUS_MAP[status as Status]}>
                    {formattedStatus}
                  </Badge>
                </IndexTable.Cell>
              </IndexTable.Row>
            );
          })}
        </IndexTable>
      </Card>
    </Page>
  );
}
