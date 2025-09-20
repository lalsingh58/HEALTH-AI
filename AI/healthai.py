
# !pip install transformers torch flask pyngrok --upgrade


from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from pyngrok import ngrok


MODEL_NAME = "google/flan-t5-large"  
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)


app = Flask(__name__)


ngrok.set_auth_token("YOUR TOKEN")  


public_url = ngrok.connect(5000)
print("Public URL:", public_url)


@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    query = data.get("query", "")
    if not query:
        return jsonify({"error": "No query provided"}), 400


    inputs = tokenizer(query, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=200)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({"response": response})


app.run(port=5000)