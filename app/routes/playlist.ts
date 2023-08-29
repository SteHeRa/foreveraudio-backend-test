import express, { Request, Response } from "express";
import {validateCreatePlaylist, validateGetPlaylistById, validateGetPlaylists} from "../api/middlewares/playlistMiddleware";
import PlaylistController from "../api/controllers/PlaylistController";
const router = express.Router();

const playlistController = new PlaylistController();

/**
 * Create a new playlist in the database
 */
router.post(
	"/",
	validateCreatePlaylist,
	playlistController.create.bind(playlistController)
);

/**
 * Get a playlist from the database
 */
router.get("/:playlistId", validateGetPlaylistById, playlistController.getById.bind(playlistController))

/**
 * Get multiple playlists from database with pagination
 */

router.get("/", validateGetPlaylists, playlistController.getPlaylists.bind(playlistController))


export default router;
