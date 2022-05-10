from flask import Flask, render_template

# Configure application
app = Flask(__name__)

# Engsure tempalte are auto-reloaded
app.config["TEMPALTES_AUTO_RELOAD"] = True

count = 0

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/canvas")
def canvas():
    return render_template("canvas.html")

if __name__ == '__main__':
    app.run(debug=True)