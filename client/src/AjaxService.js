import axios from 'axios'

const url = "http://localhost:8000/api/";

class AjaxService {

    static async LoginUser({ login, password }) {

        try {
            const res = await axios.post(`${url}login`, {
                login, password,
            });
            return res.data.token;
        } catch (error) {
            return false;
        }

    }

    static async RegisterUser({ login, password }) {
        try {
            const res = await axios.post(`${url}register`, {
                login, password,
            });
            return res.data.token;
        } catch (error) {
            return false;
        }
    }

    static async GetNotes(token) {
        const config = {
            headers: { authorization: `Bearer ${token}` }
        };

        try {
            const res = await axios.get(`${url}notes`, config);
            return res.data.notes;
        } catch (error) {
            return null;
        }
    }

    static DeleteNote() {
        
    }

    static AddNote() {

    }

    // static UpdateNote(token, noteIndex) {}

}

export default AjaxService;