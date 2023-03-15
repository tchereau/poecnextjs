import Array from "@/components/array";
import Header from "@/components/header";

const tableau = [
  ["Monsieur", "Bidule", 3000],
  ["Madame", "machine", 5000],
  ["Bernard", "Arnault", 500000, "Grand compte"],
];
const thead = ["Nom", "Prénom", "Chiffre d'affaire", "Nature"];

export default function clients() {
  return (
    <>
      <Header />
      <Array tableau={tableau} thead={thead} />
    </>
  );
}
