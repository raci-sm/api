# Dockerfile for api.raci.sm

FROM denoland/deno:1.28.3

# Change this with accordance to the port
EXPOSE 2222

WORKDIR /app
USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .
RUN deno cache main.ts

CMD ["run", "-A", "main.ts"]