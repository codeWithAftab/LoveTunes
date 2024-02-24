
class SaavnAPI {
    constructor(){
        this.base_url = "https://saavn.dev"
        this.available_languages = ["hindi", "english", "punjabi", "tamil", "telugu", "marathi", "gujarati", "bengali", "kannada", "bhojpuri", "malayalam", "urdu", "haryanvi", "rajasthani", "odia", "assamese"]
        this.endpoints = {
            homePage: `modules`,
            searchAll: `search/all`,
            searchSongs: `search/songs`,
            searchAlbums: `search/albums`,
            searchArtists: `search/artists`,
            songDetails: `songs`,
            albumDetails: `albums`,
            artistDetails: `artists`,
            playlistDetails: `playlists`,
        }
    }

    async getHomePageData(prefred_languages){
        const params = `${this.endpoints["homePage"]}?language=${prefred_languages}`
        const data = await this._get_response(params);
        return data
    }

    async searchSong(query){
        const params = `${this.endpoints.searchSongs}?query=${query}&limit=30`
        const data = await this._get_response(params);
        return data
    }

    async albumDetails(album_id){
        const params = `${this.endpoints.albumDetails}?id=${album_id}`
        const data = await this._get_response(params);
        return data
    }
    async playlistDetails(playlist_id){
        const params = `${this.endpoints.playlistDetails}?id=${playlist_id}`
        const data = await this._get_response(params);
        return data
    }

    async _get_response(params_endpoint){
        const url = `${this.base_url}/${params_endpoint}`
        const response = await fetch(url);

        if(response.ok){
            try{
                const result = await response.json()
                return result.data

            } catch(error){
                console.log(error.message)
            }

        } else{
            console.log(response.json())
        }

    }
}

export {SaavnAPI}           