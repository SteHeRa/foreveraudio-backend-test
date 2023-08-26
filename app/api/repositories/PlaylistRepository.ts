import { PlaylistDetailsI, CreatePlaylistRequestI, GetPlaylistByIdRequestI } from "../interfaces/playlists";
import PlaylistModel from "../models/Playlist";

export default class PlaylistRepository {
	protected playlistModel: PlaylistModel;

	constructor() {
		this.playlistModel = new PlaylistModel();
	}

	/**
	 * Create  a new playlist in the database
	 * and playlist details
	 * @param playlistDetails
	 * @returns
	 */
	public async createPlaylist(
		playlistDetails: CreatePlaylistRequestI
	): Promise<PlaylistDetailsI> {
		const playlistId = await this.playlistModel.save(playlistDetails);
		const details = await this.playlistModel.getPlaylistById(playlistId);

		return details;
	}

	/**
	 * get a specific playlist from the database by id
	 * @param playlistId
	 * @returns
	 */
	public async getPlaylistById(
		{playlistId}: GetPlaylistByIdRequestI
	): Promise<PlaylistDetailsI> {
		const id = parseInt(playlistId)
		const details = await this.playlistModel.getPlaylistById(id);

		return details;
	}


}
