import { CreateFlow } from "../Factory/CreateFlow";
import { MockEditorInterface } from "../Factory/MockEditorInterface";
import { LazyNeo4JPage } from "./LazyNeo4jPage";

interface WelcomePageProps {}

export function WelcomePage(props: WelcomePageProps) {
return <div>
  <CreateFlow typeNodeID={1} editorInterface={new MockEditorInterface()} onCreated={() => {}} onAborted={() => {}} />
</div>

//  return <LazyNeo4JPage id={0} />;
}
