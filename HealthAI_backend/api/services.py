import requests

# Update this to the current ngrok public URL
MODEL_SERVER_URL = "https://6d3f9cdd88c1.ngrok-free.app/ask"

def ask_model(query):
    """
    Sends a query to the Flask model server and returns the response.
    Handles timeouts and connection errors gracefully.
    """
    try:
        response = requests.post(
            MODEL_SERVER_URL,
            json={"query": query},
            timeout=300  # 5 minutes timeout for large models
        )
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        return data.get("response", "No response from model server")
    
    except requests.exceptions.Timeout:
        return "Error: Model server timed out. Try again later."
    
    except requests.exceptions.ConnectionError:
        return "Error: Could not connect to model server."
    
    except requests.exceptions.HTTPError as e:
        return f"Error contacting model server: {e}"
    
    except Exception as e:
        return f"Unexpected error: {e}"
