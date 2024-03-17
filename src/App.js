import React, { useState } from "react";
import {
	AppRoot,
	Button,
	Panel,
	PanelHeader,
	SplitCol,
	SplitLayout,
	View,
	usePlatform,
} from "@vkontakte/vkui";

import "./style.css";
import CatFactInput from "./components/CatFactInput";
import AgeByName from "./components/AgeByName";

const App = () => {
	const platform = usePlatform();
	const [activePanel, setActivePanel] = useState("main");

	return (
		<AppRoot>
			<SplitLayout
				header={platform !== "vkcom" && <PanelHeader delimiter="spacing" />}
			>
				<SplitCol className="container">
					<View activePanel={activePanel}>
						<Panel id="main">
							<Button className="button" onClick={() => setActivePanel("two")}>
								Вперед
							</Button>
							<CatFactInput />
						</Panel>
						<Panel id="two">
							<Button className="button" onClick={() => setActivePanel("main")}>
								Назад
							</Button>
							<AgeByName />
						</Panel>
					</View>
				</SplitCol>
			</SplitLayout>
		</AppRoot>
	);
};

export default App;
