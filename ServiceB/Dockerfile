FROM maven:3.9.3-eclipse-temurin-17-alpine AS java
WORKDIR /app
COPY ./ ./
RUN mvn clean install

FROM eclipse-temurin:17.0.7_7-jre-alpine AS web
WORKDIR /webapp
COPY --from=java /app/target/demo-0.0.1-SNAPSHOT.jar ./app.jar
RUN mkdir uploads

EXPOSE 3002
CMD ["java", "-jar", "/webapp/app.jar"]
