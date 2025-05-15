import { axiosInstance } from "@/api/axios";

class BookService {
  async getBooks(page: number = 1) {
    try {
      const response = await axiosInstance.get("/books", {
        params: {
          page: page,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching popular books:", error);
      throw error;
    }
  }
}

export default new BookService();
