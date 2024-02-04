import { Suspense, useCallback, useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Await,
  defer,
  useActionData,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import {
  Page,
  Text,
  Card,
  Link,
  IndexTable,
  Badge,
  Spinner,
  BlockStack,
  Banner,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { makeGraphqlQuery } from "~/utils/makeGraphqlQuery";
import { getPaginationQuery } from "~/product.server";
import type { GetProductByIdQuery } from "~/types/admin.generated";
import type { PageInfo } from "~/types/admin.types";
import {
  CUSTOMER_METAFIELD_DEFFINITION_MUTATION,
  GET_CUSTOMER_METAFIELD_DEFFINITION_QUERY,
  GET_PRODUCT_METAFIELD_DEFFINITION_QUERY,
  PRODUCT_METAFIELD_DEFFINITION_MUTATION,
} from "~/gql/metafield";
import { RequestMethod } from "~/const";

type Status = "ACTIVE" | "ARCHIVED" | "DRAFT";
const metafieldCreationTypes = {
  createProductMetafieldDefinition: "createProductMetafieldDefinition",
  createCustomerMetafieldDefinition: "createCustomerMetafieldDefinition",
} as const;

const STATUS_MAP: Record<Status, string> = {
  ACTIVE: "success",
  ARCHIVED: "new",
  DRAFT: "info",
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const url = new URL(request.url);

  const { query, variables } = getPaginationQuery(url.searchParams);

  try {
    // Products
    const productsRequest = await makeGraphqlQuery(admin)({
      query,
      variables,
    });
    const productsResponse = await productsRequest.json();
    const pagination: PageInfo = productsResponse.data.products.pageInfo;
    const products: NonNullable<GetProductByIdQuery["product"]>[] =
      productsResponse.data.products.edges.map((edge: any) => {
        return {
          ...edge.node,
          wishlistCount: edge.node.wishlistCount
            ? edge.node.wishlistCount
            : {
                value: 0,
              },
        };
      });

    // Metafields
    const metafieldDefinitionQueries = Promise.all([
      makeGraphqlQuery(admin)({
        query: GET_PRODUCT_METAFIELD_DEFFINITION_QUERY,
      })
        .then((response) => response.json())
        .then((response) => {
          return response.data.metafieldDefinitions.edges.length === 0;
        }),
      makeGraphqlQuery(admin)({
        query: GET_CUSTOMER_METAFIELD_DEFFINITION_QUERY,
      })
        .then((response) => response.json())
        .then((response) => {
          return response.data.metafieldDefinitions.edges.length === 0;
        }),
    ]);

    return defer({
      products,
      pagination: {
        ...pagination,
        first: variables.numProducts,
        last: variables.numProducts,
      },
      metafieldDefinitionQueries,
    });
  } catch (error) {
    console.error("Error fetching products", error);
    return defer({
      products: [],
      pagination: null,
      metafieldDefinitionQueries: [false, false],
    });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  if (request.method !== RequestMethod.POST) {
    return json(
      { status: "error", message: "Request method not allowed" },
      { status: 400 },
    );
  }

  const formData = await request.formData();
  const type = formData.get("type") as keyof typeof metafieldCreationTypes;
  if (type === "createProductMetafieldDefinition") {
    try {
      await makeGraphqlQuery(admin)({
        query: PRODUCT_METAFIELD_DEFFINITION_MUTATION,
      });
      return json({
        status: "success",
        message: "Product metafield definition created",
      });
    } catch (error) {
      console.error("Error creating product metafield definition", error);
      return json(
        {
          status: "error",
          message: "Error creating product metafield definition",
        },
        { status: 500 },
      );
    }
  }
  if (type === "createCustomerMetafieldDefinition") {
    try {
      await makeGraphqlQuery(admin)({
        query: CUSTOMER_METAFIELD_DEFFINITION_MUTATION,
      });
      return json({
        status: "success",
        message: "Customer metafield definition created",
      });
    } catch (error) {
      console.error("Error creating customer metafield definition", error);
      return json(
        {
          status: "error",
          message: "Error creating customer metafield definition",
        },
        { status: 500 },
      );
    }
  }
};

export default function Index() {
  const { pagination, products, metafieldDefinitionQueries } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<{
    status: "success" | "error";
    message: string;
  }>();
  const navigation = useNavigation();
  const [_, setSearchParams] = useSearchParams();
  const submit = useSubmit();

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

  const createProductMetafieldDefinition = useCallback(() => {
    const formData = new FormData();
    formData.append(
      "type",
      metafieldCreationTypes.createProductMetafieldDefinition,
    );
    submit(formData, {
      method: "POST",
    });
  }, [submit]);

  const createCustomerMetafieldDefinition = useCallback(() => {
    const formData = new FormData();
    formData.append(
      "type",
      metafieldCreationTypes.createCustomerMetafieldDefinition,
    );
    submit(formData, {
      method: "POST",
    });
  }, [submit]);

  useEffect(() => {
    if (actionData?.status === "success") {
      window.shopify.toast.show(actionData.message, {
        duration: 3000,
      });
    } else if (actionData?.status === "error") {
      window.shopify.toast.show(actionData.message, {
        duration: 3000,
        isError: true,
      });
    }
  }, [actionData]);

  return (
    <Page title="Wishlist">
      <BlockStack gap="500">
        <Suspense fallback={<Spinner />}>
          <Await resolve={metafieldDefinitionQueries}>
            {([
              requiresProductMetafieldDefinitionCreation,
              requiresCustomerMetafieldDefinitionCreation,
            ]) => {
              if (
                !requiresProductMetafieldDefinitionCreation &&
                !requiresCustomerMetafieldDefinitionCreation
              )
                return null;
              return (
                <BlockStack gap="050">
                  <Banner
                    tone="warning"
                    action={
                      requiresProductMetafieldDefinitionCreation
                        ? {
                            content: "Create Product Metafield",
                            onAction: createProductMetafieldDefinition,
                          }
                        : undefined
                    }
                    secondaryAction={
                      requiresCustomerMetafieldDefinitionCreation
                        ? {
                            content: "Create Customer Metafield",
                            onAction: createCustomerMetafieldDefinition,
                          }
                        : undefined
                    }
                  >
                    <p>
                      You need to create metafield definitions for products and
                      customers to use this app.
                    </p>
                  </Banner>
                </BlockStack>
              );
            }}
          </Await>
        </Suspense>
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
              {
                title: "Wishlist Count",
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
            {products.map(
              ({ id, title, status, handle, wishlistCount }, index) => {
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
                    <IndexTable.Cell>
                      <Text as="span">{wishlistCount.value}</Text>
                    </IndexTable.Cell>
                  </IndexTable.Row>
                );
              },
            )}
          </IndexTable>
        </Card>
      </BlockStack>
    </Page>
  );
}
