import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

const hello = async (event: { source: string; body: { name: string } }) => {
  /** Immediate response for WarmUp plugin */
  if (event.source === "serverless-plugin-warmup") {
    console.log("WarmUp - Lambda is warm!");
    return "Lambda is warm!";
  }
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
