import axios from "axios";

const makeTheRequest = async ({ method = "get", url, params }) => {
	try {
		const { data } = await axios[method](url, { params });
		return data;
	} catch (error) {
		console.error("Ошибка при выполнении запроса:", error);
	}
	return false;
};

export default makeTheRequest;