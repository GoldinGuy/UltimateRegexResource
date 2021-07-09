import React, { useCallback, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableHighlight,
	Keyboard
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Board from "../components/Board";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark, faUndo, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { arrToGrid, coinFlip, escapeChars } from "../utils/utils";
import ConfettiCannon from "react-native-confetti-cannon";
import { CHARS, colors, R_0, R_1, R_2, R_3 } from "../utils/globals";
import { useRef } from "react";
import RedokuWebView from "../components/WebView";

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
		backgroundColor: colors.red,
	},
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.beige
	},navbar:{
		padding: 20,
		backgroundColor: colors.red,
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	header: {
		fontSize: 26,
		textAlign: "center",
		color: colors.white,
		fontWeight: "bold",
		fontFamily: "Menlo"
	},
	 btnClickContain: {
    borderRadius: 25
  },
});

const HomePage = () => {
	const [cExps, setCExps] = useState<string[]>([]);
	const [rExps, setRExps] = useState<string[]>([]);
	const [board, setBoard] = useState<string[][]>([]);
	const [ans, setAnswers] = useState<string[]>([]);
	const [won, setWon] = useState(true);

	const winRef = useRef<ConfettiCannon>(null);
	const dictRef = useRef<any>(null);

	const handleOpenDict = useCallback(() => {
		if (dictRef.current) {
			Keyboard.dismiss();
			dictRef.current?.open();
		}
	}, []);

	const addRx = (a: string[], chars: string[], cleanCs: string[]) => {
		return a[0 | (Math.random() * a.length)].replace(/\w/g, ($: string) => {
			switch ($) {
				case "R":
					return escapeChars(
						cleanCs[0 | (Math.random() * cleanCs.length)]
					);
				default:
					return escapeChars(chars[+$]);
			}
		});
	};

	const genRegex = (chars: string[]) => {
		// Regex generation based on https://padolsey.github.io/redoku/
		let cleanCs = CHARS.join("")
			.replace(RegExp("[" + escapeChars(chars.join("")) + "]+", "g"), "")
			.split("");

		var r = "";
		for (var i = 0, char_l = chars.length; i < char_l; i++) {
			var nextChars = chars.slice(i);

			if (coinFlip()) r += addRx(R_0, nextChars, cleanCs);

			if (coinFlip() && i + 2 < char_l) {
				r += addRx(R_3, nextChars, cleanCs);
				i += 2;
			} else if (i + 1 < char_l) {
				r += addRx(R_2, nextChars, cleanCs);
				i += 1;
			} else {
				r += addRx(R_1, nextChars, cleanCs);
			}
		}
		console.log(r);
		return r;
	};

	const createGame = () => {
		setWon(false);
		setAnswers([]);
		setBoard([
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""]
		]);
		let rows = 4,
			cols = 4;
		let answers = Array(rows * cols + 1)
			.join()
			.split("")
			.map(() => {
				return CHARS[0 | (Math.random() * CHARS.length)];
			});

		let rowExps = [],
			colExps = [];

		for (let row_idx = 0; row_idx < rows; ++row_idx) {
			let rowChars = answers.slice(row_idx * cols, cols + row_idx * rows);
			rowExps.push(genRegex(rowChars));
		}

		for (let col_idx = 0; col_idx < cols; ++col_idx) {
			let colChars = [];
			for (let ri = 0; ri < rows; ++ri) {
				colChars.push(answers[ri * cols + col_idx]);
			}
			colExps.push(genRegex(colChars));
		}
		// setAnswers(answers);
		let boardArr = arrToGrid(answers, 4);
		console.log(
			JSON.stringify(
				{ cols: colExps, rows: rowExps, board: boardArr, ans: answers },
				null,
				4
			)
		);
		setCExps(colExps);
		setRExps(rowExps);
		setBoard(boardArr);
	};


	const setCorrect = (idx: number) => {
		setAnswers(a => {
			a = [...a, "*"]
			if (a.length >= 16) {
				setWon(true);
				winRef.current?.start();
			}
			return a
		})
	};


	useEffect(() => {
		createGame();
	}, []);

	return (
		<SafeAreaView style={styles.safearea}>
			<View style={styles.container}>
				<StatusBar style="light" />

				<View style={styles.navbar}>
					<TouchableHighlight
						style={styles.btnClickContain}
						underlayColor={colors.red}
						onPress={createGame}
					>
						<FontAwesomeIcon
							icon={faUndoAlt}
							size={32}
							style={{ color: colors.white }}
						/>
					</TouchableHighlight>
					<Text style={styles.header}>{won ? "CONGRATS!" : "REDOKU"}</Text>
					<TouchableHighlight
						style={styles.btnClickContain}
						underlayColor={colors.red}
						onPress={handleOpenDict}
					>
						<FontAwesomeIcon
							icon={faBookmark}
							size={32}
							style={{ color: colors.white }}
						/>
					</TouchableHighlight>
				</View>
				<Board cExps={cExps} rExps={rExps} board={board} setC={setCorrect} />
				{/* For testing: */}
				{/* <Text>{ans}</Text> */}
				<ConfettiCannon
					count={200}
					ref={winRef}
					autoStart={false}
					origin={{ x: -10, y: 0 }}
					colors={[colors.red, colors.blue]}
				/>
			</View>
			<RedokuWebView ref={dictRef} />
		</SafeAreaView>
	);
};
export default HomePage;
