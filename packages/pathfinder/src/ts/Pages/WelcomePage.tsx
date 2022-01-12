import { LazyNeo4JPage } from "./LazyNeo4jPage";

interface WelcomePageProps {}

export function WelcomePage(props: WelcomePageProps) {
  return <LazyNeo4JPage id={1} />;
}
