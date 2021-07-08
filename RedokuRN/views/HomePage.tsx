import React, { useCallback, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	SafeAreaView,
	Button,
	TouchableHighlight,
	Keyboard
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Board from "../components/Board";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark, faUndo, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { arrToGrid, escapeChars } from "../utils/utils";
import ConfettiCannon from "react-native-confetti-cannon";
import { colors } from "../utils/globals";
import { useRef } from "react";
// import Dictionary from "../components/RegexDict";
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
		// maxWidth: screen.width
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
	const [won, setWon] = useState(true)

	const winRef = useRef<ConfettiCannon>(null);
	const dictRef = useRef<any>(null);

	  const handleOpenDict = useCallback(() => {
		  if (dictRef.current) {
				Keyboard.dismiss();
				dictRef.current?.open();
			}
		}, []);


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
			setWon(false)
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
			ans.splice(ans.indexOf(id), 1);
			setAnswers(ans);
			if (ans.length == 0) {
				setWon(true);
				winRef.current?.start();
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
					<Text style={styles.header}>{won ? 'CONGRATS!' : 'REDOKU'}</Text>
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
				{won && <ConfettiCannon
					count={200}
					autoStart={false}
					origin={{ x: -10, y: 0 }}
					colors={[colors.red, colors.blue]}
					ref={winRef}
				/>}
			</View>
			<RedokuWebView ref={dictRef} />
		</SafeAreaView>
	);
};
export default HomePage;
