import React, {  useState } from "react";
import { TextInput } from "react-native";
import { colors } from "../utils/globals";

const Tile = ({
	id,
	setC,
	idx,
	focus
}: {
	id: string;
	setC: Function;
	idx: number;
	focus: boolean;
}) => {
	const [ip, setInput] = useState("");

	return (
		<TextInput
			autoFocus={focus}
			maxLength={1}
			style={{
				textAlign: "center",
				margin: 2,
				height: 50,
				width: 50,
				fontSize: 24,
				color: "#fff",
				fontFamily: "Menlo",
				backgroundColor:
					ip == id
						? colors.blue
						: ip != id && ip.length > 0
						? colors.red
						: colors.darkBeige
			}}
			placeholder=""
			onChangeText={ip => {
				// only accept alphanumeric chars
				if (/^(?:[A-Za-z]+|\d+)$/.test(ip) || ip == "") {
					setInput(ip);
					if (ip === id) setC(idx);
				}
			}}
			value={ip}
			defaultValue={ip}
			editable={ip != id}
		></TextInput>
	);
};
export default Tile