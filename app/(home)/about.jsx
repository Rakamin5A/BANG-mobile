import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../../assets/background-home.png")}
        style={styles.background}
      />
      <Text style={styles.aboutText}>TENTANG KAMI</Text>
      <View style={styles.contentContainer}>
        <Image source={require("../../assets/us.png")} style={styles.image} />
        <Text style={styles.desc}>Woy, Bang!</Text>
        <Text style={styles.desc}>
          Hari ini kite-kite dari tim 5A ODP IT BSI BATCH 20 mau ngenalin
          aplikasi BANG, nih. Kita ada enam orang: dua cewek sama empat cowok,
          masing-masing punya peran penting. Biarpun background kita beda-beda,
          tetep aja kite kompak. Makanya, coba deh, Bang, lu mainin sekarang
          juga! Semoga lu pada suka sama game ini. Selamat nyobain ye, Bang!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: "100%",
    width: "auto",
  },
  aboutText: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: 700,
  },
  contentContainer: {
    marginTop: 18,
    width: "80%",
  },
  image: {
    width: "100%",
    objectFit: "contain",
    height: 250,
  },
  desc: {
    color: "#FFFFFF",
    fontWeight: 700,
    lineHeight: 20,
  },
});
