# Stage 1: Build the application
FROM maven:3.9.5-eclipse-temurin-21 as build
WORKDIR /app

# Copy source and build
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:21-jdk-slim
WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /app/target/chatbot-0.0.1-SNAPSHOT.jar app.jar

# Run the jar
CMD ["java", "-jar", "app.jar"]

EXPOSE 8080