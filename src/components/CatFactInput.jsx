import { Button, Input } from "@vkontakte/vkui";
import React, { useRef, useState } from "react";
import makeTheRequest from "../helperFunctions";
import '../style.css'

const CatFactInput = () => {
	const [value, setValue] = useState("");
	const ref = useRef();

	const setCursorAfterFirstWord = (text) => {
		if (ref.current) {
			ref.current.value = text;
			const firstSpaceIndex = text.indexOf(" ");
			ref.current.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
			ref.current.focus();
		}
	};

	const sendData = async () => {
		try {
			const response = await makeTheRequest({
				url: "https://catfact.ninja/fact",
			});
			setValue(response.fact);
			setCursorAfterFirstWord(response.fact);
		} catch (error) {
			console.error("Ошибка при выполнении запроса:", error);
		}
	};

	return (
		<>
			<Input
				getRef={ref}
				defaultValue={value}
				type="text"
				placeholder="Здесь будет результат запроса"
				style={{textOverflow:"ellipsis", whiteSpace:'nowrap', overflow:"hidden"}}
			/>
			<Button className="button" type="button" hoverMode="opacity" onClick={sendData} style={{marginTop:'10px'}}>
				Сделать запрос
			</Button>
		</>
	);
};

export default CatFactInput;
