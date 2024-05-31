import Song from "../models/songsModel";
import { Request, Response } from "express";
import { Op } from "sequelize";
import User from "../models/userModel";
import { error } from "console";
const getSongs = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtenemos los filtros de la consulta GET
    const filters = req.query;

    // Construimos la consulta
    const query: any = {
      where: {}
    };

    // Añadimos los filtros dinámicamente si existen
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        // Verificamos si el campo existe en el modelo Song
        if (Object.prototype.hasOwnProperty.call(Song.rawAttributes, key)) {
          // Añadimos el filtro para este campo
          query.where[key] = {
            [Op.eq]: value
          };
        }
      });
    }

    // Realizamos la consulta
    const songs = await Song.findAll(query);

    res.json(songs);
  } catch (error) {
    console.error('Error al obtener canciones:', error);
    res.status(500).json({ error: 'Error al obtener canciones' });
  }
};

const insertSong = async (req: Request, res: Response) => {
  console.log(req.body)
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  else {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      },
      attributes: ["id"]
    })
    try {
      if (userData) {
        const [song, created] = await Song.findOrCreate({
          where: {
            nombre: req.body.nombre,
            autor: req.body.autor,
            duracion: req.body.duracion,
          }, defaults: {
            nombre: req.body.nombre,
            autor: req.body.autor,
            duracion: req.body.duracion,
            fecha_lanzamiento: req.body.fecha_lanzamiento,
            genero: req.body.genero,
            portada: req.body.portada,
            archivo_mp3: req.body.archivo_mp3,
            usuario_id: userData.id
          }
        })
        if (created) {
          res.status(200).send({ text: "Canción insertada correctamente" });
        }
        else {
          res.status(200).send({ text: "Canción ya existente, skipping" });
        }
      }
      else {
        throw error
      }
    } catch (error) {
      console.log(error)
      res.status(400).send({ text: "Problemas al insertar la cancion" });
    }
  }
}

const updateSong = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length > 0) {
    const song = await Song.findOne({
      where: {
        id: req.params.id
      }
    })
    await Song.update({ ...song, ...req.body }, { where: { id: req.params.id } })
    res.send({ text: "Canción actualizada correctamente" });
  }
}
const deleteSong = (req: Request, res: Response) => {
  Song.destroy({
    where: {
      id: req.params.id
    }
  }).then((result) => {
    if (result === 1) {
      res.status(200).send({ text: "Canción eliminada correctamente" });
    } else {
      res.status(400).send({ text: "No se pudo eliminar la cancion" });
    }
  })
}

export { getSongs, insertSong,updateSong,deleteSong }