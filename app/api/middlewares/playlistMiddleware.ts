import { NextFunction, Request, Response } from "express";
import { CreatePlaylistRequestI, GetPlaylistByIdRequestI, GetPlaylistsRequestI} from "../interfaces/playlists";

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
 * Get playlists validator
 */
export function validateGetPlaylists(req: Request, _res: Response, next: NextFunction) {
	try {
		const queryParams: Partial<GetPlaylistsRequestI> = req.query;

		// Validate playlist request object
		validateGetPlaylistsQueryParams(queryParams, req);

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


/**
 * Check for valid get playlists query params and give defaults
 *
 * @param params
 */
	function validateGetPlaylistsQueryParams(params: Partial<GetPlaylistsRequestI>, req: Request) {
		const {count, page} = params

		let parsedCount = count ? parseInt(count) : undefined
		let parsedPage = page ? parseInt(page) : undefined

		// if count is not provided or is invalid default to 10
		if (!parsedCount) {
			parsedCount = 10
		}

		// add upper limit to the amount of playlists we return
		// using an aribtrary value, it's hard to know how big this value
		// should be without context for how the endpoint will be used
		if (parsedCount > 100) {
			parsedCount = 100
		}

		// if page is not provided or is invalid default to first page
		if (!parsedPage) {
			// pages are 0 indexed
			parsedPage = 0
		}

		req.body = {count: parsedCount, page: parsedPage}
	}
