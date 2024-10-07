# Following: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md

ARG NODE_VERSION=18.20.2

# -------------------------< Build Stage >-------------------------
FROM node:${NODE_VERSION}-alpine AS build

ARG PNPM_VERSION=9

# The app to be deployed
ARG APP

ENV REDISMS_DISABLE_POSTINSTALL 1

RUN echo "Building $APP"

RUN apk --no-cache add g++ make py3-pip

# Install pnpm
RUN npm i --no-fund -g pnpm@$PNPM_VERSION

# Set the working directory
WORKDIR /app

# Copy files required by pnpm install (pnpm fetch only requires the lockfile)
COPY .npmrc pnpm-lock.yaml ./

# Fetch dependencies into virtual store, based on the pnpm-lock.yaml file
RUN pnpm fetch

# Copy the enitre monorepo project
COPY . .

# Install dependencies based on the pnpm-lock.yaml file
RUN pnpm i --offline --frozen-lockfile

# Build the project
RUN pnpm nx run $APP:build

# Create a deployable version of the specified APP
RUN pnpm --filter=$APP --prefer-offline --prod deploy deployable

RUN echo "check folder build $APP"
RUN ls -la /app

# -------------------------< Production Stage >-------------------------
FROM node:${NODE_VERSION}-alpine AS production

RUN apk --no-cache add tini

# Set the NODE_ENV to production
ENV NODE_ENV production

# Set the PORT to 3000
ENV PORT 3000

# Set the working directory
WORKDIR /app

# Copy the deployable version of the specified APP from the build stage
COPY --chown=node:node --from=build /app/deployable .


RUN echo "check folder product $APP"
RUN ls -la /app

# Set the user
USER node

# Expose the application port
EXPOSE 3000

# Set the entrypoint
ENTRYPOINT [ "/sbin/tini", "--" ]

# Finally start the APP
CMD [ "node", "." ]
