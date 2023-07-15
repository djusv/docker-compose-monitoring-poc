FROM denoland/deno:alpine-1.35.0 as deno
WORKDIR /app
COPY ./ ./
RUN deno compile --output ./deno-app --allow-all main.ts -- -p 3003

FROM denoland/deno:alpine-1.35.0 AS web
WORKDIR /webapp
COPY --from=deno /app/deno-app ./deno-app
COPY --from=deno /app/static/ ./static/
RUN chmod +x ./deno-app
RUN mkdir uploads

EXPOSE 3003
CMD [ "./deno-app" ]
