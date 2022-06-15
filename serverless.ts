import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";

const serverlessConfiguration: AWS = {
  service: "serverless-nodejs-aws-lambda",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-plugin-warmup"],
  provider: {
    name: "aws",
    region: "ap-northeast-1",
    runtime: "nodejs16.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { hello },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 1,
    },
    warmup: {
      default: {
        enabled: true,
        package: {
          individually: true,
          patterns: ['**/*.ts', '.warmup/**'],
        }
      },
    },
  },
};

module.exports = serverlessConfiguration;
