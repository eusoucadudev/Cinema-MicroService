const { validateToken } = require("../middlewares/validationMiddlewares");

module.exports = (app, repository) => {
  app.get(
    "/cities/:cityId/movies/movieId",
    validateToken,
    async (req, res, next) => {
      const sessions = await repository.getMovieSessionsByCityId(
        req.params.cityId,
        req.params.movieId
      );
      if (!sessions) return res.sendStatus(404);
      res.json(sessions);
    }
  );

  app.get("/cities/:cityId/movies", validateToken, async (req, res, next) => {
    const movies = await repository.getMoviesByCityId(req.params.cityId);
    if (!movies) return res.sendStatus(404);
    res.json(movies);
  });

  app.get("/cities/:cityId/cinemas", validateToken, async (req, res, next) => {
    const cinemas = await repository.getCinemasByCityId(req.params.cityId);
    if (!cinemas) return res.sendStatus(404);
    res.json(cinemas);
  });

  app.get("/cities", validateToken, async (req, res, next) => {
    const cities = await repository.getAllCities();
    res.json(cities);
  });

  app.get(
    "/cinemas/:cinemaId/movies/:movieId",
    validateToken,
    async (req, res, next) => {
      const sessions = await repository.getMovieSessionsByCinemaId(
        req.params.movieId,
        req.params.cinemaId
      );
      if (!sessions) return res.sendStatus(404);
      res.json(sessions);
    }
  );

  app.get(
    "/cinemas/:cinemaId/movies",
    validateToken,
    async (req, res, next) => {
      const movies = await repository.getMoviesByCinemaId(req.params.cinemaId);
      if (!movies) return res.sendStatus(404);
      res.json(movies);
    }
  );
};
