const { ObjectId } = require("mongodb");

const cinemaCatalog = [
  {
    cidade: "Gravataí",
    uf: "RS",
    cinemas: [],
  },
  {
    cidade: "Porto Alegre",
    uf: "RS",
    pais: "BR",
    cinemas: [
      {
        _id: new ObjectId("62c723af0cf22f235d021bcf"),
        nome: "Cinemark Bourbon Ipiranga",
        salas: [
          {
            nome: 1,
            sessoes: [
              {
                data: new Date("2022-07-01T09:00:00Z"),
                idFilme: "62c723af0cf22f235d021bcf",
                filme: "Vingadores: Guerra Infinita",
                valor: 25.0,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                ],
              },
              {
                data: new Date("2022-07-01T11:00:00Z"),
                idFilme: new ObjectId("62c723af0cf22f235d021bcf"),
                filme: "Vingadores: Guerra Infinita",
                valor: 25.0,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
              {
                data: new Date("2022-06-01T13:00:00Z"),
                idFilme: new ObjectId("62bb165ad65e520ccdc3d837"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.0,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
            ],
          },
          {
            nome: 2,
            sessoes: [
              {
                data: new Date("2022-06-01T09:00:00Z"),
                idFilme: new ObjectId("62bb165ad65e520ccdc3d837"),
                filme: "Vingadores: Era de Ultron",
                valor: 25.0,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                ],
              },
              {
                data: new Date("2022-06-03T11:00:00Z"),
                idFilme: new ObjectId("62bb1588d65e520ccdc3d836"),
                filme: "Vingadores: Ultimato",
                valor: 25.0,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
              {
                data: new Date("2022-03-01T13:00:00Z"),
                idFilme: new ObjectId("62bb1588d65e520ccdc3d836"),
                filme: "Vingadores: Ultimato",
                valor: 20.0,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        _id: new ObjectId(),
        nome: "GNC Lindóia",
        salas: [
          {
            nome: 100,
            sessoes: [
              {
                data: new Date("2022-03-30T19:00:00Z"),
                idFilme: new ObjectId("62bb1588d65e520ccdc3d836"),
                filme: "Vingadores: Ultimato",
                valor: 25.0,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                ],
              },
              {
                data: new Date("2022-03-30T11:00:00Z"),
                idFilme: new ObjectId("62bb1588d65e520ccdc3d836"),
                filme: "Vingadores: Ultimato",
                valor: 25.0,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
              {
                data: new Date("2022-03-30T13:00:00Z"),
                idFilme: new ObjectId("62bb165ad65e520ccdc3d837"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.0,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

async function getAllCities() {
  return cinemaCatalog.map((catalog) => {
    return {
      _id: new ObjectId("62bb165ad65e520ccdc3d837"),
      pais: catalog.pais,
      uf: catalog.uf,
      cidade: catalog.cidade,
    };
  });
}

function getCinemasByCityId(cityId) {
  if (cityId < 0) return null;
  return cinemaCatalog[cinemaCatalog.length - 1].cinemas;
}

function getMoviesByCinemaId(cinemaId) {
  if (cinemaId < 0) return null;
  return getCinemasByCityId().map((cinema) => {
    return {
      titulo: cinema.salas[0].sessoes[0].filme,
      _id: cinema.salas[0].sessoes[0].idFilme,
    };
  });
}

function getMoviesByCityId(cityId) {
  return getMoviesByCinemaId(cityId);
}

async function getMovieSessionsByCityId(movieId, cityId) {
  if (movieId < 0 || cityId < 0) return null;
  return getCinemasByCityId().map((cinema) => {
    return {
      titulo: cinema.salas[0].sessoes[0].filme,
      _id: cinema.salas[0].sessoes[0].idFilme,
      cinema: cinema.nome,
      idCinema: cinema._id,
      sala: cinema.salas[0].nome,
      sessao: cinema.salas[0].sessoes[0],
    };
  });
}

async function getMovieSessionsByCinemaId(movieId, cinemaId) {
  return getMovieSessionsByCityId(movieId, cinemaId);
}

module.exports = {
  getAllCities,
  getCinemasByCityId,
  getMoviesByCinemaId,
  getMoviesByCityId,
  getMovieSessionsByCityId,
  getMovieSessionsByCinemaId,
};
