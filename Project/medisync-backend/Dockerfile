# =========================================================
# Stage 1 - Build Spring Boot application
# =========================================================
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -DskipTests

COPY src ./src

RUN mvn clean package -DskipTests


# =========================================================
# Stage 2 - Spring Boot + MySQL in ONE container
# =========================================================
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# Install Java 21, MySQL and required utilities
RUN apt-get update && \
    apt-get install -y \
    openjdk-21-jre-headless \
    mysql-server \
    mysql-client \
    bash \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Spring Boot JAR
COPY --from=build /app/target/*.jar app.jar

# Copy SQL seed file
COPY medisync_dummy_data.sql /app/medisync_dummy_data.sql

# Copy startup script
COPY start.sh /app/start.sh

RUN chmod +x /app/start.sh

EXPOSE 8080

ENTRYPOINT ["/app/start.sh"]
