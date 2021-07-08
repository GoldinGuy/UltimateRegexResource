import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import { arrToGrid, escapeChars } from "../utils/utils";
import { Dimensions } from 'react-native';
import Tile from "./Tile";


const Board = ({ cExps, rExps, board, setC }: {
	cExps: string[]
	rExps: string[]
	board: string[][]
	setC: Function
}) => {    
   

    const winWidth = Dimensions.get('window').width;
    const winHeight = Dimensions.get('window').height;


    return (
			<View
				style={{
					padding: 10
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row", // row
						marginLeft: "auto",
						transform: [{ translateX: 30 }, {translateY: 20}],
						justifyContent: "flex-start",
						height: 180,
						width: 200,
						// backgroundColor: 'yellow'
					}}
				>
					{cExps.map(exp => {
						return (
							<View
								key={exp}
								style={{
									width: 50,
									transform: [
										{ rotate: "45deg" }
										// { translateY: -100} //"300deg" },
									]
								}}
							>
								<Text
									key={`row${exp}`}
									numberOfLines={1}
									adjustsFontSizeToFit
									style={{
										// height: 100,
										// flex: 1,
										width: 250,
										position: "absolute",
										bottom: 0,
										right: 0,
										fontSize: 17,
										// flexShrink: 1,
										// flexWrap: "wrap",
										margin: 10,
										// right: 10,
										fontFamily: "Menlo",
										textAlign: "right",
										color: "#776E65"
									}}
								>
									{exp}
								</Text>
							</View>
						);
					})}
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row"
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
                        width: winWidth - 250,
                            
						}}
					>
						{rExps.map(exp => {
							return (
								<Text
                                    key={`col${exp}`}
                                    numberOfLines={1}
									adjustsFontSizeToFit
									style={{
										textAlign: "right",
										height: 50,
										// width: "100%",
                                        width: winWidth - 250,
										fontSize: 17,
										margin: 2,
                                        padding: 3,
                                        justifyContent: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
										// flexShrink: 1,
										fontFamily: "Menlo",
										lineHeight: 40,
										textAlignVertical: "center",
										color: "#776E65"
									}}
								>
									{exp}
								</Text>
							);
						})}
					</View>
					<View style={{ display: "flex", flexDirection: "column" }}>
						{board.map((col, c_idx) => {
							return (
								<View
									key={`row${c_idx}`}
									style={{
										flexDirection: "row"
									}}
								>
									{col.map((id, r_idx) => {
										return (
											<Tile id={id} idx={r_idx} setC={setC} key={`ans${id + r_idx}`} focus={r_idx === 1 && c_idx === 1} />
										);
									})}
								</View>
							);
						})}
					</View>
				</View>
			</View>
		);
}
export default Board

