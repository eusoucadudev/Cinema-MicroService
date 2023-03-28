const movies = [
  {
    _id: "62bb1588d65e520ccdc3d836",
    titulo: "Os Vingadores: Guerra Infinita",
    sinopse: "Os herois mais poderoso da marvel enfrentando o Thanos. De novo.",
    duracao: 120,
    dataLancamento: new Date("2022-07-07T00:00:00.000+00:00"),
    imagem: "http://www.luiztools.com.br/vingadores-gi.jpg",
    " categorias": ["Aventura", "Ação"],
  },
  {
    _id: "62bb165ad65e520ccdc3d837",
    titulo: "Os Vingadores: Era de Ultron",
    sinopse: "Os herois mais poderoso da marvel enfrentando o Ultron",
    duração: 110,
    dataLancamento: new Date("2016-05-01T00:00:00.000+00:00"),
    imagem: "http://www.luiztools.com.br/vingadores-gi.jpg",
    categorias: ["Aventura", "Ação"],
  },
  {
    _id: "62bb168fd65e520ccdc3d838",
    titulo: "Os Vingadores",
    sinopse: "Os herois mais poderoso da marvel enfrentando o Loki",
    duração: 100,
    dataLancamento: new Date("2014-05-01T00:00:00.000+00:00"),
    imagem: "http://www.luiztools.com.br/vingadores-gi.jpg",
    categorias: ["Aventura", "Ação"],
  },
  {
    _id: "62c723af0cf22f235d021bcf",
    titulo: "Os Vingadores: Guerra Infinita",
    sinopse: "Os herois mais poderoso da marvel enfrentando o Thanos",
    duração: 120,
    dataLancamento: new Date("2018-05-01T00:00:00.000+00:00"),
    imagem: "http://www.luiztools.com.br/vingadores-gi.jpg",
    categorias: ["Aventura", "Ação"],
  },
];

async function getAllMovies() {
  return movies;
}

async function getMovieById(id) {
  if (id == -1) return null;

  movies[0]._id = id;
  return movies[0];
}

async function getMoviePremieres() {
  movies[0].dataLancamento = new Date();
  return [movies[0]];
}

async function addMovie(movie) {
  return movies[0];
}

async function deleteMovie(id) {
  if (!id) throw new Error("Não foi possível excluir este filme!");
  return true;
}

module.exports = {
  getAllMovies,
  getMovieById,
  getMoviePremieres,
  addMovie,
  deleteMovie,
};
