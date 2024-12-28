import { StyleSheet, View } from "react-native";

export default function ScoreIndicator({
  rounds,
  scoreIndicator,
  isFirstPlayer,
}) {
  const handleIndicatorColors = (index) => {
    const strIndex = index.toString();
    const player = isFirstPlayer ? 1 : 2;

    if (scoreIndicator[strIndex] === player) {
      return "#34EB34";
    }
    if (
      scoreIndicator[strIndex] !== player &&
      scoreIndicator[strIndex] !== undefined
    ) {
      return "#EB3434";
    }

    return "#DADADA";
  };

  return (
    <View
      style={{
        ...styles.container,
        left: isFirstPlayer && 28,
        bottom: isFirstPlayer && 200,
        right: !isFirstPlayer && 28,
        top: !isFirstPlayer && 200,
        transform: [{ rotate: isFirstPlayer ? "180deg" : "0deg" }],
      }}
    >
      {Array.from({ length: rounds }, (_, index) => {
        return (
          <View
            key={index}
            style={{
              ...styles.bullet,
              backgroundColor: handleIndicatorColors(index),
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    gap: 8,
  },
  bullet: {
    width: 20,
    height: 20,
    borderRadius: "100%",
  },
});
