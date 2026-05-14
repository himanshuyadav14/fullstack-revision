import "./App.css";
import Explorer from "./components/Explorer";
import { explorer } from "./utils/data";

function App() {
  return <Explorer explorer={explorer} />;
}
export default App;
