import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BackButton from "../../components/BackButton";

function StatCard({ label, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background-home.png")}
        style={styles.background}
      />
      <BackButton />
      <Text style={styles.name}>Nama</Text>
      <View>
        <Image
          source={require("../../assets/avatar.png")}
          style={styles.avatar}
        />
        <TouchableOpacity>
          <Image
            source={require("../../assets/camera.png")}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.stats}>Statistika Pertandingan</Text>
      <View style={styles.card}>
        <StatCard label="Pertandingan" value={205} />
        <StatCard label="Menang" value="180/205" />
        <StatCard label="Persentase Menang" value="87.8%" />
        <StatCard label="Kemenangan Beruntun" value={9} />
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
    objectFit: "cover",
    width: "auto",
  },
  name: { fontSize: 20, fontWeight: 700 },
  avatar: {
    width: 225,
    height: 225,
    marginTop: 20,
  },
  cameraIcon: {
    position: "absolute",
    right: 20,
    bottom: -20,
    width: 50,
    height: 50,
  },
  stats: { fontSize: 20, fontWeight: 700, marginTop: 60 },
  card: {
    backgroundColor: "#C85C2A",
    paddingVertical: 24,
    paddingHorizontal: 40,
    borderRadius: 15,
    width: "90%",
    marginTop: 14,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "center",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    width: 135,
  },
  label: { textAlign: "center", fontWeight: 700, fontSize: 14 },
  statValue: {
    textAlign: "center",
    fontWeight: 700,
    color: "#C85C2A",
    marginTop: 16,
    fontSize: 24,
  },
});
