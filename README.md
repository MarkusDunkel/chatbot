### How to Deploy
1. Build the Deployable Docker Container
    - Build the frontend: Compile your frontend application and copy the build output into the backend’s /src/main/resources/static directory so it will be served by Spring Boot.

    - Build the Docker image: Run the following command in your project root to build the Docker container:
        ```bash 
        docker build -t chatbot-app .
        ```

    - Run the container locally (with mounted credentials): To test the application locally and provide Google Cloud credentials, run this command in PowerShell (adjust the path to your credentials file):
        ```bash
        docker run -p 8080:8080 `
        -v "C:\Users\mrksd\credentials\project-chatbot-google-cloud-credentials.json:/app/credentials.json:ro" `
        -e GOOGLE_APPLICATION_CREDENTIALS=/app/credentials.json `
        chatbot-app
        ```
