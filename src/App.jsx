import { ThemeToggle, PageHero, ImageContainer } from "./components";

const App = () => {
  return (
    <main className="container mx-auto p-3">
      <ThemeToggle />
      <PageHero />
      <ImageContainer />
    </main>
  );
};
export default App;
