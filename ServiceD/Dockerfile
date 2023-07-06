FROM denoland/deno:alpine-1.34.3 as deno
WORKDIR /app
COPY ./ ./
RUN deno compile --output ./deno-app --allow-read --allow-net main.ts -- -p 3004

FROM nginx:1.24-alpine3.17 AS web

ENV LANG=en_US.UTF-8 LANGUAGE=en_US:en LC_ALL=en_US.UTF-8 TZ=UTC
RUN addgroup --gid 1000 deno && adduser --uid 1000 --disabled-password deno --ingroup deno
COPY --from=denoland/deno:alpine-1.34.3 /usr/lib/libgcc_s.so.1 /usr/lib/libgcc_s.so.1
COPY --from=denoland/deno:alpine-1.34.3 /usr/glibc-compat /usr/glibc-compat
RUN ln -s /usr/glibc-compat/lib/ld-linux-x86-64.so.2 /lib/ld-linux-x86-64.so.2
RUN mkdir lib64
RUN ln -s /usr/glibc-compat/lib/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2

WORKDIR /webapp
COPY --from=deno /app/deno-app ./deno-app
RUN chmod +x ./deno-app

EXPOSE 3004
CMD [ "./deno-app" ]
