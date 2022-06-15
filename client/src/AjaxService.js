import axios from 'axios'

// const url = "http://localhost:8000/api/";
const url = "http://10.11.110.10:8000/api/";

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

    static async DeleteNote(token, index) {
        const config = {
            headers: { authorization: `Bearer ${token}` }
        };
        try {
            const res = await axios.delete(`${url}notes/${index}`, config);
            return res.data.notes;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async AddNote(token, { title, message, isurgent }) {
        const config = {
            headers: { authorization: `Bearer ${token}` }
        };

        try {
            const res = await axios.post(`${url}notes`, { title, message, isurgent }, config);
            return res.data.notes;
        } catch (error) {
            return null;
        }
    }

    static async UpdateNote(token, { index, propertyname, value }) {

        // {
        //     "index":0,
        //     "propertyname":"isurgent",
        //     "value":false
        // }

        const config = {
            headers: { authorization: `Bearer ${token}` }
        };

        try {
            const res = await axios.post(`${url}notes`, {
                index,
                propertyname,
                value,
            }, config);
            return res.data.token;
        } catch (error) {
            return false;
        }

    }

}

export default AjaxService;