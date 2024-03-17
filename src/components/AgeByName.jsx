import React, { useEffect, useRef, useState } from "react";
import makeTheRequest from "../helperFunctions";
import { Button, FormItem, Input } from "@vkontakte/vkui";
import useDebounce from "../hooks/useDebounce";

const regx = /^[A-Z]+$/i;

const AgeByName = () => {
	const [name, setName] = useState("");
	const [errorName, setErrorName] = useState("");
	const [age, setAge] = useState("");
	const cashe = useRef("");
	const debouncedSearchTerm = useDebounce(name, 3000);

	const handleInput = (input) => {
		console.log(input.match(regx));
		if (!input.match(regx) && input) {
			setErrorName(
				"Неверное значение. Поле должно содержать только латинские буквы"
			);
		} else {
			setErrorName("");
		}
		setName(input);
	};

	const sendRequest = async (value) => {
		cashe.current = value;

		try {
			const response = await makeTheRequest({
				url: `https://api.agify.io/?name=${value}`,
			});
			setAge(response.age);
			console.log(response);
		} catch (error) {
			console.error("Ошибка при запросе:", error);
		}
	};

	const validateSubmit = (value) => {
		return value && cashe.current !== value && value.match(regx);
	};

	const handleClick = (e) => {
		e.preventDefault();
		if (validateSubmit(name)) {
			sendRequest(name);
		}
	};

	useEffect(() => {
		if (validateSubmit(debouncedSearchTerm)) {
			sendRequest(debouncedSearchTerm);
		}
	}, [debouncedSearchTerm]);

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<FormItem top="Имя" htmlFor="name">
				<Input
					autocomplete="off"
					value={name}
					id="name"
					type="text"
					placeholder="Введите имя"
					onChange={(e) => handleInput(e.target.value)}
				/>
			</FormItem>
			<span style={{ color: "red" }}>{errorName}</span>
			<p>Возраст: {age}</p>
			<Button onClick={handleClick} type="button">
				Отправить запрос
			</Button>
		</form>
	);
};

export default AgeByName;
