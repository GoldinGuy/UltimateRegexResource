import React from "react";
import { View, Text } from "react-native";
import { Dimensions } from 'react-native';
import { colors } from "../utils/globals";
import Tile from "./Tile";

const Board = ({ cExps, rExps, board, setC }: {
	cExps: string[]
	rExps: string[]
	board: string[][]
	setC: Function
}) => {    
    const winWidth = Dimensions.get('window').width;
    return (
			<View
				style={{
					padding: 10
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row", 
						marginLeft: "auto",
						transform: [{ translateX: 30 }, {translateY: 20}],
						justifyContent: "flex-start",
						height: 180,
						width: 200,
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
									]
								}}
							>
								<Text
									key={`row${exp}`}
									numberOfLines={1}
									adjustsFontSizeToFit
									style={{
										width: 250,
										position: "absolute",
										bottom: 0,
										right: 0,
										fontSize: 17,
										margin: 10,
										fontFamily: "Menlo",
										textAlign: "right",
										color: colors.gray
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
                                        width: winWidth - 250,
										fontSize: 17,
										margin: 2,
                                        padding: 3,
                                        justifyContent: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
										fontFamily: "Menlo",
										lineHeight: 40,
										textAlignVertical: "center",
										color: colors.gray
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
											<Tile
												id={id}
												idx={c_idx * 4 + r_idx}
												setC={setC}
												key={`ans${id + r_idx}`}
												focus={r_idx === 0 && c_idx === 0}
											/>
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

