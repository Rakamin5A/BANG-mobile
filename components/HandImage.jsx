import { Image } from "react-native";

const IMAGES = {
  0: require("../assets/hand-rock.png"),
  1: require("../assets/hand-paper.png"),
  2: require("../assets/hand-scissors.png"),
};

export default function HandImage({ choice }) {
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
