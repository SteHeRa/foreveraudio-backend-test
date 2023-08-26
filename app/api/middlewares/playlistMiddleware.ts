import { NextFunction, Request, Response } from "express";
import { CreatePlaylistRequestI, GetPlaylistByIdRequestI} from "../interfaces/playlists";

/**
 * Playlist generator validator
 */
export function validateCreatePlaylist(req: Request, _res: Response, next: NextFunction) {
	try {
		const params: Partial<CreatePlaylistRequestI> = req.body;

		// Validate playlist request object
		validatePlaylistDetails("title", params.title);
		validatePlaylistDetails("description", params.description, 200);

		next();
	} catch (err) {
		next(err);
	}
};

/**
 * Get playlist by Id validator
 */
export function validateGetPlaylistById(req: Request, _res: Response, next: NextFunction) {
	try {
		const params: Partial<GetPlaylistByIdRequestI> = req.params;

		// Validate playlist request object
		validatePlaylistId(params.playlistId);

		req.body = { playlistId: params.playlistId }

		next();
	} catch (err) {
		next(err);
	}
};

/**
 * Check if the playlist details are valid
 *
 * @param title
 */
function validatePlaylistDetails(
	paramKey: "title" | "description",
	content?: string,
	characterLimit: number = 100
): void {
	if (!content) {
		throw new Error(
			`Invalid Request. Given value: ${content} for ${paramKey} is invalid`
		);
	}

	if (content.length > characterLimit) {
		throw new Error(
			`Invalid Request. Value for ${paramKey} is exceeds maximum character limit of ${characterLimit}`
		);
	}
}

/**
 * Check if the playlist id is valid
 *
 * @param id
 */
function validatePlaylistId(
	id?: string,
	): void {
		if (!id) {
			throw new Error(
				`Invalid Request. Given value: ${id} for playlistId is invalid`
			);
		}

		const parsedId = parseInt(id)

		if (typeof parsedId !== "number") {
			throw new Error(
				`Invalid Request. Given value: ${id} for playlistId is invalid`
			);
		}
	}
