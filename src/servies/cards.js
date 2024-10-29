import http from './http'

const cardsService = {
    async getAllCards() {
        try{
            const response = await http.get('/cards');
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    async getCardById(id) {
        try{
            const response = await http.get(`/cards/${id}`);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    async createCard(card) {
        try{
            const response = await http.post('/cards', card);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    async updateCard(id, body) {
        try{
            const response = await http.patch(`/cards/${id}`, body);
            return response.data
        }
        catch(error){
            throw error;
        }
    },
    async deleteCard(id) {
        try{
            await http.delete(`/cards/${id}`);
        }
        catch(error){
            throw error;
        }
    }
}

export default cardsService;