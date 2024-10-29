import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import connectDb from "./db.js";
import User from "./Models/User.js";
import Artista from "./Models/Artistas.js";
import Musica from "./Models/Musicas.js";
import Playlist from "./Models/Playlists.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const conexao = await connectDb();

conexao.on("error", (erro) => {
  console.error("Erro ao conectar no MongoDB", erro);
});

conexao.once("open", () => {
  console.log("Conectado no MongoDB");
});

app.get("/categorias/:tipo", async (req, res) => {
  const { tipo } = req.params;
  try {
    let data;
    if (tipo === "artistas") data = await Artista.find();
    else if (tipo === "musicas") data = await Musica.find();
    else if (tipo === "playlists") data = await Playlist.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao carregar categoria", error });
  }
});

app.get("/categorias/:tipo/:id", async (req, res) => {
  const { tipo, id } = req.params;
  try {
    let item;
    if (tipo === "artistas") item = await Artista.findById(id);
    else if (tipo === "musicas") item = await Musica.findById(id);
    else if (tipo === "playlists") item = await Playlist.findById(id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Erro ao carregar detalhes", error });
  }
});

app.post("/upload-profile-image", async (req, res) => {
  if (!req.files || !req.files.profileImage) {
    return res.status(400).json({ message: "Nenhuma imagem foi enviada" });
  }

  const imageFile = req.files.profileImage;
  const uploadPath = `/uploads/${imageFile.name}`;

  try {
    await imageFile.mv(`.${uploadPath}`);
    const user = await User.create({ profileImage: uploadPath });
    res.status(200).json({ message: "Imagem enviada com sucesso", user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar a imagem", error });
  }
});

app.listen(3000, () => {
  console.log("Servidor conectado");
});
