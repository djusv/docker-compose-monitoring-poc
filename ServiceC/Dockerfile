FROM denoland/deno:alpine-1.35.0 as deno
WORKDIR /app
COPY ./ ./
RUN deno compile --output ./deno-app --allow-write --allow-env --allow-read --allow-net mod.ts -- -p 3003

FROM nginx:1.24-alpine3.17 AS web

ENV LANG=en_US.UTF-8 LANGUAGE=en_US:en LC_ALL=en_US.UTF-8 TZ=UTC
RUN addgroup --gid 1000 deno && adduser --uid 1000 --disabled-password deno --ingroup deno
COPY --from=denoland/deno:alpine-1.35.0 /usr/lib/libgcc_s.so.1 /usr/lib/libgcc_s.so.1
COPY --from=denoland/deno:alpine-1.35.0 /usr/glibc-compat /usr/glibc-compat
RUN ln -s /usr/glibc-compat/lib/ld-linux-x86-64.so.2 /lib/ld-linux-x86-64.so.2
RUN mkdir lib64
RUN ln -s /usr/glibc-compat/lib/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2

WORKDIR /webapp
COPY --from=deno /app/deno-app ./deno-app
COPY --from=deno /app/static/ ./static/
RUN chmod +x ./deno-app
RUN mkdir uploads

EXPOSE 3003
CMD [ "./deno-app" ]
