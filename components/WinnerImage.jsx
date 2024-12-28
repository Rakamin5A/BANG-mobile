import { Image } from "react-native";

const IMAGES = {
  0: require("../assets/winner-rock.png"),
  1: require("../assets/winner-paper.png"),
  2: require("../assets/winner-scissors.png"),
  3: require("../assets/draw.png"),
};

export default function WinnerImage({ choice }) {
  return (
    <Image
      source={IMAGES[choice]}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
