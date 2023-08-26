import express, { Request, Response } from "express";
import {validateCreatePlaylist, validateGetPlaylistById} from "../api/middlewares/playlistMiddleware";
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

export default router;
