FROM maven:3.9.3-eclipse-temurin-17-alpine AS java
WORKDIR /app
COPY ./ ./
RUN mvn clean install

FROM nginx:1.24-alpine3.17 AS web

ENV LANG=en_US.UTF-8 LANGUAGE=en_US:en LC_ALL=en_US.UTF-8 TZ=UTC
ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:17.0.7_7-jre-alpine $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"

WORKDIR /webapp
COPY --from=java /app/target/demo-0.0.1-SNAPSHOT.jar ./app.jar
RUN chmod +x ./app.jar
RUN mkdir uploads

EXPOSE 3002
CMD ["java", "-jar", "/webapp/app.jar"]
