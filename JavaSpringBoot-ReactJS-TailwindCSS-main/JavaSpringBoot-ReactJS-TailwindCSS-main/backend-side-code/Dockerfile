# Use an official OpenJDK image as a parent image
FROM openjdk:17-jdk-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the Gradle build files
COPY build.gradle .
COPY gradlew .
COPY gradle ./gradle

# Download and cache Gradle dependencies
RUN ./gradlew dependencies

# Copy the application source code
COPY src ./src

# Build the application
RUN ./gradlew build

# Use a lighter weight base image for the runtime environment
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the executable JAR file from the build stage
COPY --from=build /app/build/libs/app.jar /app/app.jar

# Expose port 3000
EXPOSE 3000

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
