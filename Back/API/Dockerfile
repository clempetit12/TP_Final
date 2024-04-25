FROM maven:3.8.1 as builder

WORKDIR /app


COPY /pom.xml .
RUN mvn clean dependency:go-offline


COPY /src ./src
RUN mvn package -DskipTests



FROM openjdk:17

WORKDIR /app


COPY --from=builder /app/target/API.jar .

# Exécution de l'application Spring Boot
ENTRYPOINT ["java", "-jar", "API.jar"]