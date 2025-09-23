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

2. Deploying Your Application to Google Cloud Platform (GCP)
    - Use Google Cloud Build to create a Docker image and push it to Google Container Registry:
    ```bash
    gcloud builds submit --tag gcr.io/${YOUR_PROJECT_ID}/chatbot
    ```
    - What this does:
        1. gcloud builds submit: Invokes Cloud Build to build your container image.
        2. --tag gcr.io/${YOUR_PROJECT_ID}/chatbot: Tags the image with your project ID and desired image name, pushing it to your project's Container Registry.
    - Deploy Your Application to Cloud Run:
    ```bash
    gcloud run deploy chatbot \
    --image gcr.io/${YOUR_PROJECT_ID}/chatbot \
    --platform managed \
    --region europe-west4 \
    --allow-unauthenticated \
    --set-env-vars VERTEX_PROJECT_ID=${VERTEX_PROJECT_ID},VERTEX_LOCATION=${VERTEX_LOCATION}
    ```
