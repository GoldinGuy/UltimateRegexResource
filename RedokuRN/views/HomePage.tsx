import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	SafeAreaView
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Board from "../components/Board";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark, faUndo, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { arrToGrid, escapeChars } from "../utils/utils";

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
		backgroundColor: "#DF7373"
	},
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#faf8ef"
		// maxWidth: screen.width
	},navbar:{
		padding: 20,
		backgroundColor: "#DF7373",
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	header: {
		fontSize: 26,
		textAlign: "center",
		color: "#fff",
		fontWeight: "bold",
		fontFamily: "Menlo"
	}
});

const HomePage = () => {
 const [cExps, setCExps] = useState<string[]>([]);
 const [rExps, setRExps] = useState<string[]>([]);
 const [board, setBoard] = useState<string[][]>([]);
 const [ans, setAnswers] = useState<string[]>([]);

    const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split(
			""
		);

		const ZERO_LENGTH_GOTCHAS = [
			// TODO: Maybe up the ante with lookaheads here...
			".*",
			".?",
			"[RR]*",
			"R*",
			"R?" //, '(R|R)?', 'R?(?=[0RR])'
		];
		const ONE_CLASS = ["[R0R]", "[R]?0", "0?", "[0]", "0R*", "0"];
		const TWO_CLASS = [
			"[R10]+",
			"0[R1R]",
			"[R0]1",
			"(01|RR)",
			"(RR|01)",
			"[1R0][1R]",
			"[1RR0]+",
			"R?[10R]+"
		];
		const THREE_CLASS = [
			"[2R10]+",
			"[102R]+",
			"0R*1[R2]",
			"R?0+1[2R]",
			"[1R2R0]+",
			"[2R]?[120R]+"
		];

		function boolRand() {
			return Math.random() > 0.5;
		}

		const use = (a: string[], chars: string[], cleanedCharSet: string[]) => {
			return a[0 | (Math.random() * a.length)].replace(/\w/g, ($: string) => {
				switch ($) {
					case "R":
						return escapeChars(
							cleanedCharSet[0 | (Math.random() * cleanedCharSet.length)]
						);
					default:
						return escapeChars(chars[+$]);
				}
			});
		};

		const genRegex = (chars: string[]) => {
			let cleanedCharSet = charSet
				.join("")
				.replace(
					// Take out `chars` if no `avoidSet` is defined:
					RegExp("[" + escapeChars(chars.join("")) + "]+", "g"),
					""
				)
				.split("");

			var r = "";

			for (var i = 0, l = chars.length; i < l; i++) {
				var nextChars = chars.slice(i);

				if (boolRand())
					r += use(ZERO_LENGTH_GOTCHAS, nextChars, cleanedCharSet);

				if (boolRand() && i + 2 < l) {
					r += use(THREE_CLASS, nextChars, cleanedCharSet);
					i += 2;
				} else if (i + 1 < l) {
					r += use(TWO_CLASS, nextChars, cleanedCharSet);
					i += 1;
				} else {
					r += use(ONE_CLASS, nextChars, cleanedCharSet);
				}
			}
			console.log(r);
			return r;
		};

		const createGame = () => {
			let r = 4,
				c = 4;
			let answers = Array(r * c + 1)
				.join()
				.split("")
				.map(function () {
					return charSet[0 | (Math.random() * charSet.length)];
				});

			let rHeaders = [],
				cHeaders = [];

			for (let ri = 0; ri < r; ++ri) {
				let rowChars = answers.slice(ri * c, c + ri * r);
				// console.log(rowChars, ri, r, c);
				rHeaders.push(genRegex(rowChars));
			}

			for (let ci = 0; ci < c; ++ci) {
				let colChars = [];
				for (let ri = 0; ri < r; ++ri) {
					colChars.push(answers[ri * c + ci]);
				}
				cHeaders.push(genRegex(colChars));
			}

			setAnswers(answers);
			let arrGrid = arrToGrid(answers, 4);

			console.log(
				JSON.stringify(
					{ cols: cHeaders, rows: rHeaders, ans: arrGrid },
					null,
					4
				)
			);
			setCExps(cHeaders);
			setRExps(rHeaders);
			setBoard(arrGrid);
		};

		const setCorrect = (id: string) => {
			let newAns = ans.splice(ans.indexOf(id), 1);
			setAnswers(newAns);
			if (newAns.length <= 0) {
				console.log("you win");
			}
		};

		useEffect(() => {
			createGame();
		}, []);

	return (
		<SafeAreaView style={styles.safearea}>
			<View style={styles.container}>
				<StatusBar style="light" />

				<View style={styles.navbar}>
					<FontAwesomeIcon
						icon={faUndoAlt}
						size={32}
						style={{ color: "#fff" }}
					/>
					<Text style={styles.header}>REDOKU</Text>
					<FontAwesomeIcon
						icon={faBookmark}
						size={32}
						style={{ color: "#fff" }}
					/>
				</View>
				<Board cExps={cExps} rExps={rExps} board={board} setC={setCorrect} />
			</View>
		</SafeAreaView>
	);
};
export default HomePage;
