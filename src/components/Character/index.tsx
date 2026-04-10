import Scene from "./Scene";
import ErrorBoundary from "../utils/ErrorBoundary";

const CharacterModel = () => {
  return (
    <ErrorBoundary>
      <Scene />
    </ErrorBoundary>
  );
};

export default CharacterModel;
