from flask import Flask, request, jsonify, render_template
from PIL import Image
import pytesseract
import re
import os
from groq import Groq
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

# Set Tesseract executable path (adjust as needed)
pytesseract.pytesseract.tesseract_cmd = r''

# Initialize the Groq client
os.environ['GROQ_API_KEY'] = ''
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# Function to extract text using OCR
def extract_text_from_image(image_path):
    try:
        text = pytesseract.image_to_string(Image.open(image_path))
        return normalize_text(text)
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""

# Normalize extracted text
def normalize_text(text):
    text = re.sub(r'\s+', ' ', text)  # Remove extra spaces/newlines
    text = re.sub(r'[^A-Za-z0-9,. ]+', '', text)  # Remove special characters
    return text

# Validate compliance using Groq
def validate_compliance_with_groq(extracted_text, country):
    message = {
        "role": "user",
        "content": (
            f"Check if the following document complies with {country} export regulations: {extracted_text}. "
            f"Highlight any discrepancies or missing compliance requirements."
        )
    }

    try:
        chat_completion = client.chat.completions.create(
            messages=[message],
            model="llama3-8b-8192"  # Adjust model based on requirements
        )
        compliance_check = chat_completion.choices[0].message.content if chat_completion.choices else ""
        return compliance_check
    except Exception as e:
        print(f"Error with Groq API: {e}")
        return "Error processing compliance check with Groq API."

# Determine compliance result
def determine_compliance(compliance_text):
    """Check compliance based on the response text from Groq."""
    # Example logic: If the response contains specific keywords like "does not comply" or "issues",
    # return False; otherwise, return True.
    non_compliance_keywords = ["does not comply", "issues", "discrepancies", "missing"]
    if any(keyword in compliance_text.lower() for keyword in non_compliance_keywords):
        return False
    return True

@app.route('/compliance_checker', methods=['GET', 'POST'])
def compliance_checker():
    if request.method == 'POST':
        # Retrieve uploaded file and country information
        uploaded_file = request.files.get('document')
        country = request.form.get('country')

        if uploaded_file and country:
            # Ensure the temp directory exists
            temp_dir = "./temp"
            os.makedirs(temp_dir, exist_ok=True)

            # Save file temporarily
            file_path = os.path.join(temp_dir, uploaded_file.filename)
            uploaded_file.save(file_path)

            # Step 1: Extract text from the uploaded file
            extracted_text = extract_text_from_image(file_path)

            if not extracted_text:
                return jsonify({"error": "Could not extract text from the document."}), 400

            # Step 2: Validate compliance using Groq
            compliance_result = validate_compliance_with_groq(extracted_text, country)

            # Step 3: Parse the compliance result to True/False
            is_compliant = determine_compliance(compliance_result)

            # Step 4: Return the True/False result
            return jsonify({
                "country": country,
                "compliance_result": is_compliant
            })

        return jsonify({"error": "Please provide a document and select a country."}), 400

    return render_template('compliance_checker.html')


@app.route("/")
def home():
    return render_template("compliance_checker.html")  # Or redirect to another route

# Run the Flask app
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
