export interface PageProps {
  name: string
}

export function Page(props: PageProps) {
  return <h1>{props.name}</h1>;
}
