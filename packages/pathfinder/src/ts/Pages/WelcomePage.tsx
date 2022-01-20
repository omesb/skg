import { CreateFlow } from "../Factory/CreateFlow";
import { LazyNeo4JPage } from "./LazyNeo4jPage";

interface WelcomePageProps {}

export function WelcomePage(props: WelcomePageProps) {
  return <LazyNeo4JPage id={undefined} type={"Start"} />;
}
