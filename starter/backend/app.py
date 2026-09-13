from flask import Flask, jsonify

from movies import catalogue


def create_app():
    app = Flask(__name__)

    @app.get("/health")
    def health():
        return jsonify(status="ok", service="MoviePicturePipeline"), 200

    @app.get("/movies")
    def get_movies():
        movies = catalogue()
        return jsonify(count=len(movies), movies=movies), 200

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
