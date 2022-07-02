import {
  Heading,
  Link,
  NumberInput,
  NumberInputField,
  Select,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Form from "./components/Form";

function App() {
  let styles = {
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffe",
    },
    heading: {
      textAlign: "center" as const,
    },
  };

  const [value, setValue] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [location, setLocation] = useState("oslo");
  const [prices, setPrices] = useState({
    oslo: 90000,
    trondheim: 55000,
    gjøvik: 34000,
  });
  const [meters, setMeters] = useState(0);

  useEffect(() => {
    fetch("http://83.149.99.249:8000/", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((actualData) => {
        setPrices(JSON.parse(actualData));
        setIsFetched(true);
      });
  }, []);

  useEffect(() => {
    // @ts-ignore
    setMeters(parseFloat((+value / prices[location]).toFixed(4)));
  }, [value, location]);

  return (
    <div style={styles.container}>
      <Form>
        <Heading mb={5} style={styles.heading} as="h1">
          Hvor mange kvm kan du kjøpe i...
          <Select
            mt={5}
            color="black"
            variant="filled"
            onChange={(e) => setLocation(e.target.value)}
          >
            {Object.keys(prices).map((location) => (
              <option value={location}>
                {location[0].toUpperCase() + location.slice(1)}
              </option>
            ))}
          </Select>
        </Heading>
        <NumberInput min={0} value={value} onChange={(e) => setValue(e)}>
          <Text fontSize={16} mb={2}>
            Hvor mye koster gjenstanden som du ønsker å kjøpe? (NOK)
          </Text>
          <NumberInputField />
        </NumberInput>
        <Stat mt={5}>
          <StatLabel>Dette tilsvarer:</StatLabel>
          <StatNumber>{meters} kvadratmeter</StatNumber>
          <StatHelpText>
            {/* @ts-ignore */}
            Gitt en meterpris på {prices[location]} NOK{" "}
            {isFetched && (
              <>
                (Prisstatistikk hentet fra{" "}
                <Link href="https://www.krogsveen.no/prisstatistikk" isExternal>
                  krogsveen.no
                </Link>
                )
              </>
            )}
          </StatHelpText>
        </Stat>
      </Form>
    </div>
  );
}

export default App;
