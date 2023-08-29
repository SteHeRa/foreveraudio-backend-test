import { pool } from "../../config/database";
import { PlaylistDetailsI, CreatePlaylistRequestI, GetPlaylistsBodyI, GetPlaylistsResultI } from "../interfaces/playlists";

export default class PlaylistModel {
	/**
	 * Save new playlist into the database
	 *
	 * @param playlistDetails
	 * @returns last insert
	 */
	public async save(playlistDetails: CreatePlaylistRequestI): Promise<number> {
		try {
			const results = await pool.query(
				`
          INSERT INTO playlists
          SET datetime_created = NOW(), ?`,
				{
					title: playlistDetails.title,
					description: playlistDetails.description,
				}
			);

			return results.insertId;
		} catch (err: any) {
			throw Error("Failed to save a new playlist.");
		}
	}

	/**
	 * Get playlist details from database by playlist ID
	 * @param id
	 * @returns
	 */
	public async getPlaylistById(id: number): Promise<PlaylistDetailsI> {
		try {
			const results = await pool.query(
				`SELECT id, title, description, datetime_created FROM playlists WHERE id =? `,
				id
			);

			let formattedResults: PlaylistDetailsI[] = Object.values(
				JSON.parse(JSON.stringify(results))
			);

			return formattedResults[0];
		} catch (err: any) {
			throw Error("Failed to get a playlist by given ID value.");
		}
	}

	/**
	 * Get multiple playlist details from database with pagination
	 * @param id
	 * @returns
	 */
	public async getPlaylists({count, page}: GetPlaylistsBodyI): Promise<GetPlaylistsResultI> {

		let offset = count * page


		try {
			const playlistsCount = (await pool.query('SELECT COUNT(*) FROM playlists'))[0]["COUNT(*)"];

			let lastPage = Math.max(0, Math.ceil(playlistsCount / count) - 1)

			// if query is asking for a page beyond the last page just return results from the last page
			if (lastPage < page) {
				offset = count * lastPage
			}

			const start = 1 + offset
			const end = count + offset

			const results = await pool.query(
				`SELECT id, title, description, datetime_created FROM playlists WHERE id BETWEEN ? AND ?`,
				[start, end]
			);

			let formattedResults: PlaylistDetailsI[] = Object.values(
				JSON.parse(JSON.stringify(results))
			);

			return {playlists: formattedResults, lastPage};
		} catch (err: any) {
			throw Error("Failed to get playlists.");
		}
	}
}
