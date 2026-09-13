from app import create_app


def test_health_endpoint_returns_ok():
    app = create_app()
    client = app.test_client()

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json["status"] == "ok"
    assert response.json["service"] == "MoviePicturePipeline"


def test_movies_endpoint_returns_movies():
    app = create_app()
    client = app.test_client()

    response = client.get("/movies")

    assert response.status_code == 200
    assert "movies" in response.json
    assert response.json["count"] == 3
    assert len(response.json["movies"]) == 3


def test_movies_payload_has_expected_shape():
    app = create_app()
    client = app.test_client()

    response = client.get("/movies")

    movie = response.json["movies"][0]
    assert "id" in movie
    assert "title" in movie
    