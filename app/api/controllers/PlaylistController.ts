import { NextFunction, Request, Response } from "express";
import { CreatePlaylistRequestI, GetPlaylistByIdBodyI, GetPlaylistsBodyI } from "../interfaces/playlists";
import PlaylistRepository from "../repositories/PlaylistRepository";

export default class PlaylistController {
	private playlistRepository: PlaylistRepository;

	/**
	 * Playlist Controller constructor
	 */
	constructor() {
		// create an instance of PlaylistRepository class
		this.playlistRepository = new PlaylistRepository();
	}

	/**
	 * Create new playlist
	 *
	 * @param req
	 * @param res
	 * @param next
	 * @returns
	 */
	public async create(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | undefined> {
		try {
			// add request body params to the new variable
			const params: CreatePlaylistRequestI = req.body;

			// create new playlist
			const playlistDetails = await this.playlistRepository.createPlaylist(
				params
			);

			// return response containing playlist details
			return res.json({
				playlist: playlistDetails,
				params: params,
			});
		} catch (err: any) {
			next(err);
		}
	}

	/**
	 * get a playlist by Id
	 *
	 * @param req
	 * @param res
	 * @param next
	 * @returns
	 */
	public async getById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | undefined> {
		try {
			// add request body params to the new variable
			const params: GetPlaylistByIdBodyI = req.body;

			// get playlist by id
			const playlistDetails = await this.playlistRepository.getPlaylistById(
				params
			);

			// return response containing playlist details
			return res.json({
				playlist: playlistDetails,
				params: params,
			});
		} catch (err: any) {
			next(err);
		}
	}

	/**
	 * get multiple playlists with pagination
	 *
	 * @param req
	 * @param res
	 * @param next
	 * @returns
	 */
		public async getPlaylists(
			req: Request,
			res: Response,
			next: NextFunction
		): Promise<Response | undefined> {
			try {
				// add request body params to the new variable
				const params: GetPlaylistsBodyI = req.body;

				// get multiple playlists
				const {playlists, lastPage} = await this.playlistRepository.getPlaylists(
					params
				);

				const nextPageQuery = lastPage <= params.page ? undefined : `/playlists?count=${params.count}&page=${params.page + 1}`

				// return response containing playlists details and next page query params
				return res.json({
					playlists,
					nextPageQuery,
					lastPage,
					params: params,
				});
			} catch (err: any) {
				next(err);
			}
		}
}